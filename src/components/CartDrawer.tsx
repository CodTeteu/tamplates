import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Heart, CreditCard, QrCode, Loader2, Copy, Check, Shield, ExternalLink, ChevronDown, Sparkles, Gift } from 'lucide-react';
import { useCart, CartItem } from '../contexts/CartContext';
import { PIX_KEY, CONFIRMATION_PHONE } from '../types';
import { PaymentService, GiftService } from '../services';
import { calculateMPAdjustedPrice, COUPLE, PIX } from '../constants';

type PaymentMethod = 'mercadopago' | 'pix';
type CheckoutStep = 'cart' | 'form' | 'pix-details';

export const CartDrawer: React.FC = () => {
    const { items, removeFromCart, clearCart, total, itemCount, isOpen, closeCart } = useCart();
    const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
    const [buyerName, setBuyerName] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [pixPaymentSaved, setPixPaymentSaved] = useState(false);

    // Total with Mercado Pago fee for card
    const totalWithCardFee = calculateMPAdjustedPrice(total);

    const formatPrice = (price: number) => {
        return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const handleCopyPix = async () => {
        navigator.clipboard.writeText(PIX_KEY);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        // Save PIX payment to Firestore (only once)
        if (!pixPaymentSaved && buyerName && items.length > 0) {
            try {
                await GiftService.savePixPayment({
                    buyerName,
                    buyerPhone,
                    items: items.map(item => ({ id: item.id, name: item.name, price: item.price })),
                    totalAmount: total,
                    paymentMethod: 'pix'
                });
                setPixPaymentSaved(true);
                console.log('PIX payment saved to Firestore');
            } catch (err) {
                console.error('Error saving PIX payment:', err);
            }
        }
    };

    const handleCheckout = () => {
        if (items.length === 0) return;
        setCheckoutStep('form');
        setIsExpanded(true);
    };

    const handlePayment = async () => {
        if (!buyerName.trim()) {
            setError('Por favor, informe seu nome completo');
            return;
        }
        if (!buyerPhone.trim() || buyerPhone.length < 14) {
            setError('Por favor, informe seu telefone correto');
            return;
        }

        setError(null);

        if (paymentMethod === 'pix') {
            setCheckoutStep('pix-details');
            return;
        }

        setLoading(true);

        try {
            const data = await PaymentService.createPreference({
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    imageUrl: item.imageUrl,
                    quantity: 1
                })),
                buyerName,
                buyerPhone
            });

            const checkoutUrl = data.init_point;

            if (checkoutUrl) {
                clearCart();
                window.location.href = checkoutUrl;
            } else {
                throw new Error('URL de checkout não disponível');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro. Tente novamente.');
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (checkoutStep === 'pix-details') {
            setCheckoutStep('form');
        } else if (checkoutStep === 'form') {
            setCheckoutStep('cart');
            setIsExpanded(false);
        }
    };

    const handleClose = () => {
        closeCart();
        setTimeout(() => {
            setCheckoutStep('cart');
            setError(null);
            setIsExpanded(false);
        }, 300);
    };

    if (!isOpen) return null;

    const isMiniMode = !isExpanded && checkoutStep === 'cart';

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[150] transition-all duration-300 ${isMiniMode
                    ? 'bg-black/20'
                    : 'bg-black/50 backdrop-blur-sm'
                    }`}
                onClick={handleClose}
            />

            {/* Drawer */}
            <div
                className={`fixed z-[151] transition-all duration-300 ease-out ${isMiniMode
                    ? 'bottom-0 right-0 left-0 md:left-auto md:right-4 md:bottom-4 md:w-96'
                    : 'top-0 right-0 bottom-0 w-full max-w-md'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`bg-background shadow-2xl flex flex-col h-full ${isMiniMode
                    ? 'rounded-t-3xl md:rounded-2xl max-h-[70vh] md:max-h-[500px]'
                    : 'animate-slide-in-right'
                    }`}>

                    {/* Premium Header */}
                    <div className={`relative overflow-hidden ${isMiniMode ? 'rounded-t-3xl md:rounded-t-2xl' : ''}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-95"></div>
                        <div className="absolute inset-0 opacity-30"></div>

                        <div className="relative p-4">
                            {isMiniMode && (
                                <div className="flex justify-center mb-3 md:hidden">
                                    <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-primary-foreground">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                        {checkoutStep === 'cart' && <ShoppingCart className="w-5 h-5" />}
                                        {checkoutStep === 'form' && <Heart className="w-5 h-5" />}
                                        {checkoutStep === 'pix-details' && <QrCode className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h2 className="font-heading text-lg leading-tight">
                                            {checkoutStep === 'cart' && 'Sua Lista'}
                                            {checkoutStep === 'form' && 'Finalizar'}
                                            {checkoutStep === 'pix-details' && 'PIX'}
                                        </h2>
                                        {checkoutStep === 'cart' && (
                                            <p className="text-white/70 text-xs">
                                                {itemCount} {itemCount === 1 ? 'presente' : 'presentes'}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {isMiniMode && items.length > 0 && (
                                        <button
                                            onClick={() => setIsExpanded(true)}
                                            className="p-2 text-white/80 hover:text-white transition-colors"
                                        >
                                            <ChevronDown className="w-5 h-5 rotate-180" />
                                        </button>
                                    )}
                                    <button
                                        onClick={handleClose}
                                        className="p-2 text-white/80 hover:text-white transition-colors bg-white/10 rounded-xl hover:bg-white/20"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto overscroll-contain">
                        {/* STEP: Cart */}
                        {checkoutStep === 'cart' && (
                            <>
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center p-8 text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-muted to-accent/20 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                                            <Gift className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <h3 className="font-heading text-base text-foreground mb-1">Lista vazia</h3>
                                        <p className="text-muted-foreground text-xs max-w-[200px]">
                                            Escolha presentes especiais para nos abençoar!
                                        </p>
                                    </div>
                                ) : (
                                    <div className="p-3 space-y-2">
                                        {items.map((item, index) => (
                                            <CartItemCard
                                                key={item.cartId}
                                                item={item}
                                                onRemove={() => removeFromCart(item.cartId)}
                                                formatPrice={formatPrice}
                                                isCompact={isMiniMode && items.length > 2}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        {/* STEP: Form */}
                        {checkoutStep === 'form' && (
                            <div className="p-4 space-y-4">
                                {/* Items preview */}
                                <div className="bg-gradient-to-br from-muted to-background rounded-2xl p-4 border border-border shadow-sm">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles className="w-4 h-4 text-primary" />
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {itemCount} {itemCount === 1 ? 'presente' : 'presentes'}
                                        </span>
                                    </div>

                                    <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1">
                                        {items.slice(0, 4).map((item) => (
                                            <img
                                                key={item.cartId}
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border-2 border-background shadow-sm"
                                            />
                                        ))}
                                        {items.length > 4 && (
                                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                                +{items.length - 4}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 pl-1">
                                            Seu Nome <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={buyerName}
                                            onChange={(e) => setBuyerName(e.target.value)}
                                            placeholder="Como você se chama?"
                                            required
                                            className="w-full px-4 py-3 bg-muted border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 pl-1">
                                            Seu Telefone / WhatsApp <span className="text-destructive">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={buyerPhone}
                                            onChange={(e) => {
                                                let v = e.target.value.replace(/\D/g, '');
                                                if (v.length > 11) v = v.slice(0, 11);
                                                v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
                                                v = v.replace(/(\d)(\d{4})$/, '$1-$2');
                                                setBuyerPhone(v);
                                            }}
                                            placeholder="(11) 99999-9999"
                                            required
                                            maxLength={15}
                                            className="w-full px-4 py-3 bg-muted border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground"
                                        />
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2 pl-1">
                                        Como deseja pagar?
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {/* PIX */}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('pix')}
                                            className={`relative p-4 rounded-xl transition-all flex flex-col items-center gap-2 overflow-hidden ${paymentMethod === 'pix'
                                                ? 'bg-primary text-primary-foreground shadow-lg scale-[1.02]'
                                                : 'bg-muted text-muted-foreground hover:bg-accent'
                                                }`}
                                        >
                                            {paymentMethod === 'pix' && (
                                                <div className="absolute top-1 right-1">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            )}
                                            <QrCode className="w-6 h-6" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">
                                                PIX Direto
                                            </span>
                                            <span className="text-[9px] opacity-70">
                                                Sem taxas ✓
                                            </span>
                                        </button>
                                        {/* Credit Card */}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('mercadopago')}
                                            className={`relative p-4 rounded-xl transition-all flex flex-col items-center gap-2 overflow-hidden ${paymentMethod === 'mercadopago'
                                                ? 'bg-[#009ee3] text-white shadow-lg scale-[1.02]'
                                                : 'bg-muted text-muted-foreground hover:bg-accent'
                                                }`}
                                        >
                                            {paymentMethod === 'mercadopago' && (
                                                <div className="absolute top-1 right-1">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            )}
                                            <CreditCard className="w-6 h-6" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">
                                                Cartão de Crédito
                                            </span>
                                            <span className="text-[9px] opacity-70">
                                                Até 12x
                                            </span>
                                        </button>
                                    </div>
                                    {paymentMethod === 'mercadopago' && (
                                        <p className="text-[10px] text-blue-600 bg-blue-50 border border-blue-100 rounded-lg p-2 mt-2 text-center">
                                            💳 Parcelamento disponível! O valor acima é 1x. Escolha suas parcelas no checkout.
                                        </p>
                                    )}
                                </div>

                                {error && (
                                    <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-xl flex items-center gap-2">
                                        <X className="w-4 h-4 flex-shrink-0" />
                                        {error}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* STEP: PIX Details */}
                        {checkoutStep === 'pix-details' && (
                            <div className="p-4 space-y-4">
                                {/* Total */}
                                <div className="text-center py-2">
                                    <p className="text-muted-foreground text-xs mb-1">Valor total</p>
                                    <p className="text-3xl font-bold text-primary">
                                        {formatPrice(total)}
                                    </p>
                                </div>

                                {/* QR Code */}
                                <div className="flex justify-center">
                                    <div className="bg-background p-3 rounded-2xl border-2 border-border shadow-lg">
                                        <img
                                            src="/qrcode_pix.png"
                                            alt="QR Code PIX"
                                            className="w-36 h-36 object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Bank Info */}
                                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-100 rounded-xl p-3 text-center">
                                    <p className="text-sm text-orange-900 font-heading">{PIX.recipientName}</p>
                                    <p className="text-xs text-orange-600 mt-0.5">{PIX.bank}</p>
                                </div>

                                {/* PIX Key */}
                                <button
                                    onClick={handleCopyPix}
                                    className={`w-full p-4 rounded-xl flex items-center justify-between group transition-all ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-muted hover:bg-accent'
                                        }`}
                                >
                                    <span className={`font-mono text-xs truncate ${copied ? 'text-white' : 'text-foreground'}`}>
                                        {PIX_KEY}
                                    </span>
                                    <div className={`flex items-center gap-1.5 text-xs font-medium ${copied ? 'text-white' : 'text-primary'}`}>
                                        {copied ? (
                                            <><Check className="w-4 h-4" /> Copiado!</>
                                        ) : (
                                            <><Copy className="w-4 h-4" /> Copiar</>
                                        )}
                                    </div>
                                </button>

                                {/* WhatsApp Confirmation Button */}
                                <button
                                    onClick={async () => {
                                        if (!pixPaymentSaved && buyerName && items.length > 0) {
                                            try {
                                                await GiftService.savePixPayment({
                                                    buyerName,
                                                    buyerPhone,
                                                    items: items.map(item => ({ id: item.id, name: item.name, price: item.price })),
                                                    totalAmount: total,
                                                    paymentMethod: 'pix'
                                                });
                                                setPixPaymentSaved(true);
                                            } catch (err) {
                                                console.error('Error saving PIX payment:', err);
                                            }
                                        }
                                        const message = `Olá ${COUPLE.displayName}! 💕\n\nAcabei de fazer um PIX com um presentinho especial para vocês! Que Deus abençoe muito essa união! 🎁✨`;
                                        window.open(`https://wa.me/${CONFIRMATION_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
                                    }}
                                    className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Confirmar pelo WhatsApp
                                </button>

                                <p className="text-center text-muted-foreground text-[10px]">
                                    Após o pagamento, confirme pelo WhatsApp
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className={`p-4 border-t border-border bg-background ${isMiniMode ? 'rounded-b-3xl md:rounded-b-2xl' : ''}`}>
                        {checkoutStep === 'cart' && items.length > 0 && (
                            <>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-medium text-foreground">Total</span>
                                    <span className="text-xl font-bold text-primary">
                                        {formatPrice(total)}
                                    </span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <Heart className="w-4 h-4" />
                                    Continuar
                                </button>
                                <button
                                    onClick={clearCart}
                                    className="w-full mt-2 text-muted-foreground hover:text-foreground text-[10px] py-1 transition-colors"
                                >
                                    Limpar lista
                                </button>
                            </>
                        )}

                        {checkoutStep === 'form' && (
                            <>
                                <button
                                    onClick={handlePayment}
                                    disabled={loading}
                                    className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 ${paymentMethod === 'mercadopago'
                                        ? 'bg-[#009ee3] hover:bg-[#007eb5] text-white'
                                        : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                                        }`}
                                >
                                    {loading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</>
                                    ) : paymentMethod === 'mercadopago' ? (
                                        <><CreditCard className="w-4 h-4" /> Pagar 1x {formatPrice(totalWithCardFee)} <ExternalLink className="w-3 h-3" /></>
                                    ) : (
                                        <><QrCode className="w-4 h-4" /> Pagar {formatPrice(total)} via PIX</>
                                    )}
                                </button>
                                <button
                                    onClick={handleBack}
                                    className="w-full mt-2 text-muted-foreground hover:text-foreground text-[10px] py-1 transition-colors"
                                >
                                    ← Voltar
                                </button>
                                <div className="mt-2 flex items-center justify-center gap-1.5 text-muted-foreground text-[10px]">
                                    <Shield className="w-3 h-3" />
                                    <span>Pagamento 100% seguro</span>
                                </div>
                            </>
                        )}

                        {checkoutStep === 'pix-details' && (
                            <button
                                onClick={handleBack}
                                className="w-full text-muted-foreground hover:text-foreground text-xs py-2 transition-colors"
                            >
                                ← Voltar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

// Cart Item Card Component
const CartItemCard: React.FC<{
    item: CartItem;
    onRemove: () => void;
    formatPrice: (price: number) => string;
    isCompact?: boolean;
    index: number;
}> = ({ item, onRemove, formatPrice, isCompact, index }) => {
    return (
        <div
            className={`bg-gradient-to-br from-card to-muted/50 rounded-xl border border-border/50 flex gap-3 shadow-sm hover:shadow-md transition-all ${isCompact ? 'p-2' : 'p-3'}`}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <img
                src={item.imageUrl}
                alt={item.name}
                className={`object-cover rounded-lg shadow-sm ${isCompact ? 'w-12 h-12' : 'w-14 h-14'}`}
            />
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4 className={`font-heading text-foreground leading-tight truncate ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    {item.name}
                </h4>
                <p className={`text-primary font-bold ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    {formatPrice(item.price)}
                </p>
            </div>
            <button
                onClick={onRemove}
                className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all self-center"
            >
                <Trash2 className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
            </button>
        </div>
    );
};

export default CartDrawer;
