import React, { useState } from 'react';
import { Product } from '../types';
import { X, Sparkles, Wand2, ChefHat, Loader2, ArrowRight } from 'lucide-react';
import Markdown from 'react-markdown';

interface AiRecipeAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  availableProducts: Product[];
  initialFruitNames?: string[];
}

export default function AiRecipeAssistant({
  isOpen,
  onClose,
  availableProducts,
  initialFruitNames = [],
}: AiRecipeAssistantProps) {
  const [selectedFruits, setSelectedFruits] = useState<string[]>(
    initialFruitNames.length > 0 ? initialFruitNames : ['Alphonso Mangoes (Grade A)', 'Organic Chilean Blueberries']
  );
  const [promptType, setPromptType] = useState<'smoothie' | 'salad' | 'custom'>('smoothie');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeResult, setRecipeResult] = useState('');

  if (!isOpen) return null;

  const handleToggleFruit = (name: string) => {
    if (selectedFruits.includes(name)) {
      setSelectedFruits(selectedFruits.filter((f) => f !== name));
    } else {
      setSelectedFruits([...selectedFruits, name]);
    }
  };

  const handleGenerateRecipe = async () => {
    setLoading(true);
    setRecipeResult('');
    try {
      const res = await fetch('/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fruitNames: selectedFruits,
          promptType,
          customPrompt,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRecipeResult(data.recipe);
      } else {
        setRecipeResult('Failed to generate recipe. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setRecipeResult('Network error generating recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-yellow-200" />
            <div>
              <h2 className="text-xl font-bold font-serif">AI Smoothie & Recipe Chef</h2>
              <p className="text-xs text-orange-100">Powered by Gemini AI Sommelier</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto">
          {/* Select Fruits */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Select Fresh Fruits to Include:
            </label>
            <div className="flex flex-wrap gap-2">
              {availableProducts.map((p) => {
                const isSelected = selectedFruits.includes(p.name);
                return (
                  <button
                    key={p.id}
                    onClick={() => handleToggleFruit(p.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recipe Style */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Recipe Style:
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPromptType('smoothie')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  promptType === 'smoothie' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-slate-200 text-slate-600'
                }`}
              >
                Signature Smoothie
              </button>
              <button
                onClick={() => setPromptType('salad')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  promptType === 'salad' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-slate-200 text-slate-600'
                }`}
              >
                Gourmet Fruit Bowl
              </button>
              <button
                onClick={() => setPromptType('custom')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  promptType === 'custom' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-slate-200 text-slate-600'
                }`}
              >
                Custom Request
              </button>
            </div>

            {promptType === 'custom' && (
              <input
                type="text"
                placeholder="e.g., Low calorie detox juice for morning workout"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full mt-3 px-3.5 py-2.5 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            )}
          </div>

          <button
            onClick={handleGenerateRecipe}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Chef Gemini is crafting your recipe...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate Recipe & Health Guide</span>
              </>
            )}
          </button>

          {/* Result Output */}
          {recipeResult && (
            <div className="mt-6 p-6 rounded-2xl bg-amber-50/50 border border-amber-200 text-slate-800 space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-amber-800 font-serif font-bold text-lg border-b border-amber-200 pb-3">
                <ChefHat className="w-5 h-5" />
                <span>Chef Karthik&apos;s AI Recommendation</span>
              </div>
              <div className="prose prose-emerald text-sm max-w-none">
                <Markdown>{recipeResult}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
