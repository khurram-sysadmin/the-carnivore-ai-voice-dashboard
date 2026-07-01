export interface MenuItem {
  id: string;
  item_name: string;
  category: string;
  aliases: string[];
  price_per_gram: number;
  fixed_price: number;
  pricing_type: 'per_gram' | 'fixed';
  active: boolean;
  description?: string;
  unit_label?: string;
  recommended_weight_min?: number;
  recommended_weight_max?: number;
  serving_notes?: string;
  source_url?: string;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  item_name: string;
  quantity: number;
  weight_grams?: number;
  notes?: string;
  unit_price?: number;
  line_total?: number;
  price?: number; // legacy
}

export type OrderStatus = 'RECEIVED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  items: OrderItem[];
  items_summary: string;
  total_amount: number;
  order_type: 'delivery' | 'pickup' | 'dine-in';
  delivery_address?: string;
  payment_method: 'cash on delivery' | 'pay at restaurant' | 'pay online' | 'card' | 'JazzCash' | 'Easypaisa';
  status: OrderStatus;
  eta?: string | null;
  created_at: string;
  updated_at: string;
}

export type ReservationStatus = 'CONFIRMED' | 'MODIFIED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export interface Reservation {
  id: string;
  reservation_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  special_requests?: string;
  status: ReservationStatus;
  created_at: string;
  updated_at: string;
}

export interface ActivityEvent {
  id: string;
  ref_id: string;
  type: 'order' | 'reservation' | 'feedback' | 'escalation';
  event_type: string;
  note: string;
  created_at: string;
}

export interface FeedbackItem {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  rating: number;
  comment: string;
  status: 'NEW' | 'REVIEWED' | 'ARCHIVED';
  created_at: string;
  conversation_id?: string;
  call_log_id?: string;
  order_id?: string;
  order_number?: string;
  reservation_id?: string;
  reservation_number?: string;
  latest_order_number?: string;
  latest_order_summary?: string;
  latest_order_total?: number;
  latest_reservation_number?: string;
  latest_reservation_details?: string;
  matched_record_type?: 'order' | 'reservation' | 'none';
}

export interface EscalationItem {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  reason: string;
  transcript?: string;
  status: 'PENDING' | 'RESOLVED' | 'IN_PROGRESS';
  created_at: string;
  updated_at: string;
}

export interface CallLog {
  id: string;
  conversation_id?: string;
  agent_id?: string;
  customer_name: string;
  customer_phone: string;
  duration_seconds: number;
  transcript: string;
  transcript_summary?: string;
  audio_url?: string;
  has_audio?: boolean;
  main_language?: string;
  source?: 'elevenlabs' | 'dashboard' | 'demo';
  status: 'COMPLETED' | 'ESCALATED' | 'FAILED';
  created_at: string;
}

export interface CustomerAccount {
  id: string;
  name: string;
  phone: string;
  email: string;
}
