-- ============================================================================
-- THE CARNIVORE AI VOICE DASHBOARD - SUPABASE MIGRATIONS
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. MENU_ITEMS TABLE
CREATE TABLE IF NOT EXISTS menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    aliases TEXT[] DEFAULT '{}',
    price_per_gram NUMERIC(10, 4) DEFAULT 0.0000,
    fixed_price NUMERIC(10, 2) DEFAULT 0.00,
    pricing_type TEXT NOT NULL CHECK (pricing_type IN ('per_gram', 'fixed')),
    active BOOLEAN NOT NULL DEFAULT true,
    description TEXT,
    unit_label TEXT,
    recommended_weight_min INTEGER,
    recommended_weight_max INTEGER,
    serving_notes TEXT,
    source_url TEXT,
    display_order INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT NOT NULL UNIQUE, -- E.g. ORD-1001
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    -- JSONB Structure for order items:
    -- Array of: {
    --   "item_name": "Lamb Shank",
    --   "quantity": 1,
    --   "weight_grams": 450,       -- Optional
    --   "notes": "Spicy",          -- Optional
    --   "unit_price": 11.90,       -- Optional
    --   "line_total": 5355.00,     -- Optional (unit_price * weight_grams or fixed price)
    --   "price": 29.25             -- Legacy field
    -- }
    items JSONB NOT NULL,
    items_summary TEXT NOT NULL, -- Flat summary of items for easy display
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    order_type TEXT NOT NULL CHECK (order_type IN ('delivery', 'pickup', 'dine-in')),
    delivery_address TEXT,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cash on delivery', 'pay at restaurant', 'pay online', 'card', 'JazzCash', 'Easypaisa')),
    status TEXT NOT NULL DEFAULT 'RECEIVED' CHECK (status IN ('RECEIVED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'COMPLETED', 'CANCELLED')),
    eta TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on customer identifiers for fast customer lookup
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);

-- 3. RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_number TEXT NOT NULL UNIQUE, -- E.g. RES-1001
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size > 0),
    special_requests TEXT,
    status TEXT NOT NULL DEFAULT 'CONFIRMED' CHECK (status IN ('CONFIRMED', 'MODIFIED', 'CANCELLED', 'COMPLETED', 'NO_SHOW')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reservations_customer_email ON reservations(customer_email);
CREATE INDEX IF NOT EXISTS idx_reservations_customer_phone ON reservations(customer_phone);

-- 3B. CUSTOMER_ACCOUNTS TABLE
-- Used by the customer welcome/login page. Passwords are hashed server-side;
-- never store plain-text customer passwords.
CREATE TABLE IF NOT EXISTS customer_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customer_accounts_email ON customer_accounts(email);
CREATE INDEX IF NOT EXISTS idx_customer_accounts_phone ON customer_accounts(phone);

-- 4. ORDER_EVENTS TABLE (Audit Trail)
CREATE TABLE IF NOT EXISTS order_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'CREATED', 'STATUS_CHANGE', 'MODIFIED', 'CANCELLED'
    old_value JSONB,
    new_value JSONB,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_events_order_id ON order_events(order_id);

-- 5. RESERVATION_EVENTS TABLE (Audit Trail)
CREATE TABLE IF NOT EXISTS reservation_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'CREATED', 'STATUS_CHANGE', 'MODIFIED', 'CANCELLED'
    old_value JSONB,
    new_value JSONB,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reservation_events_reservation_id ON reservation_events(reservation_id);

-- 6. FEEDBACK TABLE
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'REVIEWED', 'ARCHIVED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. ESCALATIONS TABLE
CREATE TABLE IF NOT EXISTS escalations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    reason TEXT NOT NULL,
    transcript TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'RESOLVED', 'IN_PROGRESS')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SEED INITIAL MENU ITEMS
INSERT INTO menu_items (item_name, category, aliases, price_per_gram, fixed_price, pricing_type, active, description, unit_label, recommended_weight_min, recommended_weight_max, display_order) VALUES
('Lamb Shank', 'Lamb', '{"lamb shank", "shank", "lamb shanks"}', 11.90, 0.00, 'per_gram', true, 'Juicy slow-cooked lamb shank, served tender on the bone.', 'g', 400, 500, 1),
('Lamb Backbone', 'Lamb', '{"lamb backbone", "backbone", "lamb back"}', 10.90, 0.00, 'per_gram', true, 'Traditional cuts of lamb backbone, rich in flavor.', 'g', 400, 500, 2),
('Lamb Neck', 'Lamb', '{"lamb neck", "neck"}', 10.90, 0.00, 'per_gram', true, 'Premium cuts of tender lamb neck, slow roasted.', 'g', 400, 500, 3),
('Lamb Ribs', 'Lamb', '{"lamb ribs", "ribs", "lamb rib"}', 10.90, 0.00, 'per_gram', true, 'Prime selected cut ribs, charcoal-grilled to perfection.', 'g', 400, 500, 4),
('Lamb Shoulder', 'Lamb', '{"lamb shoulder", "shoulder"}', 11.90, 0.00, 'per_gram', true, 'Slow-roasted lamb shoulder with fragrant middle-eastern spices.', 'g', 400, 500, 5),
('Round Beef Cut', 'Beef', '{"round beef", "beef cut", "round cut"}', 8.80, 0.00, 'per_gram', true, 'Premium round beef cut, lean and cooked slow.', 'g', 400, 500, 6),
('Beef Brisket', 'Beef', '{"brisket", "beef brisket"}', 9.30, 0.00, 'per_gram', true, 'Slow cooked 12 hours over hickory wood.', 'g', 400, 500, 7),
('Beef Ribs', 'Beef', '{"beef ribs", "beef rib"}', 8.80, 0.00, 'per_gram', true, 'Beef short ribs, deeply marbled and succulent.', 'g', 400, 500, 8),
('Beef Shank', 'Beef', '{"beef shank", "beef shanks"}', 8.80, 0.00, 'per_gram', true, 'Hearty beef shank, slow-simmered for ultimate tenderness.', 'g', 400, 500, 9),
('Camel Meat Boneless', 'Camel', '{"camel boneless", "boneless camel", "camel meat"}', 9.30, 0.00, 'per_gram', true, 'Lean signature camel meat, highly nutritious and cooked low.', 'g', 400, 500, 10),
('Camel Meat With Bone', 'Camel', '{"camel with bone", "camel bone-in", "bone camel"}', 8.70, 0.00, 'per_gram', true, 'Bone-in signature camel meat, full of rich marrow flavor.', 'g', 400, 500, 11),
('Baked Chicken Half', 'Chicken', '{"baked chicken", "half chicken", "chicken"}', 0.00, 3499.00, 'fixed', true, 'Crispy oven baked half chicken, spiced with local herbs.', 'each', NULL, NULL, 12),
('Pina Colada', 'Beverages', '{"pina colada", "colada"}', 0.00, 850.00, 'fixed', true, 'Creamy coconut and pineapple blended drink.', 'serving', NULL, NULL, 13),
('Blue Colada', 'Beverages', '{"blue colada"}', 0.00, 899.00, 'fixed', true, 'Refreshing blue curaçao, coconut, and pineapple blend.', 'serving', NULL, NULL, 14),
('Mint Margarita', 'Beverages', '{"mint margarita", "margarita"}', 0.00, 600.00, 'fixed', true, 'Refreshing blend of fresh mint, lime, and crushed ice.', 'serving', NULL, NULL, 15),
('Red Blue Sky', 'Beverages', '{"red blue sky"}', 0.00, 899.00, 'fixed', true, 'Fruity and vibrant carbonated beverage with mixed berry accents.', 'serving', NULL, NULL, 16),
('Peach Iced Tea', 'Beverages', '{"peach iced tea", "iced tea"}', 0.00, 690.00, 'fixed', true, 'Chilled brewed black tea infused with sweet peach flavor.', 'serving', NULL, NULL, 17),
('Chocolate Shake', 'Beverages', '{"chocolate shake", "milkshake"}', 0.00, 590.00, 'fixed', true, 'Thick, creamy, and decadent chocolate milkshake.', 'serving', NULL, NULL, 18),
('Fresh Lime', 'Beverages', '{"fresh lime", "lime soda"}', 0.00, 499.00, 'fixed', true, 'Zesty fresh squeezed lime juice with a touch of sweetness and soda.', 'serving', NULL, NULL, 19),
('Strawberry Smoothie', 'Beverages', '{"strawberry smoothie", "smoothie"}', 0.00, 740.00, 'fixed', true, 'Fresh strawberries blended with yogurt and ice.', 'serving', NULL, NULL, 20),
('Kiss by Chocolate', 'Desserts', '{"kiss by chocolate", "chocolate kiss"}', 0.00, 1169.00, 'fixed', true, 'Decadent, rich chocolate dessert for true chocolate lovers.', 'serving', NULL, NULL, 21),
('Slice of Paradise', 'Desserts', '{"slice of paradise"}', 0.00, 1699.00, 'fixed', true, 'Indulgent dessert cake slice layered with rich flavors.', 'serving', NULL, NULL, 22),
('Baklava', 'Desserts', '{"baklava", "turkish baklava"}', 0.00, 1399.00, 'fixed', true, 'Layered pastry dessert made of filo pastry, filled with chopped nuts and sweetened with syrup.', 'serving', NULL, NULL, 23),
('Chocoholic Treat', 'Desserts', '{"chocoholic treat"}', 0.00, 1399.00, 'fixed', true, 'A special combination of rich chocolate pastries and fudge.', 'serving', NULL, NULL, 24),
('3 Milk Saffron', 'Desserts', '{"three milk saffron", "saffron milk cake", "3 milk saffron"}', 0.00, 1299.00, 'fixed', true, 'Tres leches cake infused with premium saffron strands.', 'serving', NULL, NULL, 25),
('3 Milk Pistachio', 'Desserts', '{"three milk pistachio", "pistachio milk cake", "3 milk pistachio"}', 0.00, 1249.00, 'fixed', true, 'Tres leches cake topped with crushed roasted pistachios.', 'serving', NULL, NULL, 26),
('3 Milk Classic', 'Desserts', '{"three milk classic", "classic milk cake", "3 milk classic"}', 0.00, 1199.00, 'fixed', true, 'Traditional sweet tres leches milk cake.', 'serving', NULL, NULL, 27),
('Oreo Cheese Cake', 'Desserts', '{"oreo cheesecake", "oreo cheese cake"}', 0.00, 1299.00, 'fixed', true, 'Creamy cheesecake loaded with chunks of Oreo cookies.', 'serving', NULL, NULL, 28),
('Nutella Cheese Cake', 'Desserts', '{"nutella cheesecake", "nutella cheese cake"}', 0.00, 1399.00, 'fixed', true, 'Rich cheesecake with layers of smooth Nutella spread.', 'serving', NULL, NULL, 29),
('Blueberry Cheese Cake', 'Desserts', '{"blueberry cheesecake", "blueberry cheese cake"}', 0.00, 1499.00, 'fixed', true, 'Classic cheesecake topped with sweet wild blueberry compote.', 'serving', NULL, NULL, 30),
('Lotus Cheese Cake', 'Desserts', '{"lotus cheesecake", "lotus cheese cake", "biscoff cheesecake"}', 0.00, 1599.00, 'fixed', true, 'Decadent cheesecake layered with Biscoff lotus cookie butter.', 'serving', NULL, NULL, 31),
('Skill-a-holic Brownie', 'Desserts', '{"skillaholic brownie", "brownie"}', 0.00, 1599.00, 'fixed', true, 'Fudgy sizzling hot chocolate brownie served with vanilla ice cream.', 'serving', NULL, NULL, 32)
ON CONFLICT (item_name) DO UPDATE SET
    category = EXCLUDED.category,
    aliases = EXCLUDED.aliases,
    price_per_gram = EXCLUDED.price_per_gram,
    fixed_price = EXCLUDED.fixed_price,
    pricing_type = EXCLUDED.pricing_type,
    active = EXCLUDED.active,
    description = EXCLUDED.description,
    unit_label = EXCLUDED.unit_label,
    recommended_weight_min = EXCLUDED.recommended_weight_min,
    recommended_weight_max = EXCLUDED.recommended_weight_max,
    display_order = EXCLUDED.display_order;


-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE escalations ENABLE ROW LEVEL SECURITY;

-- A. Policies for MENU_ITEMS
-- Anyone can view active menu items
CREATE POLICY "Allow public read active menu items" ON menu_items
    FOR SELECT USING (active = true);

-- Admins/owners can manage all menu items (Assuming they authenticate as an admin user)
-- Note: In Supabase, you can set a metadata user role or check claims. We allow authenticated service role or specific email
CREATE POLICY "Allow all actions for admin menu_items" ON menu_items
    FOR ALL USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' LIKE '%admin%' OR auth.jwt() ->> 'email' = 'owner@thecarnivore.com');


-- B. Policies for ORDERS
-- Customers can read their own orders by matching their logged-in email or phone
CREATE POLICY "Allow customers to read their own orders" ON orders
    FOR SELECT USING (
        auth.jwt() ->> 'email' = customer_email OR
        auth.jwt() ->> 'phone' = customer_phone OR
        customer_email = current_setting('request.jwt.claims', true)::json ->> 'email'
    );

-- Customers can insert new orders (voice widget, web form, n8n webhook)
CREATE POLICY "Allow customer or webhook to insert orders" ON orders
    FOR INSERT WITH CHECK (true);

-- Customers can update their own orders (e.g., cancellations or modifications if still received/preparing)
CREATE POLICY "Allow customer modifications" ON orders
    FOR UPDATE USING (
        (auth.jwt() ->> 'email' = customer_email OR auth.jwt() ->> 'phone' = customer_phone)
        AND status IN ('RECEIVED', 'PREPARING')
    );

-- Admins/owners can do everything on orders
CREATE POLICY "Allow admin full access to orders" ON orders
    FOR ALL USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' LIKE '%admin%' OR auth.jwt() ->> 'email' = 'owner@thecarnivore.com');


-- C. Policies for RESERVATIONS
-- Customers can read their own reservations
CREATE POLICY "Allow customers to read their own reservations" ON reservations
    FOR SELECT USING (
        auth.jwt() ->> 'email' = customer_email OR
        auth.jwt() ->> 'phone' = customer_phone
    );

-- Customers can insert reservations
CREATE POLICY "Allow anyone to insert reservations" ON reservations
    FOR INSERT WITH CHECK (true);

-- Customers can modify/cancel their own reservations
CREATE POLICY "Allow customer reservation modifications" ON reservations
    FOR UPDATE USING (
        (auth.jwt() ->> 'email' = customer_email OR auth.jwt() ->> 'phone' = customer_phone)
        AND status IN ('CONFIRMED', 'MODIFIED')
    );

-- Admins/owners can do everything on reservations
CREATE POLICY "Allow admin full access to reservations" ON reservations
    FOR ALL USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' LIKE '%admin%' OR auth.jwt() ->> 'email' = 'owner@thecarnivore.com');

-- C2. Policies for CUSTOMER_ACCOUNTS
-- Customer accounts are managed only by the secure backend using the service-role key.
CREATE POLICY "Allow service role customer account access" ON customer_accounts
    FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- D. Policies for EVENTS, FEEDBACK, ESCALATIONS (Admin-only readable/writeable, or customer insertable)
CREATE POLICY "Allow admin read order events" ON order_events
    FOR SELECT USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' LIKE '%admin%' OR auth.jwt() ->> 'email' = 'owner@thecarnivore.com');
CREATE POLICY "Allow insertion of order events" ON order_events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin read reservation events" ON reservation_events
    FOR SELECT USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' LIKE '%admin%' OR auth.jwt() ->> 'email' = 'owner@thecarnivore.com');
CREATE POLICY "Allow insertion of reservation events" ON reservation_events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert feedback" ON feedback
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read feedback" ON feedback
    FOR SELECT USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' LIKE '%admin%' OR auth.jwt() ->> 'email' = 'owner@thecarnivore.com');

CREATE POLICY "Allow insertion of escalations" ON escalations
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin full escalations" ON escalations
    FOR ALL USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' LIKE '%admin%' OR auth.jwt() ->> 'email' = 'owner@thecarnivore.com');

-- 9. CALL LOGS TABLE
CREATE TABLE IF NOT EXISTS call_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL DEFAULT 'Voice Caller',
    customer_phone TEXT NOT NULL DEFAULT 'Active Live Session',
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    transcript TEXT,
    status TEXT NOT NULL DEFAULT 'COMPLETED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert call logs" ON call_logs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin read call logs" ON call_logs
    FOR SELECT USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' LIKE '%admin%' OR auth.jwt() ->> 'email' = 'owner@thecarnivore.com');
