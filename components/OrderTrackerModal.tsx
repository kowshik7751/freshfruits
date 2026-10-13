import React from 'react';
import { Order } from '../types';
import { X, PackageOpen, Truck, CheckCircle2, Clock } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export default function OrderTrackerModal({ isOpen, onClose, orders }: OrderTrackerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PackageOpen className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-lg font-bold font-serif">Order History & Tracking</h2>
              <p className="text-xs text-emerald-200">Track your farm-fresh deliveries</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-emerald-800 text-emerald-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 flex-1 overflow-y-auto">
          {orders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <PackageOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-serif font-bold text-base text-slate-700">No Orders Placed Yet</h3>
              <p className="text-xs text-slate-500">Your recent fruit basket orders will appear right here.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-sm text-emerald-900">{order.id}</span>
                    <span className="text-xs text-slate-500 ml-2">{order.date}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-bold">
                    {order.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>Slot: <strong>{order.deliverySlot}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-emerald-600" />
                    <span>Deliver to: {order.deliveryAddress.address}, {order.deliveryAddress.city}</span>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-600">
                    {order.items.length} items • <strong className="text-emerald-950">${order.total.toFixed(2)}</strong>
                  </span>
                  <span className="text-emerald-700 font-semibold">Cold Transit Active</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
