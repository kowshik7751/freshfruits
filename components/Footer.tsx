import React from 'react';
import { Apple, ShieldCheck, Truck, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-white mt-16 pt-16 pb-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-900">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Apple className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold font-serif tracking-tight">Karthik Fresh</span>
          </div>
          <p className="text-xs text-emerald-300 leading-relaxed font-light">
            Sourcing the world’s finest organic fruits, farm hampers, and antioxidant berries directly from sustainable orchards.
          </p>
        </div>

        <div>
          <h4 className="font-serif font-bold text-sm text-amber-300 mb-4 uppercase tracking-wider">Fresh Categories</h4>
          <ul className="space-y-2.5 text-xs text-emerald-200">
            <li><a href="#" className="hover:text-white transition-colors">Exotic Dragon Fruit & Kiwis</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Alphonso & Seasonal Mangoes</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Organic Chilean Berries</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Handcrafted Fruit Baskets</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-sm text-amber-300 mb-4 uppercase tracking-wider">Customer Care</h4>
          <ul className="space-y-2.5 text-xs text-emerald-200">
            <li><a href="#" className="hover:text-white transition-colors">Cold Chain Delivery Tracker</a></li>
            <li><a href="#" className="hover:text-white transition-colors">100% Freshness Guarantee</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Subscription & Bulk Baskets</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Orchard Partnership Program</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-serif font-bold text-sm text-amber-300 mb-4 uppercase tracking-wider">Orchard Newsletter</h4>
          <p className="text-xs text-emerald-300">Subscribe for seasonal arrivals, harvest updates, and AI smoothie recipes.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-emerald-900/80 border border-emerald-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex-1"
            />
            <button
              onClick={() => alert('Thank you for subscribing to Karthik Fresh Fruits orchard alerts!')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs transition-colors"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400 gap-4">
        <p>© 2026 Karthik Fresh Fruits Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Harvest</a>
          <a href="#" className="hover:underline">Cold Chain Standards</a>
        </div>
      </div>
    </footer>
  );
}
