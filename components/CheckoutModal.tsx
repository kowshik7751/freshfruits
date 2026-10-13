import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { X, CheckCircle2, Truck, CreditCard, ShieldCheck, MapPin } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (order: Order) => void;
}

export default function CheckoutModal({ isOpen, onClose, items, onOrderPlaced }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('Tomorrow Morning (8 AM - 11 AM)');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [createdOrderId, setCreatedOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 50 || subtotal === 0 ? 0 : 5.99;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !address || !city || !phone) {
      alert('Please fill in all required delivery details.');
      return;
    }

    const newOrder: Order = {
      id: `KFF-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...items],
      total,
      status: 'Order Placed',
      deliveryAddress: {
        fullName,
        address,
        city,
        phone,
        notes,
      },
      deliverySlot,
    };

    setCreatedOrderId(newOrder.id);
    onOrderPlaced(newOrder);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'form' ? (
          <>
            <div className="p-6 bg-emerald-900 text-white flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif">Checkout & Delivery</h2>
                <p className="text-xs text-emerald-200">Secure 256-bit encrypted checkout</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-emerald-800 text-emerald-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-emerald-950 text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Delivery Address</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Karthik Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="742 Evergreen Terrace, Apt 4B"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City / State *</label>
                    <input
                      type="text"
                      required
                      placeholder="San Francisco, CA"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Instructions (Opt.)</label>
                    <input
                      type="text"
                      placeholder="Leave at front porch"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Slot */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-emerald-950 text-base flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Choose Delivery Slot</span>
                </h3>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option>Today Evening (5 PM - 8 PM)</option>
                  <option>Tomorrow Morning (8 AM - 11 AM)</option>
                  <option>Tomorrow Evening (5 PM - 8 PM)</option>
                  <option>Day After Tomorrow (9 AM - 12 PM)</option>
                </select>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-emerald-950 text-base flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Payment Simulation</span>
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'apple' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'cod' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                </div>
              </div>

              {/* Summary & Submit */}
              <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Total Amount</span>
                  <span className="text-xl font-extrabold text-emerald-900">${total.toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all"
                >
                  Place Harvest Order
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-emerald-950">Order Placed Successfully!</h2>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you for ordering with <strong className="text-emerald-800">Karthik Fresh Fruits</strong>. Your order <span className="font-mono font-bold text-emerald-900">{createdOrderId}</span> is being hand-harvested by our farmers!
              </p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl text-left space-y-2 max-w-md mx-auto text-xs text-slate-700 border border-emerald-100">
              <div className="flex justify-between font-semibold text-emerald-900">
                <span>Delivery Slot:</span>
                <span>{deliverySlot}</span>
              </div>
              <div className="flex justify-between">
                <span>Deliver to:</span>
                <span>{address}, {city}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-950 pt-2 border-t border-emerald-200">
                <span>Total Paid:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
