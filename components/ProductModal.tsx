import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, Plus, Minus, ShoppingBag, ShieldCheck, MapPin, Award } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'reviews'>('details');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 bg-emerald-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/95 text-slate-700 hover:bg-white hover:text-emerald-900 shadow-md transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          {product.badge && (
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-emerald-900/90 text-white text-xs font-bold shadow-md backdrop-blur-xs">
              {product.badge}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-amber-600 font-semibold text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mb-2">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 text-xs text-slate-600 mb-4">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Grown in {product.origin}</span>
              <span className="text-emerald-300">•</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Pesticide Free</span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-emerald-100 mb-4 gap-6 text-sm">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 font-semibold transition-colors relative ${
                  activeTab === 'details' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-emerald-900'
                }`}
              >
                About Harvest
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`pb-2 font-semibold transition-colors relative ${
                  activeTab === 'nutrition' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-emerald-900'
                }`}
              >
                Nutritional Profile
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 font-semibold transition-colors relative ${
                  activeTab === 'reviews' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-emerald-900'
                }`}
              >
                Reviews ({product.reviews.length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="min-h-[100px] text-sm text-slate-600">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p className="leading-relaxed">{product.description}</p>
                  <div className="bg-emerald-50/60 p-4 rounded-2xl flex items-start gap-3 mt-4">
                    <Award className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-900">Karthik&apos;s Freshness Promise</h4>
                      <p className="text-xs text-emerald-800/80 mt-0.5">
                        Hand-selected by our master growers, cold-stored in transit, and delivered at optimal ripeness.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div className="space-y-3 bg-emerald-50/40 p-4 rounded-2xl">
                  <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="bg-white p-3 rounded-xl border border-emerald-100">
                      <span className="text-slate-400 block text-[11px]">Energy</span>
                      <strong className="text-emerald-950">{product.nutrition.calories}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-emerald-100">
                      <span className="text-slate-400 block text-[11px]">Dietary Fiber</span>
                      <strong className="text-emerald-950">{product.nutrition.fiber}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-emerald-100">
                      <span className="text-slate-400 block text-[11px]">Natural Sugars</span>
                      <strong className="text-emerald-950">{product.nutrition.sugar}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-emerald-100">
                      <span className="text-slate-400 block text-[11px]">Key Vitamins</span>
                      <strong className="text-emerald-950">{product.nutrition.vitamins.join(', ')}</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-800 text-xs">{rev.author}</span>
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">{rev.comment}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{rev.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-6 mt-6 border-t border-emerald-100 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block">Total Price</span>
              <span className="text-2xl font-extrabold text-emerald-900">
                ${(product.price * quantity).toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 ml-1">({quantity} {product.unit})</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-emerald-200 rounded-xl overflow-hidden bg-emerald-50/50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 hover:bg-emerald-100 text-emerald-900 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3.5 font-bold text-sm text-emerald-950">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 hover:bg-emerald-100 text-emerald-900 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
