import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gift, Search, X, ShoppingCart, Plus, Filter, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { CartDrawer } from './CartDrawer';
import type { Gift as GiftType } from '../types';
import { GiftService } from '../services/giftService';
import { INITIAL_GIFTS } from '../constants/initialGifts';
import { COUPLE } from '../constants';

export const GiftListPage: React.FC = () => {
    const { addToCart, openCart, itemCount, total } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
    const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

    // Gift state
    const [gifts, setGifts] = useState<GiftType[]>([]);
    const [loading, setLoading] = useState(true);

    // Fixed categories for filter
    const categories = ['Todas', 'Cozinha', 'Eletro', 'Banheiro', 'Utensílios', 'Lua de Mel', 'Sala', 'Quarto', 'Lavanderia'];



    useEffect(() => {
        let isMounted = true;
        const loadGifts = async () => {
            setLoading(true);
            try {
                const fetchedGifts = await GiftService.getAllGifts();
                if (isMounted) {
                    if (fetchedGifts.length > 0) {
                        setGifts(fetchedGifts);
                    } else {
                        // Fallback: if nothing in database, use local constant
                        setGifts(INITIAL_GIFTS);
                    }
                }
            } catch (error) {
                console.error("Error loading gifts:", error);
                if (isMounted) setGifts(INITIAL_GIFTS); // Fallback on error
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadGifts();
        return () => { isMounted = false; };
    }, []);

    const filteredGifts = gifts.filter(gift => {
        const matchesSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todas' || gift.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Group by category only if "All" is selected
    const groupedGifts: { [key: string]: GiftType[] } = {};

    if (selectedCategory === 'Todas') {
        filteredGifts.forEach(gift => {
            if (!groupedGifts[gift.category]) groupedGifts[gift.category] = [];
            groupedGifts[gift.category].push(gift);
        });
    }

    return (
        <div className="min-h-screen bg-background font-body pb-24 md:pb-0">
            {/* Decorative background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-20">
                {/* Compact Header */}
                <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40 transition-all duration-300 shadow-sm">
                    <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <div>
                                <h1 className="text-xl md:text-2xl font-script text-foreground">Lista de Presentes</h1>
                                <p className="text-[10px] md:text-xs text-primary uppercase tracking-widest font-bold">{COUPLE.displayName}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => openCart()}
                            className="relative p-2 text-foreground hover:text-primary transition-colors hidden md:block"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg animate-scale-in">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Search and Filter (Desktop) */}
                    <div className="container mx-auto px-4 pb-4 hidden md:block">
                        <div className="flex gap-4 max-w-2xl mx-auto">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="O que você procura?"
                                    className="w-full bg-background border border-border text-foreground rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <select
                                    className="appearance-none bg-background border border-border text-foreground rounded-full py-3 pl-6 pr-12 focus:outline-none focus:border-primary cursor-pointer hover:bg-muted transition-all shadow-sm"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat} className="text-foreground">{cat}</option>
                                    ))}
                                </select>
                                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Mobile Filter (Sticky below header) */}
                <div className="md:hidden sticky top-[73px] z-30 bg-background/95 backdrop-blur-md border-b border-border py-3 px-4 shadow-sm">
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar presente..."
                                className="w-full bg-background border border-border text-foreground text-sm rounded-lg py-2 pl-9 pr-3 focus:outline-none focus:border-primary shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsMobileCategoryOpen(true)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border shadow-sm ${selectedCategory !== 'Todas' ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-border text-foreground'}`}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="max-w-[80px] truncate">{selectedCategory === 'Todas' ? 'Filtros' : selectedCategory}</span>
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-muted-foreground animate-pulse">Carregando presentes...</p>
                    </div>
                )}

                {!loading && (
                    <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">

                        {filteredGifts.length === 0 ? (
                            <div className="text-center py-16 bg-card rounded-2xl border border-border mx-auto max-w-2xl shadow-sm">
                                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                                    <Search className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-heading text-foreground mb-2">Nenhum presente encontrado</h3>
                                <p className="text-muted-foreground">Tente buscar por outro termo ou categoria.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                                    className="mt-6 text-primary hover:text-foreground underline transition-colors"
                                >
                                    Limpar filtros
                                </button>
                            </div>
                        ) : (
                            <>
                                {selectedCategory === 'Todas' && !searchTerm ? (
                                    // Grouped by Category View
                                    <div className="space-y-12">
                                        {categories.filter(c => c !== 'Todas').map(category => {
                                            const categoryGifts = groupedGifts[category];
                                            if (!categoryGifts || categoryGifts.length === 0) return null;

                                            return (
                                                <section key={category} className="scroll-mt-32" id={`cat-${category}`}>
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <h2 className="text-2xl md:text-3xl font-heading text-primary">{category}</h2>
                                                        <div className="h-px bg-border flex-1"></div>
                                                    </div>

                                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                                                        {categoryGifts.map(gift => (
                                                            <GiftCard key={gift.id} gift={gift} addToCart={addToCart} />
                                                        ))}
                                                    </div>
                                                </section>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    // Flat List View (Search or Specific Category)
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 animate-fade-in">
                                        {filteredGifts.map(gift => (
                                            <GiftCard key={gift.id} gift={gift} addToCart={addToCart} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                )}
            </div>

            {/* Mobile Category Bottom Sheet */}
            {isMobileCategoryOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileCategoryOpen(false)}></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-6 animate-slide-up border-t border-border max-h-[80vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-heading text-foreground">Filtrar por Categoria</h3>
                            <button onClick={() => setIsMobileCategoryOpen(false)} className="text-muted-foreground p-2"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setIsMobileCategoryOpen(false);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className={`p-4 rounded-xl text-sm font-bold uppercase tracking-wider text-left transition-all ${selectedCategory === cat
                                        ? 'bg-primary text-primary-foreground shadow-lg'
                                        : 'bg-muted text-foreground hover:bg-accent border border-border'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Cart Button (Mobile Only) */}
            <div className={`fixed bottom-6 right-6 z-40 md:hidden transition-all duration-500 ${itemCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <button
                    onClick={() => openCart()}
                    className="bg-primary text-primary-foreground p-4 rounded-full shadow-2xl flex items-center gap-3 pr-6 hover:scale-105 active:scale-95 transition-all"
                >
                    <div className="relative">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 bg-background text-primary text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                            {itemCount}
                        </span>
                    </div>
                    <span className="font-bold text-sm">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                    </span>
                </button>
            </div>

            <CartDrawer />
        </div>
    );
};

// Gift Card Component
const GiftCard: React.FC<{ gift: GiftType, addToCart: (gift: GiftType) => void }> = ({ gift, addToCart }) => {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(gift);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-card group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border flex flex-col h-full transform hover:-translate-y-1">
            <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                    src={gift.imageUrl}
                    alt={gift.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Category Overlay */}
                <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-md border border-white/10">
                        {gift.category}
                    </span>
                </div>

                {/* Quick Action Overlay (Desktop) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button
                        onClick={handleAdd}
                        className="bg-background text-foreground px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 flex items-center gap-2 shadow-xl"
                    >
                        {added ? <CheckIcon className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {added ? 'Adicionado' : 'Adicionar'}
                    </button>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1 bg-card relative z-10">
                <h3 className="text-foreground font-heading text-lg leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2 min-h-[50px] md:min-h-[44px]">
                    {gift.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1 font-body leading-relaxed">
                    {gift.description}
                </p>

                <div className="flex items-end justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Valor</span>
                        <span className="text-xl font-bold text-foreground">
                            <span className="text-sm align-top text-muted-foreground mr-0.5">R$</span>
                            {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    {/* Mobile Add Button */}
                    <button
                        onClick={handleAdd}
                        className={`md:hidden p-3 rounded-full shadow-lg transition-all active:scale-95 ${added ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground'}`}
                    >
                        {added ? <CheckIcon className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default GiftListPage;
