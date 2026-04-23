
IDEA -

My goal is to forecast/predict sales volume, which in turn will be used by another AI system to prevent stockout.
So, there's 2 directions. 
One is for business that sells commodities that are sold directly like apparels , shoes, electronics.
Another is like restaurants, they sell dishes, but they need to predict stocks of ingredients like wheat, rice, eggs, meat etc. The same is applicable for other industries which makes and sells products, they will have sell data of products but will have inventory of raw materials
I have a restaurant so I will share what sort of data I have. You need to help me standardize the system so that it works and supports both the industries.
I tend to test the system on my restaurant first. If it works well, I know I have an accurate engine
Data I have from my restaurant -
Historic sales data of my food dishes, eg - Chicken Roll, Chicken Burger,
Exact Ingredients required per food dish. Example - 1 egg roll will require, 1 egg, 100gm wheat, 1/4 cucumber, 100 ml oil, 20ml red chilli sause.
Current inventory - oil, sause, eggs, etc
Historic data of inventory restock order.
Supplier data - moq, time to deliver, price of each item, total order they can fulfill. Example I require 50 eggs, they can only provide 30.
My system will have an option to insert sales data, current inventory data, ingredients/raw materials per product if it's not a direct commodity. Historic 'inventory restock' data. These inserts can be bulk or one. Everything to be timestamped so that actual forecasting can be done properly


![alt text](<Screenshot 2026-04-23 at 7.59.12 PM.png>)


AI data model - 

Schema design: 13 tables across 5 domains
Domain 1 — Org & location
organizations — the top-level tenant. business_type is an enum: direct_retail (apparel, electronics) or composite_retail (restaurant, manufacturing). This single field controls whether the BOM layer is relevant. settings (JSONB) holds flexible config like default currency, fiscal year start, etc.
locations — a single org can have multiple outlets, kitchens, or warehouses. Every transaction, snapshot, and restock order is scoped to a location. Critical for multi-branch businesses.
Domain 2 — Products & inventory items
This is the most important design decision: products and inventory items are separate tables.
products = what you sell (Chicken Roll, iPhone 15, Nike Air Max). Has a SKU, category, and is_composite flag.
inventory_items = what you stock (eggs, wheat flour, raw chicken, screen panels). Has physical units (kg, ml, pcs), and crucially, reorder_point and safety_stock_qty — these feed directly into your AI forecasting engine.
For direct retail (apparel/electronics), a product IS an inventory item — you'll map them 1:1. For restaurants, they decouple completely.
attributes (JSONB) on both tables gives you flexibility — store things like {"size": "L", "color": "red"} for apparel or {"allergens": ["gluten"], "perishable": true} for ingredients without schema changes.
Domain 3 — Bill of Materials (BOM)
bill_of_materials — the recipe/formula layer. Each row says: "to make 1 unit of product X, you need Y quantity of inventory item Z".
waste_factor_pct: accounts for cooking loss, cutting waste, breakage. A 100g chicken portion might require 115g raw to account for cooking loss.
valid_from / valid_to: recipes change over time. This lets you version your BOM historically, which is essential for accurate retrospective forecasting.
For direct retail, this table is simply empty.
Domain 4 — Sales
sales_transactions — the header record. One per bill/order/receipt. channel captures pos, online, aggregator (Swiggy, Zomato). external_ref stores the third-party order ID for reconciliation.
sales_line_items — one row per product per transaction. This is the atomic unit your forecasting model trains on. quantity + unit_price + transacted_at (from the parent) is the time-series your AI engine needs.
Both tables are append-only. Never update historical sales — if there's a correction, insert a negative line item.
Domain 5 — Inventory & Restock
inventory_snapshots — periodic or event-driven captures of stock levels. snapshot_type can be scheduled (end-of-day automated count), manual (staff count), or post_delivery (after a restock arrives). This is your ground truth for current stock and drift detection. quantity_reserved handles pre-committed stock (orders placed but not yet fulfilled).
restock_orders — each purchase order to a supplier. trigger_type distinguishes ai_predicted (your system triggered it), manual (staff override), and emergency (panic buy). This lets you measure your AI engine's accuracy over time. expected_at vs received_at lets you track supplier reliability.
restock_order_lines — line items per order. qty_ordered vs qty_received captures partial fulfillments — critical since your supplier may only deliver 30 of 50 eggs ordered.
Domain 6 — Supplier intelligence
suppliers — master record. lead_time_days is the default; can be overridden per item in the catalog.
supplier_catalog — the pricing and constraint layer. moq (minimum order quantity), max_order_qty, per-item lead_time_days (a supplier may be fast on eggs but slow on specialty sauces), and valid_from/valid_to for price history. Your AI engine uses this to constrain restock recommendations — it can't recommend ordering 500 eggs if max_order_qty is 200.
What your AI engine gets
From this schema, you can derive exactly the inputs a forecasting model needs:
Sales velocity — aggregate sales_line_items by product × day/week
Ingredient consumption — join sales velocity × BOM quantities + waste factors
Lead time distributions — ordered_at → received_at per supplier per item
Stockout events — gaps in inventory_snapshots where quantity_on_hand → 0
Seasonal patterns — transacted_at timestamps give you day-of-week, holiday, weather correlation hooks
Key Postgres-specific recommendations
Partition sales_line_items and inventory_snapshots by created_at range (monthly) — these will be your largest tables
Index (org_id, transacted_at) on sales_transactions and (inventory_item_id, snapshotted_at) on inventory_snapshots
Use timestamptz (not timestamp) for all time columns — timezone-aware from day one
Add a deleted_at soft-delete column on products, inventory_items, and suppliers — enterprise systems never hard-delete


Also take into consideration 

Base kitchen / preferred supplier % — when you have multiple suppliers for the same item, you pre-allocate what % of your order goes to each. E.g. 70% eggs from Supplier A, 30% from Supplier B. This is your sourcing split rule.
Integrated Business Planning (IBP) — the bridge between your sales forecast and your procurement plan. You need a layer that holds planned demand (forecasted), planned supply (what you intend to order), and lets planners override/approve before execution. Think of it as your planning calendar with consensus demand numbers.
Safety stock — already in the schema as a column. But it needs to be a calculated, versioned record not just a static number. It should change as demand variability changes.
Cycle stock — the regular working stock consumed between replenishment cycles. Driven by order frequency and average demand.
Pipeline stock — inventory already ordered but not yet received (in transit). Your restock orders table captures this, but it needs to be explicitly surfaced as a stock category.

![alt text](<Screenshot 2026-04-23 at 11.15.57 PM.png>)