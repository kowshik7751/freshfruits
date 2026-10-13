import React from 'react';
import { Product } from '../types';
import { Star, Plus, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image & Badge Container */}
      <div className="relative aspect-square overflow-hidden bg-emerald-50/50 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-800/90 text-emerald-100 text-[11px] font-bold backdrop-blur-xs shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-4 py-2 rounded-full bg-white/95 text-emerald-900 text-xs font-bold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-emerald-700 mb-1">
            <span className="font-semibold uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1 font-semibold text-amber-600">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif font-bold text-base sm:text-lg text-emerald-950 hover:text-emerald-700 cursor-pointer line-clamp-1 transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {product.description}
          </p>

          <p className="text-[11px] text-emerald-600 font-medium mt-2">
            Origin: {product.origin}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-emerald-50 flex items-center justify-between">
          <div>
            <span className="text-lg sm:text-xl font-extrabold text-emerald-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500 ml-1">/ {product.unit}</span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="p-2.5 sm:px-4 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all active:scale-95"
            title="Add to Cart"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
