import React from 'react';
import { ShieldCheck, Truck, Sparkles, Clock, Leaf } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenAiRecipe: () => void;
}

export default function Hero({ onExploreClick, onOpenAiRecipe }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6 shadow-2xl">
      {/* Background Decorative Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600 text-emerald-200 text-xs font-semibold backdrop-blur-sm">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Pesticide-Free & Harvested Daily</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif leading-tight">
            Pure Orchard Freshness, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
              Delivered To Your Door.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
            Experience hand-picked seasonal exotic fruits, organic hampers, and antioxidant-rich berries sourced directly from sustainable family orchards.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-base shadow-lg shadow-amber-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Shop Fresh Harvest
            </button>
            <button
              onClick={onOpenAiRecipe}
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-base backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>AI Smoothie Chef</span>
            </button>
          </div>

          {/* Quick Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-emerald-700/60 text-xs sm:text-sm text-emerald-200 font-medium">
            <div className="flex items-center gap-2.5 justify-center lg:justify-start">
              <Truck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Same-Day Cold Delivery</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center lg:justify-start">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>100% Freshness Guarantee</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center lg:justify-start col-span-2 sm:col-span-1">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Harvested Within 24 Hours</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
            <img
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80"
              alt="Fresh Fruits Basket"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-amber-300 font-semibold text-xs tracking-wider uppercase">Featured Hamper</span>
              <h3 className="text-xl font-bold font-serif text-white">Royal Organic Fruit Basket</h3>
              <p className="text-xs text-emerald-200 mt-1">Handcrafted bamboo hamper with 5kg seasonal superfoods</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
