import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onOpenAiRecipeWithCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onOpenAiRecipeWithCart,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeDeliveryThreshold = 50;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 5.99;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);
  const progressToFree = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'FRESH10') {
      setDiscount(subtotal * 0.1);
      setPromoMessage('10% discount applied successfully!');
    } else if (promoCode.toUpperCase() === 'KARTHIK20') {
      setDiscount(10);
      setPromoMessage('$10 off applied successfully!');
    } else {
      setPromoMessage('Invalid promo code. Try FRESH10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-emerald-950/50 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-emerald-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-lg font-bold font-serif">Your Fruit Cart</h2>
                <p className="text-xs text-emerald-200">{items.length} items selected</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Progress */}
          <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100">
            <div className="flex justify-between text-xs font-semibold text-emerald-900 mb-1.5">
              <span>
                {subtotal >= freeDeliveryThreshold
                  ? '🎉 You unlocked Free Cold Delivery!'
                  : `Add $${(freeDeliveryThreshold - subtotal).toFixed(2)} more for Free Delivery`}
              </span>
              <span>{Math.round(progressToFree)}%</span>
            </div>
            <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressToFree}%` }}
              />
            </div>
          </div>

          {/* AI Smoothie Prompt Suggestion */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-orange-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-medium text-amber-900">Make a smoothie with your cart items!</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenAiRecipeWithCart();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Get Recipe
              </button>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore our farm-fresh mangoes, berries, and organic baskets to start your order.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-xs shadow-md shadow-emerald-600/20"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-emerald-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                      ${item.product.price.toFixed(2)} <span className="text-slate-400 font-normal">/ {item.product.unit}</span>
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 hover:bg-slate-100 text-slate-700"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 hover:bg-slate-100 text-slate-700"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-sm text-emerald-950">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Section */}
          {items.length > 0 && (
            <div className="p-6 border-t border-emerald-100 bg-emerald-50/40 space-y-4">
              {/* Promo Code Input */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. FRESH10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-emerald-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] font-medium ${discount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {promoMessage}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-emerald-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Cold Delivery Fee</span>
                  <span className="font-semibold text-slate-800">
                    {deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-emerald-950 pt-2 border-t border-emerald-200">
                  <span>Total Due</span>
                  <span className="text-emerald-700">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
