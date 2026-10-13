'from client';
import React from 'react';
import { Apple, ShoppingBag, Sparkles, Search, PackageOpen, Heart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAiRecipe: () => void;
  onOpenOrders: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenAiRecipe,
  onOpenOrders,
  searchQuery,
  setSearchQuery,
  wishlistCount,
  onOpenWishlist,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Apple className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-emerald-900 font-serif">
              Karthik <span className="text-emerald-600 font-sans">Fresh Fruits</span>
            </span>
            <p className="text-xs text-emerald-700 font-medium tracking-wide">Orchard to Doorstep Daily</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
          <input
            type="text"
            placeholder="Search farm-fresh mangoes, berries, organic baskets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-emerald-50/60 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-sm transition-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Recipe Advisor Button */}
          <button
            onClick={onOpenAiRecipe}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-all"
            title="AI Smoothie & Recipe Assistant"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Recipe Chef</span>
          </button>

          {/* Orders Tracking Button */}
          <button
            onClick={onOpenOrders}
            className="p-2.5 rounded-full text-emerald-800 hover:bg-emerald-50 transition-all relative"
            title="My Orders & Tracking"
          >
            <PackageOpen className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="p-2.5 rounded-full text-emerald-800 hover:bg-emerald-50 transition-all relative hidden xs:flex"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-md shadow-emerald-600/20 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
          <input
            type="text"
            placeholder="Search farm-fresh fruits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-emerald-50/80 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>
      </div>
    </header>
  );
}
