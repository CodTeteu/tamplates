import React, { useState, useEffect, useRef } from 'react';
import { Download, Trash2, ArrowLeft, Users, DollarSign, Lock, RefreshCw, LogOut, Gift as GiftIcon, List, Plus, Edit2, Image as ImageIcon, Save, X, Database, Loader2 } from 'lucide-react';

import { supabase, isSupabaseConfigured, GiftService, RsvpService } from '../services';
import type { RegistrationRecord, Gift, GiftPayment } from '../types';
import { INITIAL_GIFTS } from '../constants/initialGifts';
import { COUPLE } from '../constants';
import type { User, Session } from '@supabase/supabase-js';

type Tab = 'rsvps' | 'received-gifts' | 'manage-gifts';

export const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<Tab>('rsvps');
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    // RSVP Data
    const [records, setRecords] = useState<RegistrationRecord[]>([]);

    // Gift Data
    const [gifts, setGifts] = useState<Gift[]>([]);
    const [payments, setPayments] = useState<GiftPayment[]>([]);

    // Auth Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [loadingAuth, setLoadingAuth] = useState(false);

    // Manage Gift State
    const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
    const [editingGift, setEditingGift] = useState<Gift | null>(null);
    const [giftForm, setGiftForm] = useState<Partial<Gift>>({ category: 'Cozinha' });
    const [giftImageFile, setGiftImageFile] = useState<File | null>(null);
    const [savingGift, setSavingGift] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isSupabaseConfigured || !supabase) {
            console.log('Supabase not configured, skipping auth listener');
            return;
        }

        // Check initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setCurrentUser(session?.user ?? null);
            if (session?.user) {
                fetchAllData();
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setCurrentUser(session?.user ?? null);
            if (session?.user) {
                fetchAllData();
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchRecords(),
                fetchGifts(),
                fetchPayments()
            ]);
        } catch (e) {
            console.error("Error loading data", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecords = async () => {
        try {
            const fetchedRecords = await RsvpService.getAll();
            fetchedRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setRecords(fetchedRecords);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    const fetchGifts = async () => {
        try {
            const fetchedGifts = await GiftService.getAllGifts();

            if (fetchedGifts.length === 0) {
                console.log("Database empty, seeding with initial gifts...");
                await GiftService.seedGifts(INITIAL_GIFTS);
                const seededGifts = await GiftService.getAllGifts();
                setGifts(seededGifts);
            } else {
                setGifts(fetchedGifts);
            }
        } catch (e) {
            console.error("Error fetching gifts", e);
        }
    };

    const fetchPayments = async () => {
        try {
            const fetchedPayments = await GiftService.getPayments();
            setPayments(fetchedPayments);
        } catch (e) {
            console.error("Error fetching payments", e);
        }
    };

    const handleSeedGifts = async () => {
        if (confirm(`Isso irá adicionar ${INITIAL_GIFTS.length} presentes ao banco de dados. Confirmar?`)) {
            setLoading(true);
            try {
                await GiftService.seedGifts(INITIAL_GIFTS);
                alert("Presentes importados com sucesso!");
                fetchGifts();
            } catch (e) {
                console.error(e);
                alert("Erro ao importar presentes.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingAuth(true);
        setAuthError('');

        if (!isSupabaseConfigured || !supabase) {
            setAuthError('Supabase não configurado. Configure o arquivo .env');
            setLoadingAuth(false);
            return;
        }

        try {
            const loginEmail = email.includes('@') ? email : `${email}@casamento.com`;
            const { data, error } = await supabase.auth.signInWithPassword({
                email: loginEmail,
                password: password
            });

            if (error) throw error;
        } catch (error: any) {
            console.error("Login Error", error);
            if (error.message?.includes('Invalid login credentials')) {
                setAuthError('Senha ou usuário incorretos.');
            } else {
                setAuthError('Erro ao entrar. Verifique se o usuário foi criado no Supabase.');
            }
        } finally {
            setLoadingAuth(false);
        }
    };

    const handleLogout = async () => {
        if (!supabase) return;
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    // --- RSVP Actions ---
    const handleExportCSV = () => {
        const headers = [
            "Data", "Nome", "Telefone", "Total Convidados", "Acompanhantes",
            "Método Pagamento", "Total R$", "Música", "Mensagem"
        ];

        const rows = records.map(r => [
            new Date(r.date).toLocaleDateString(),
            `"${r.fullName}"`,
            r.phone,
            r.totalGuests,
            `"${r.companions ? r.companions.map(c => c.name + (c.isChild ? ' (Criança)' : '')).join(', ') : ''}"`,
            r.paymentMethod === 'card' ? 'Cartão' : r.paymentMethod === 'pix' ? 'PIX' : '-',
            r.totalCost.toFixed(2),
            `"${r.songRequest || ''}"`,
            `"${(r.message || '').replace(/\n/g, ' ')}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `lista_casamento_${COUPLE.groom.toLowerCase()}_${COUPLE.bride.toLowerCase()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este registro permanente?')) {
            try {
                await RsvpService.delete(id);
                setRecords(prev => prev.filter(r => r.id !== id));
            } catch (e) {
                console.error("Delete error:", e);
                alert("Erro ao excluir do Supabase.");
            }
        }
    };

    // --- Gift Logic ---

    const handleOpenGiftModal = (gift?: Gift) => {
        if (gift) {
            setEditingGift(gift);
            setGiftForm(gift);
        } else {
            setEditingGift(null);
            setGiftForm({ category: 'Cozinha', price: 0, name: '', description: '' });
        }
        setGiftImageFile(null);
        setIsGiftModalOpen(true);
    };

    const handleSaveGift = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!giftForm.name || !giftForm.price || !giftForm.category) {
            alert("Preencha os campos obrigatórios: Nome, Preço e Categoria");
            return;
        }

        setSavingGift(true);

        try {
            const giftData = {
                name: giftForm.name!,
                price: Number(giftForm.price),
                description: giftForm.description || '',
                category: giftForm.category!,
                imageUrl: giftForm.imageUrl || 'https://via.placeholder.com/300?text=Sem+Imagem'
            };

            if (editingGift) {
                await GiftService.updateGift(editingGift.id, giftData, giftImageFile || undefined);
            } else {
                await GiftService.addGift(giftData as any, giftImageFile || undefined);
            }

            setIsGiftModalOpen(false);
            setEditingGift(null);
            setGiftForm({ category: 'Cozinha' });
            setGiftImageFile(null);

            localStorage.removeItem('wedding_gifts_cache');
            await fetchGifts();

        } catch (err: any) {
            console.error("Error saving gift:", err);
            alert(`Erro ao salvar: ${err.message || 'Verifique o console para detalhes'}`);
        } finally {
            setSavingGift(false);
        }
    };

    const handleDeleteGift = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este presente?')) {
            await GiftService.deleteGift(id);
            fetchGifts();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setGiftImageFile(e.target.files[0]);
        }
    };

    const handleUpdatePaymentStatus = async (id: string, newStatus: string) => {
        try {
            await GiftService.updatePaymentStatus(id, newStatus);
            setPayments(prev => prev.map(p => p.id === id ? { ...p, status: newStatus as any } : p));
        } catch (e) {
            console.error("Error updating status:", e);
            alert("Erro ao atualizar status.");
        }
    };

    // Summary Logic
    const totalGuests = records.reduce((acc, curr) => acc + curr.totalGuests, 0);
    const totalMoneyRSVP = records.reduce((acc, curr) => acc + curr.totalCost, 0);
    // Only count approved (received) gifts in the total
    const totalGiftsReceived = payments.reduce((acc, curr) => (curr.status === 'approved' ? acc + curr.totalAmount : acc), 0);


    if (!currentUser) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="bg-card/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-border">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-heading text-foreground mb-2">Acesso Administrativo</h2>
                    <p className="text-xs text-muted-foreground mb-6 uppercase tracking-wider">Gestão de Convidados & Presentes</p>

                    <form onSubmit={handleLogin} className="space-y-4 text-left">
                        <div className="bg-blue-50 text-blue-700 p-2 text-xs rounded mb-4 border border-blue-100 flex items-center gap-2">
                            <Lock className="w-3 h-3" /> Acesso Seguro
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">E-mail</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-border rounded-lg outline-none focus:border-primary bg-background transition-colors text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Senha</label>
                            <input
                                type="password"
                                className="w-full p-3 border border-border rounded-lg outline-none focus:border-primary bg-background transition-colors text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••"
                            />
                        </div>

                        {authError && <p className="text-destructive text-xs text-center bg-destructive/10 p-2 rounded">{authError}</p>}

                        <button
                            type="submit"
                            disabled={loadingAuth}
                            className="w-full bg-foreground text-background py-3 rounded-lg uppercase tracking-widest text-xs font-bold hover:bg-foreground/90 transition-colors shadow-lg disabled:opacity-50"
                        >
                            {loadingAuth ? 'Entrando...' : 'Entrar'}
                        </button>
                        <div className="text-center pt-2">
                            <button type="button" onClick={onBack} className="text-xs text-muted-foreground hover:text-primary underline transition-colors">Voltar ao site</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 font-body">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button onClick={onBack} className="p-2 bg-card rounded-full shadow hover:bg-muted transition-colors">
                            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-heading text-foreground">Painel de Controle</h1>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider truncate max-w-[200px] md:max-w-none">
                                Logado como: {currentUser?.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto justify-end">
                        <button
                            onClick={fetchAllData}
                            className="p-3 bg-card text-muted-foreground rounded-lg shadow hover:bg-muted transition-colors flex-1 md:flex-none justify-center flex"
                            title="Atualizar"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 bg-destructive text-destructive-foreground px-4 py-3 rounded-lg shadow hover:bg-destructive/90 transition-colors uppercase text-xs font-bold tracking-wider flex-1 md:flex-none"
                        >
                            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Sair</span>
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <button
                        onClick={() => setActiveTab('rsvps')}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'rsvps' ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-card text-muted-foreground hover:bg-muted'}`}
                    >
                        <Users className="w-4 h-4" /> RSVP / Confirmados
                    </button>
                    <button
                        onClick={() => setActiveTab('received-gifts')}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'received-gifts' ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-card text-muted-foreground hover:bg-muted'}`}
                    >
                        <GiftIcon className="w-4 h-4" /> Presentes Recebidos
                    </button>
                    <button
                        onClick={() => setActiveTab('manage-gifts')}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeTab === 'manage-gifts' ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-card text-muted-foreground hover:bg-muted'}`}
                    >
                        <List className="w-4 h-4" /> Gerenciar Lista
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
                    <div className="glass-card p-4 md:p-6 rounded-xl shadow-sm border-l-4 border-primary">
                        <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            {activeTab === 'rsvps' ? 'Total Convidados RSVP' : 'Total Arrecadado (RSVP)'}
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                            {activeTab === 'rsvps' ? totalGuests : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalMoneyRSVP)}
                        </p>
                    </div>

                    <div className="bg-card p-4 md:p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                        <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">Presentes Arrecadados</p>
                        <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalGiftsReceived)}
                        </p>
                    </div>
                    <div className="bg-card p-4 md:p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                        <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Geral (RSVP + Presentes)</p>
                        <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalMoneyRSVP + totalGiftsReceived)}
                        </p>
                    </div>
                </div>

                {/* TAB CONTENT: RSVPS */}
                {activeTab === 'rsvps' && (
                    <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/50">
                            <h3 className="font-bold text-foreground">Lista de Confirmações</h3>
                            <button
                                onClick={handleExportCSV}
                                className="flex items-center gap-2 text-green-600 hover:text-green-800 text-xs font-bold uppercase"
                            >
                                <Download className="w-4 h-4" /> Download CSV
                            </button>
                        </div>
                        {records.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground italic">
                                Nenhuma confirmação recebida ainda.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                {/* Desktop Table */}
                                <table className="w-full text-left text-sm text-muted-foreground hidden md:table">
                                    <thead className="bg-muted text-xs uppercase font-bold text-muted-foreground border-b border-border">
                                        <tr>
                                            <th className="px-6 py-4">Nome</th>
                                            <th className="px-6 py-4">Acompanhantes</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-center">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {records.map(r => (
                                            <tr key={r.id} className="hover:bg-muted/50">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-foreground">{r.fullName}</div>
                                                    <div className="text-xs text-muted-foreground">{r.phone}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {r.companions && r.companions.length > 0 ? (
                                                        <ul className="list-disc list-inside text-xs">
                                                            {r.companions.map((c, idx) => (
                                                                <li key={idx} className="text-muted-foreground">
                                                                    <span className="font-medium text-foreground">{c.name}</span>
                                                                    {c.isChild && <span className="text-[10px] ml-1 opacity-70">(Criança)</span>}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground italic">Sem acompanhantes</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${r.status === 'paid' ? 'bg-green-100 text-green-700' :
                                                        r.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-700' :
                                                            r.status === 'declined' ? 'bg-red-100 text-red-700' :
                                                                !r.status || r.status === '' || r.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                                    'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {r.status === 'paid' ? 'Pago' :
                                                            r.status === 'pending_payment' ? 'Aguardando PIX' :
                                                                r.status === 'declined' ? 'Não Comparecerá' :
                                                                    r.status === 'confirmed' || !r.status || r.status === '' ? 'Confirmado' :
                                                                        r.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button onClick={() => handleDelete(r.id)} className="text-destructive/50 hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Mobile Card View */}
                                <div className="md:hidden divide-y divide-border">
                                    {records.map(r => (
                                        <div key={r.id} className="p-4 flex flex-col gap-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-bold text-foreground">{r.fullName}</div>
                                                    <div className="text-xs text-muted-foreground">{r.phone}</div>
                                                </div>
                                                <button onClick={() => handleDelete(r.id)} className="p-2 text-destructive/50 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {r.companions && r.companions.length > 0 && (
                                                <div className="bg-muted/30 p-3 rounded-lg text-xs">
                                                    <span className="font-bold text-muted-foreground block mb-1">Acompanhantes ({r.companions.length})</span>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {r.companions.map((c, idx) => (
                                                            <li key={idx} className="text-muted-foreground">
                                                                <span className="font-medium text-foreground">{c.name}</span>
                                                                {c.isChild && <span className="text-[10px] ml-1 opacity-70">(Criança)</span>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between mt-1">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${r.status === 'paid' ? 'bg-green-100 text-green-700' :
                                                        r.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-700' :
                                                            r.status === 'declined' ? 'bg-red-100 text-red-700' :
                                                                'bg-green-100 text-green-700'
                                                    }`}>
                                                    {r.status === 'paid' ? 'Pago' :
                                                        r.status === 'pending_payment' ? 'Aguardando PIX' :
                                                            r.status === 'declined' ? 'Não Comparecerá' :
                                                                'Confirmado'}
                                                </span>
                                                <div className="text-xs font-mono font-bold text-muted-foreground">
                                                    {new Date(r.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB CONTENT: RECEIVED GIFTS */}
                {activeTab === 'received-gifts' && (
                    <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                        <div className="p-4 border-b border-border bg-muted/50">
                            <h3 className="font-bold text-foreground">Histórico de Presentes Recebidos</h3>
                        </div>
                        {payments.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground italic">
                                Nenhum presente recebido ainda.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                {/* Desktop Table */}
                                <table className="w-full text-left text-sm text-muted-foreground hidden md:table">
                                    <thead className="bg-purple-50 text-xs uppercase font-bold text-purple-900/60 border-b border-purple-100">
                                        <tr>
                                            <th className="px-6 py-4">Data</th>
                                            <th className="px-6 py-4">Quem Presenteou</th>
                                            <th className="px-6 py-4">Presentes</th>
                                            <th className="px-6 py-4 text-right">Total</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-center">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {payments.map(payment => (
                                            <tr key={payment.id} className="hover:bg-muted/50">
                                                <td className="px-6 py-4 text-xs">
                                                    {new Date(payment.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-foreground">{payment.buyerName}</div>
                                                    <div className="text-xs text-muted-foreground">{payment.buyerEmail}</div>
                                                    {payment.message && (
                                                        <div className="mt-1 text-xs italic text-muted-foreground bg-yellow-50 p-1 rounded">"{payment.message}"</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <ul className="text-xs space-y-1">
                                                        {payment.items.map((item, idx) => (
                                                            <li key={idx} className="flex items-center gap-2">
                                                                <GiftIcon className="w-3 h-3 text-purple-400" />
                                                                <span>{item.name}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className="px-6 py-4 text-right font-mono font-bold text-foreground">
                                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.totalAmount)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        value={payment.status}
                                                        onChange={(e) => handleUpdatePaymentStatus(payment.id, e.target.value)}
                                                        className={`px-2 py-1 rounded text-xs font-bold uppercase border-none outline-none cursor-pointer ${payment.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                            payment.status === 'pending' || payment.status === 'pending_confirmation' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-red-100 text-red-700'
                                                            }`}
                                                    >
                                                        <option value="pending_confirmation">Aguardando PIX</option>
                                                        <option value="approved">Recebido</option>
                                                        <option value="cancelled">Cancelado</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={async () => {
                                                            if (confirm('Tem certeza que deseja excluir este registro de presente?')) {
                                                                try {
                                                                    await GiftService.deletePayment(payment.id);
                                                                    setPayments(prev => prev.filter(p => p.id !== payment.id));
                                                                } catch (e) {
                                                                    console.error('Error deleting payment:', e);
                                                                    alert('Erro ao excluir registro.');
                                                                }
                                                            }
                                                        }}
                                                        className="text-destructive/50 hover:text-destructive transition-colors"
                                                        title="Excluir registro"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Mobile Card View */}
                                <div className="md:hidden divide-y divide-border">
                                    {payments.map(payment => (
                                        <div key={payment.id} className="p-4 flex flex-col gap-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-bold text-foreground text-lg">{payment.buyerName}</div>
                                                    <div className="text-xs text-muted-foreground">{payment.buyerEmail}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-mono font-bold text-primary text-lg">
                                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.totalAmount)}
                                                    </div>
                                                    <div className="text-[10px] text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</div>
                                                </div>
                                            </div>

                                            {payment.message && (
                                                <div className="bg-yellow-50 p-3 rounded-lg text-xs italic text-yellow-800 border border-yellow-100">
                                                    "{payment.message}"
                                                </div>
                                            )}

                                            <div className="bg-muted/30 p-3 rounded-lg">
                                                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Itens Comprados</p>
                                                <ul className="space-y-2">
                                                    {payment.items.map((item, idx) => (
                                                        <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                                                            <GiftIcon className="w-3 h-3 text-purple-400" />
                                                            {item.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex justify-between items-center pt-2 border-t border-border/50">
                                                <select
                                                    value={payment.status}
                                                    onChange={(e) => handleUpdatePaymentStatus(payment.id, e.target.value)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase border-none outline-none cursor-pointer ${payment.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                            payment.status === 'pending' || payment.status === 'pending_confirmation' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-red-100 text-red-700'
                                                        }`}
                                                >
                                                    <option value="pending_confirmation">Aguardando PIX</option>
                                                    <option value="approved">Recebido</option>
                                                    <option value="cancelled">Cancelado</option>
                                                </select>

                                                <button
                                                    onClick={async () => {
                                                        if (confirm('Tem certeza que deseja excluir este registro de presente?')) {
                                                            try {
                                                                await GiftService.deletePayment(payment.id);
                                                                setPayments(prev => prev.filter(p => p.id !== payment.id));
                                                            } catch (e) {
                                                                console.error('Error deleting payment:', e);
                                                                alert('Erro ao excluir registro.');
                                                            }
                                                        }
                                                    }}
                                                    className="p-2 text-destructive/50 hover:text-destructive bg-destructive/5 hover:bg-destructive/10 rounded-full transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB CONTENT: MANAGE GIFTS */}
                {activeTab === 'manage-gifts' && (
                    <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                        <div className="p-4 border-b border-border bg-muted/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div>
                                <h3 className="font-bold text-foreground">Catálogo de Presentes</h3>
                                <p className="text-xs text-muted-foreground">
                                    {gifts.length > 0
                                        ? `${gifts.length} presentes cadastrados no banco de dados`
                                        : 'Banco de dados vazio - clique em "Importar Lista" para começar'}
                                </p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={async () => {
                                        if (confirm('Isso irá remover todos os presentes com nomes duplicados, mantendo apenas o mais antigo. Continuar?')) {
                                            setLoading(true);
                                            try {
                                                const removed = await GiftService.deduplicateGifts();
                                                alert(`${removed} presentes duplicados removidos.`);
                                                fetchGifts();
                                            } catch (e) {
                                                console.error(e);
                                                alert("Erro ao remover duplicatas.");
                                            } finally {
                                                setLoading(false);
                                            }
                                        }
                                    }}
                                    disabled={loading}
                                    className="bg-amber-50 text-amber-600 border border-amber-200 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Remover Duplicados
                                </button>
                                <button
                                    onClick={handleSeedGifts}
                                    disabled={loading}
                                    className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Database className="w-4 h-4" />
                                    {gifts.length === 0 ? 'Importar Lista Inicial' : 'Reimportar Padrões'}
                                </button>
                                <button
                                    onClick={() => handleOpenGiftModal()}
                                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Adicionar Presente
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                            {gifts.map(gift => (
                                <div key={gift.id} className="border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow group relative">
                                    <div className="aspect-video bg-muted relative overflow-hidden">
                                        <img src={gift.imageUrl} alt={gift.name} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleOpenGiftModal(gift)} className="p-2 bg-background rounded-full shadow text-blue-500 hover:text-blue-700">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDeleteGift(gift.id)} className="p-2 bg-background rounded-full shadow text-destructive hover:text-destructive/80">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-wider backdrop-blur-sm">
                                            {gift.category}
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <h4 className="font-bold text-foreground truncate" title={gift.name}>{gift.name}</h4>
                                        <p className="text-primary font-bold">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.price)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {gifts.length === 0 && !loading && (
                                <div className="col-span-full py-12 text-center text-muted-foreground">
                                    <Database className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                    <p>Nenhum presente cadastrado no banco de dados.</p>
                                    <p className="text-xs mt-2">Use o botão acima para importar a lista inicial.</p>
                                </div>
                            )}
                            {loading && (
                                <div className="col-span-full py-12 text-center">
                                    <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
                                    <p className="text-muted-foreground mt-2">Carregando...</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>

            {/* MODAL EDIT/ADD GIFT */}
            {isGiftModalOpen && (
                <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-scale-in">
                        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/50">
                            <h3 className="font-bold text-foreground flex items-center gap-2">
                                {editingGift ? <><Edit2 className="w-4 h-4" /> Editar Presente</> : <><Plus className="w-4 h-4" /> Novo Presente</>}
                            </h3>
                            <button onClick={() => setIsGiftModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSaveGift} className="p-6 space-y-4">

                            {/* Image Upload */}
                            <div className="flex justify-center mb-4">
                                <div
                                    className="w-32 h-32 bg-muted rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors relative overflow-hidden"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {giftImageFile ? (
                                        <img src={URL.createObjectURL(giftImageFile)} className="w-full h-full object-cover" />
                                    ) : giftForm.imageUrl ? (
                                        <img src={giftForm.imageUrl} className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                                            <span className="text-xs text-muted-foreground">Add Foto</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Nome do Presente</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-3 bg-muted border border-border rounded-lg focus:border-primary outline-none"
                                        value={giftForm.name || ''}
                                        onChange={e => setGiftForm({ ...giftForm, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Preço (R$)</label>
                                    <input
                                        type="number"
                                        required
                                        step="0.01"
                                        className="w-full p-3 bg-muted border border-border rounded-lg focus:border-primary outline-none"
                                        value={giftForm.price || ''}
                                        onChange={e => setGiftForm({ ...giftForm, price: parseFloat(e.target.value) })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Categoria</label>
                                    <select
                                        className="w-full p-3 bg-muted border border-border rounded-lg focus:border-primary outline-none"
                                        value={giftForm.category}
                                        onChange={e => setGiftForm({ ...giftForm, category: e.target.value })}
                                    >
                                        <option value="Cozinha">Cozinha</option>
                                        <option value="Eletro">Eletro</option>
                                        <option value="Banheiro">Banheiro</option>
                                        <option value="Utensílios">Utensílios</option>
                                        <option value="Lua de Mel">Lua de Mel</option>
                                        <option value="Sala">Sala</option>
                                        <option value="Quarto">Quarto</option>
                                        <option value="Lavanderia">Lavanderia</option>
                                        <option value="Outros">Outros</option>
                                    </select>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Descrição</label>
                                    <textarea
                                        className="w-full p-3 bg-muted border border-border rounded-lg focus:border-primary outline-none h-20 resize-none"
                                        value={giftForm.description || ''}
                                        onChange={e => setGiftForm({ ...giftForm, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
                                        URL da Imagem <span className="text-muted-foreground font-normal">(alternativa ao upload)</span>
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://exemplo.com/imagem.jpg"
                                        className="w-full p-3 bg-muted border border-border rounded-lg focus:border-primary outline-none text-sm"
                                        value={giftForm.imageUrl || ''}
                                        onChange={e => {
                                            setGiftForm({ ...giftForm, imageUrl: e.target.value });
                                            setGiftImageFile(null);
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={savingGift}
                                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                            >
                                {savingGift ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Salvar Presente
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
