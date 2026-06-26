import React from 'react';
import { ShoppingBag, CreditCard, Clock, MapPin, Edit3, Trash2 } from 'lucide-react';
import { Order } from '../types';
import StatusBadge from './StatusBadge';

interface OrderCardProps {
  key?: React.Key;
  order: Order;
  onViewDetails: (order: Order) => void;
  onModify?: (order: Order) => void;
  onCancel?: (order: Order) => void;
}

export default function OrderCard({ order, onViewDetails, onModify, onCancel }: OrderCardProps) {
  const formattedDate = new Date(order.created_at).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const canEdit = order.status === 'RECEIVED' || order.status === 'PREPARING';

  return (
    <div
      id={`order-card-${order.order_number}`}
      className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-sm font-bold text-zinc-900 bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded">
            {order.order_number}
          </span>
          <StatusBadge status={order.status} />
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm font-semibold text-zinc-900 line-clamp-1">
            {order.items_summary}
          </p>
          
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Placed {formattedDate}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="bg-zinc-100 px-2 py-0.5 rounded font-medium text-zinc-700 uppercase text-[10px]">
              {order.order_type.replace('_', ' ')}
            </span>
            <span className="text-zinc-300">|</span>
            <div className="flex items-center gap-0.5">
              <CreditCard className="w-3 h-3 text-zinc-400" />
              <span className="uppercase text-[10px]">{order.payment_method}</span>
            </div>
          </div>

          {order.order_type === 'delivery' && order.delivery_address && (
            <div className="flex items-start gap-1 text-xs text-zinc-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{order.delivery_address}</span>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-3 flex items-center justify-between gap-2 mt-auto">
        <div>
          <span className="text-[10px] uppercase text-zinc-400 block tracking-wider">Total Amount</span>
          <span className="text-base font-bold text-red-600">PKR {parseFloat(order.total_amount.toString()).toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onViewDetails(order)}
            className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Details
          </button>
          
          {canEdit && (onModify || onCancel) && (
            <div className="flex items-center gap-1">
              {onModify && (
                <button
                  onClick={() => onModify(order)}
                  className="p-1.5 text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                  title="Modify Order"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
              {onCancel && (
                <button
                  onClick={() => onCancel(order)}
                  className="p-1.5 text-zinc-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                  title="Cancel Order"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
