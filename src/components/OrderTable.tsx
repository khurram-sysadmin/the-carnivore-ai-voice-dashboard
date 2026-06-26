import React from 'react';
import { Eye, Edit3, MessageCircle, AlertCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import StatusBadge from './StatusBadge';

interface OrderTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const ORDER_STATUSES: OrderStatus[] = ['RECEIVED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'COMPLETED', 'CANCELLED'];

export default function OrderTable({ orders, onViewDetails, onStatusChange }: OrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-white border border-zinc-200 rounded-xl">
        <AlertCircle className="w-10 h-10 text-zinc-300 mb-3" />
        <h4 className="font-semibold text-zinc-700">No Orders Found</h4>
        <p className="text-xs text-zinc-400 mt-1">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Items Summary</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-150 text-sm text-zinc-800">
            {orders.map(order => {
              const formattedDate = new Date(order.created_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-mono font-bold text-zinc-900 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded text-xs w-max">
                        {order.order_number}
                      </span>
                      <span className="text-[10px] text-zinc-400 mt-1">{formattedDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-zinc-900">{order.customer_name}</span>
                      <span className="text-xs text-zinc-500 font-mono">{order.customer_phone}</span>
                      <span className="text-xs text-zinc-400">{order.customer_email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-zinc-800 line-clamp-2 leading-tight">
                      {order.items_summary}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-red-600">PKR {parseFloat(order.total_amount.toString()).toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-zinc-100 border border-zinc-200 text-zinc-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                      {order.order_type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={e => onStatusChange(order.id, e.target.value as OrderStatus)}
                        className="bg-white border border-zinc-300 text-xs rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer"
                      >
                        {ORDER_STATUSES.map(status => (
                          <option key={status} value={status}>
                            {status.replace(/_/g, ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onViewDetails(order)}
                      className="p-1.5 text-zinc-600 hover:text-red-600 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 text-xs font-semibold"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
