'use client';

import React, { useState } from 'react';
import { initialProducts } from '@/lib/fruitsData';
import { Product, Category, CartItem, Order } from '@/types';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import OrderTrackerModal from '@/components/OrderTrackerModal';
import AiRecipeAssistant from '@/components/AiRecipeAssistant';
import Footer from '@/components/Footer';
import { Sparkles, Heart, PackageOpen, ShieldCheck, Zap } from 'lucide-react';

export default function Page() {
  const [products] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['f1', 'f3']);
  const [orders, setOrders] = useState<Order[]>([]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAiRecipeOpen, setIsAiRecipeOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-emerald-50/20 flex flex-col font-sans">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAiRecipe={() => setIsAiRecipeOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAiRecipe={() => setIsAiRecipeOpen(true)}
      />

      {/* Category Filter */}
      <div id="catalog-section">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Main Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-emerald-100 shadow-sm space-y-4 my-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <PackageOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-800">No fruits found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any fresh produce matching &quot;{searchQuery}&quot;. Try searching for mangoes, berries, or organic baskets.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-xs shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onQuickView={(p) => setSelectedProductForModal(p)}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      {selectedProductForModal && (
        <ProductModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setIsCheckoutOpen(true)}
        onOpenAiRecipeWithCart={() => setIsAiRecipeOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderPlaced={(newOrder) => {
          setOrders([newOrder, ...orders]);
          setCartItems([]);
        }}
      />

      <OrderTrackerModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      <AiRecipeAssistant
        isOpen={isAiRecipeOpen}
        onClose={() => setIsAiRecipeOpen(false)}
        availableProducts={products}
        initialFruitNames={cartItems.map((i) => i.product.name)}
      />

      {/* Wishlist Modal */}
      {isWishlistModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col p-6">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
              <h3 className="text-xl font-serif font-bold text-emerald-950 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-current" />
                <span>Your Saved Wishlist</span>
              </h3>
              <button onClick={() => setIsWishlistModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100">
                ✕
              </button>
            </div>
            <div className="py-4 space-y-3 flex-1 overflow-y-auto">
              {wishlistedProducts.length === 0 ? (
                <p className="text-center text-xs text-slate-500 py-10">No wishlisted fruits yet.</p>
              ) : (
                wishlistedProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-slate-900">{p.name}</h4>
                        <span className="text-xs text-emerald-700 font-semibold">${p.price.toFixed(2)} / {p.unit}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          handleAddToCart(p, 1);
                          setIsWishlistModalOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleToggleWishlist(p)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
