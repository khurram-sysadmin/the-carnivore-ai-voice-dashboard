import React, { useState, useEffect } from 'react';
import { Plus, Check, X, Sparkles, Edit2 } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuManagementProps {
  onMenuChanged?: () => void;
}

const CATEGORIES = ['Lamb', 'Beef', 'Camel', 'Chicken', 'Beverages', 'Desserts'];

export default function MenuManagement({ onMenuChanged }: MenuManagementProps) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form/Edit State
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formState, setFormState] = useState({
    item_name: '',
    category: 'Beef',
    aliases: '',
    price_per_gram: 0,
    fixed_price: 0,
    pricing_type: 'per_gram' as 'per_gram' | 'fixed',
    active: true,
    description: '',
    unit_label: 'g',
    recommended_weight_min: 400,
    recommended_weight_max: 500,
    serving_notes: '',
    display_order: 1
  });

  const fetchMenu = () => {
    setLoading(true);
    fetch('/api/menu')
      .then(r => r.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load menu items.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    fetch(`/api/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, active: !currentStatus })
    })
    .then(r => r.json())
    .then(updated => {
      setItems(prev => prev.map(i => i.id === id ? updated : i));
      if (onMenuChanged) onMenuChanged();
    })
    .catch(err => console.error(err));
  };

  const handleEditClick = (item: MenuItem) => {
    setEditingId(item.id);
    setFormState({
      item_name: item.item_name,
      category: item.category,
      aliases: item.aliases?.join(', ') || '',
      price_per_gram: item.price_per_gram,
      fixed_price: item.fixed_price,
      pricing_type: item.pricing_type,
      active: item.active,
      description: item.description || '',
      unit_label: item.unit_label || 'g',
      recommended_weight_min: item.recommended_weight_min || 400,
      recommended_weight_max: item.recommended_weight_max || 500,
      serving_notes: item.serving_notes || '',
      display_order: item.display_order || 1
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormState({
      item_name: '',
      category: 'Beef',
      aliases: '',
      price_per_gram: 0,
      fixed_price: 0,
      pricing_type: 'per_gram',
      active: true,
      description: '',
      unit_label: 'g',
      recommended_weight_min: 400,
      recommended_weight_max: 500,
      serving_notes: '',
      display_order: items.length + 1
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.item_name.trim()) return;

    const payload = {
      id: editingId || undefined,
      item_name: formState.item_name,
      category: formState.category,
      aliases: formState.aliases.split(',').map(s => s.trim()).filter(Boolean),
      price_per_gram: formState.pricing_type === 'per_gram' ? Number(formState.price_per_gram) : 0,
      fixed_price: formState.pricing_type === 'fixed' ? Number(formState.fixed_price) : 0,
      pricing_type: formState.pricing_type,
      active: formState.active,
      description: formState.description || undefined,
      unit_label: formState.unit_label || undefined,
      recommended_weight_min: formState.pricing_type === 'per_gram' ? Number(formState.recommended_weight_min) : undefined,
      recommended_weight_max: formState.pricing_type === 'per_gram' ? Number(formState.recommended_weight_max) : undefined,
      serving_notes: formState.serving_notes || undefined,
      display_order: Number(formState.display_order)
    };

    fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(r => r.json())
    .then(savedItem => {
      if (editingId) {
        setItems(prev => prev.map(i => i.id === editingId ? savedItem : i));
      } else {
        setItems(prev => [...prev, savedItem]);
      }
      handleCancel();
      if (onMenuChanged) onMenuChanged();
    })
    .catch(err => {
      console.error(err);
      setError('Failed to save menu item.');
    });
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-zinc-900 text-base tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-500" />
            Menu Item Matrix (Supabase Backend)
          </h3>
          <p className="text-xs text-zinc-400 mt-1">Configure weights, pricing rates, and Zara voice aliases.</p>
        </div>

        <button
          onClick={() => {
            if (showForm) {
              handleCancel();
            } else {
              setFormState(prev => ({ ...prev, display_order: items.length + 1 }));
              setShowForm(true);
            }
          }}
          className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            {editingId ? 'Edit Dish' : 'Create New Dish'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-500 block mb-1">Official Name</label>
              <input
                type="text"
                required
                value={formState.item_name}
                onChange={e => setFormState(prev => ({ ...prev, item_name: e.target.value }))}
                placeholder="E.g. Camel Ribs Prime"
                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-500 block mb-1">Category</label>
              <select
                value={formState.category}
                onChange={e => setFormState(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-500 block mb-1">Display Order</label>
              <input
                type="number"
                required
                value={formState.display_order}
                onChange={e => setFormState(prev => ({ ...prev, display_order: parseInt(e.target.value) || 1 }))}
                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-500 block mb-1">Pricing Scheme</label>
              <select
                value={formState.pricing_type}
                onChange={e => setFormState(prev => ({ ...prev, pricing_type: e.target.value as any }))}
                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="per_gram">Price Per Gram (PKR/g)</option>
                <option value="fixed">Fixed Price (PKR/item)</option>
              </select>
            </div>

            {formState.pricing_type === 'per_gram' ? (
              <>
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Rate Per Gram (PKR)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formState.price_per_gram}
                    onChange={e => setFormState(prev => ({ ...prev, price_per_gram: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Unit Label (e.g. g)</label>
                  <input
                    type="text"
                    value={formState.unit_label}
                    onChange={e => setFormState(prev => ({ ...prev, unit_label: e.target.value }))}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Recommended Min Weight (g)</label>
                  <input
                    type="number"
                    value={formState.recommended_weight_min}
                    onChange={e => setFormState(prev => ({ ...prev, recommended_weight_min: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Recommended Max Weight (g)</label>
                  <input
                    type="number"
                    value={formState.recommended_weight_max}
                    onChange={e => setFormState(prev => ({ ...prev, recommended_weight_max: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Fixed Cost (PKR)</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={formState.fixed_price}
                    onChange={e => setFormState(prev => ({ ...prev, fixed_price: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 block mb-1">Unit Label (e.g. each, glass)</label>
                  <input
                    type="text"
                    value={formState.unit_label}
                    onChange={e => setFormState(prev => ({ ...prev, unit_label: e.target.value }))}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-bold text-zinc-500 block mb-1">Status</label>
              <select
                value={formState.active ? "true" : "false"}
                onChange={e => setFormState(prev => ({ ...prev, active: e.target.value === "true" }))}
                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="true">Active</option>
                <option value="false">Inactive / Suspended</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-500 block mb-1">Description</label>
              <textarea
                value={formState.description}
                onChange={e => setFormState(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Briefly describe the dish's preparation, taste notes, or visual look..."
                rows={2}
                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-500 block mb-1">Serving Notes / Recommended Side Dishes</label>
              <input
                type="text"
                value={formState.serving_notes}
                onChange={e => setFormState(prev => ({ ...prev, serving_notes: e.target.value }))}
                placeholder="E.g. Perfect when combined with fresh Lime and Kunafa."
                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-500 block mb-1">Zara Voice Aliases (Comma-separated)</label>
              <input
                type="text"
                value={formState.aliases}
                onChange={e => setFormState(prev => ({ ...prev, aliases: e.target.value }))}
                placeholder="E.g. camel shoulder, camel cut, shoulder, camel meat"
                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2.5 rounded-lg text-xs cursor-pointer shadow"
          >
            {editingId ? 'Save Changes' : 'Confirm Add'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="py-12 flex justify-center text-zinc-400">Loading menu...</div>
      ) : (
        <>
          {/* Desktop view Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-800">
              <thead>
                <tr className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Dish</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Price Rate</th>
                  <th className="px-4 py-3">Weight Guidance</th>
                  <th className="px-4 py-3">Aliases</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-150">
                {items.map(item => (
                  <tr key={item.id} className={`${item.active ? '' : 'opacity-50'} hover:bg-zinc-50/40`}>
                    <td className="px-4 py-3.5 font-mono text-xs text-zinc-400">#{item.display_order || 0}</td>
                    <td className="px-4 py-3.5">
                      <div>
                        <span className="font-bold text-zinc-900">{item.item_name}</span>
                        {item.description && (
                          <p className="text-xs text-zinc-400 line-clamp-1 max-w-xs mt-0.5">{item.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="bg-zinc-100 text-zinc-700 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-zinc-500 capitalize">{item.pricing_type.replace('_', ' ')}</td>
                    <td className="px-4 py-3.5 font-mono text-xs font-bold text-zinc-800">
                      {item.pricing_type === 'per_gram' 
                        ? `PKR ${item.price_per_gram.toFixed(2)}/g` 
                        : `PKR ${item.fixed_price.toLocaleString()}/${item.unit_label || 'item'}`}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-zinc-500">
                      {item.pricing_type === 'per_gram' 
                        ? `${item.recommended_weight_min || 400}-${item.recommended_weight_max || 500}g` 
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3.5 max-w-[150px] truncate">
                      <div className="flex flex-wrap gap-1">
                        {item.aliases?.map((alias, i) => (
                          <span key={i} className="bg-zinc-50 border border-zinc-200 text-zinc-500 text-[9px] px-1.5 py-0.5 rounded">
                            {alias}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-1.5 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 rounded-lg cursor-pointer transition-colors"
                          title="Edit Item"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(item.id, item.active)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer transition-colors ${
                            item.active 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100' 
                              : 'bg-zinc-100 text-zinc-500 border-zinc-200 hover:bg-zinc-200'
                          }`}
                        >
                          {item.active ? 'Active' : 'Inactive'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view stacked cards */}
          <div className="block md:hidden space-y-3">
            {items.map(item => (
              <div key={item.id} className={`bg-white border border-zinc-200 rounded-xl p-4 shadow-sm space-y-3 ${item.active ? '' : 'opacity-60'}`}>
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-zinc-900 text-sm">{item.item_name}</span>
                      <span className="bg-zinc-100 text-zinc-700 text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                  <span className="font-mono text-xs text-zinc-400 flex-shrink-0">#{item.display_order || 0}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-zinc-50 border border-zinc-150 p-2.5 rounded-lg">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block">Pricing Type</span>
                    <span className="font-semibold text-zinc-700 capitalize">{item.pricing_type.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block">Price Rate</span>
                    <span className="font-bold text-zinc-800">
                      {item.pricing_type === 'per_gram' 
                        ? `PKR ${item.price_per_gram.toFixed(2)}/g` 
                        : `PKR ${item.fixed_price.toLocaleString()}/${item.unit_label || 'item'}`}
                    </span>
                  </div>
                  {item.pricing_type === 'per_gram' && (
                    <div className="col-span-2 pt-1 border-t border-zinc-200/50">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block">Weight Guidance</span>
                      <span className="font-medium text-zinc-600">{item.recommended_weight_min || 400}-{item.recommended_weight_max || 500}g</span>
                    </div>
                  )}
                </div>

                {item.aliases && item.aliases.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.aliases.map((alias, i) => (
                      <span key={i} className="bg-zinc-50 border border-zinc-200 text-zinc-500 text-[9px] px-1.5 py-0.5 rounded">
                        {alias}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-zinc-100 pt-3 mt-1">
                  <button
                    onClick={() => handleToggleActive(item.id, item.active)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                      item.active 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100' 
                        : 'bg-zinc-100 text-zinc-500 border-zinc-200 hover:bg-zinc-200'
                    }`}
                  >
                    {item.active ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => handleEditClick(item)}
                    className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
