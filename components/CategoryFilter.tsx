import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

const categories: Category[] = [
  'All',
  'Exotic',
  'Tropical',
  'Berries',
  'Citrus',
  'Organic Baskets',
  'Seasonal'
];

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-emerald-950">
          Explore Farm Categories
        </h2>
        <span className="text-xs sm:text-sm text-emerald-700 font-medium">
          Showing hand-selected fresh lots
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all shadow-xs ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-emerald-700/20 shadow-md scale-105'
                  : 'bg-white text-emerald-900 border border-emerald-100 hover:bg-emerald-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
