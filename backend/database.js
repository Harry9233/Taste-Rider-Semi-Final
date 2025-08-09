const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.resolve(__dirname, 'db.sqlite');

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phone TEXT,
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created, check for columns
                db.all("PRAGMA table_info(users)", (err, columns) => {
                    const columnNames = columns.map(c => c.name);
                    if (!columnNames.includes("name")) {
                        db.run("ALTER TABLE users ADD COLUMN name TEXT");
                    }
                    if (!columnNames.includes("phone")) {
                        db.run("ALTER TABLE users ADD COLUMN phone TEXT");
                    }
                    if (columnNames.includes("address")) {
                        // This is a bit tricky in sqlite, for simplicity we'll assume this is a new setup
                        // In a real-world migration, you would create a new table, copy data, and rename.
                    }
                });
            } else {
                console.log("Table 'users' created");
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS addresses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            full_name TEXT,
            phone TEXT,
            address TEXT,
            city TEXT,
            state TEXT,
            pincode TEXT,
            is_default BOOLEAN,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )`);

        db.run(`CREATE TABLE user_carts (
            user_id INTEGER PRIMARY KEY,
            cart_data TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )`,
        (err) => {
            if (err) {
                // Table already created
            } else {
                console.log("Table 'user_carts' created");
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            image TEXT,
            tags TEXT,
            category TEXT,
            weight TEXT,
            origin TEXT,
            ingredients TEXT,
            usage TEXT
        )`, (err) => {
            if (err) {
                // Table creation failed
                console.error("Error creating products table:", err.message);
                return;
            }
            
            // Check if products table is empty
            db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
                if (err) {
                    console.error("Error checking product count:", err.message);
                    return;
                }

                if (row.count === 0) {
                    console.log("Table 'products' is empty, inserting initial data.");
                    // Insert initial products
                    const initialProducts = [
                        { name: "Dal Ka Masala", description: "Aromatic blend for lentil dishes.", price: 100, image: "/images/Dal Ka Masala.jpg", tags: "Best Seller", category: "Spices", weight: "100g", origin: "Rajasthan, India", ingredients: "Coriander, Cumin, Turmeric, Red Chili, Asafoetida, Salt", usage: "Add 1-2 teaspoons to dal while cooking for authentic flavor" },
                        { name: "Sambar Masala", description: "Authentic South Indian flavor.", price: 90, image: "/images/Sambar Masala.jpg", tags: "SALE", category: "Spices", weight: "100g", origin: "Tamil Nadu, India", ingredients: "Coriander, Fenugreek, Mustard Seeds, Curry Leaves, Red Chili", usage: "Mix 1 tablespoon in sambar or rasam for traditional taste" },
                        { name: "Chat Masala", description: "Tangy and spicy street food seasoning.", price: 90, image: "/images/Chat Masala.jpg", tags: "15% OFF", category: "Spices", weight: "100g", origin: "Delhi, India", ingredients: "Amchur (Dried Mango), Black Salt, Cumin, Coriander, Ginger", usage: "Sprinkle over fruits, salads, or chaat for a tangy kick" },
                        { name: "Garam Masala", description: "Warm, aromatic all-purpose spice.", price: 100, image: "/images/Garam Masala.jpg", tags: "Best Seller", category: "Spices", weight: "50g", origin: "Punjab, India", ingredients: "Cardamom, Cinnamon, Cloves, Black Pepper, Nutmeg, Bay Leaf", usage: "Add to curries, stews, and rice dishes at the end of cooking" },
                        { name: "Pav Bhaji Masala", description: "Rich blend for a Mumbai classic.", price: 140, image: "/images/Pav Bhaji Masala.jpg", tags: "", category: "Spices", weight: "100g", origin: "Maharashtra, India", ingredients: "Coriander, Cumin, Red Chili, Dried Mango, Fennel Seeds", usage: "Mix 2 tablespoons into vegetable mash for authentic pav bhaji" },
                    ];
                    const tasteRiderSpecials = [
                        { name: "Shikanji Masala", description: "Refreshing spice for lemonade.", price: 80, image: "/images/Shikanji Masala.jpg", tags: "", category: "Taste Rider Specials", weight: "100g", origin: "North India", ingredients: "Black Salt, Cumin, Mint, Black Pepper, Citric Acid", usage: "Add 1/2 teaspoon to lemonade for a refreshing summer drink" },
                        { name: "Maharaja Chai Blend", description: "A royal blend of tea and spices.", price: 150, image: "/images/Maharaja Chai Blend.jpg", tags: "New Arrival", category: "Taste Rider Specials", weight: "100g", origin: "India", ingredients: "Black Tea, Cardamom, Cinnamon, Cloves, Ginger", usage: "Brew with milk and sugar for a majestic cup of chai." },
                    ];

                    const stmt = db.prepare("INSERT INTO products (name, description, price, image, tags, category, weight, origin, ingredients, usage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                    for (const product of initialProducts) {
                        stmt.run(product.name, product.description, product.price, product.image, product.tags, product.category, product.weight, product.origin, product.ingredients, product.usage);
                    }
                    for (const product of tasteRiderSpecials) {
                        stmt.run(product.name, product.description, product.price, product.image, product.tags, product.category, product.weight, product.origin, product.ingredients, product.usage);
                    }
                } else {
                    db.run("UPDATE products SET category = 'Taste Rider Specials' WHERE name = 'Shikanji Masala'");

                    const maharajaChaiBlend = { name: "Maharaja Chai Blend", description: "A royal blend of tea and spices.", price: 150, image: "/images/Maharaja Chai Blend.jpg", tags: "New Arrival", category: "Taste Rider Specials", weight: "100g", origin: "India", ingredients: "Black Tea, Cardamom, Cinnamon, Cloves, Ginger", usage: "Brew with milk and sugar for a majestic cup of chai." };
                    db.get("SELECT id FROM products WHERE name = ?", [maharajaChaiBlend.name], (err, row) => {
                        if (!row) {
                            const stmt = db.prepare("INSERT INTO products (name, description, price, image, tags, category, weight, origin, ingredients, usage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                            stmt.run(maharajaChaiBlend.name, maharajaChaiBlend.description, maharajaChaiBlend.price, maharajaChaiBlend.image, maharajaChaiBlend.tags, maharajaChaiBlend.category, maharajaChaiBlend.weight, maharajaChaiBlend.origin, maharajaChaiBlend.ingredients, maharajaChaiBlend.usage);
                            stmt.finalize();
                        }
                    });

                    const degiLalMirch = { name: "Degi Lal Mirch", description: "Vibrant red chili powder with moderate heat.", price: 120, image: "/images/Degi Lal Mirch.jpg", tags: "New Arrival", category: "Spices", weight: "100g", origin: "Kashmir, India", ingredients: "Dried red chilies", usage: "Adds color and flavor to curries and marinades" };
                    db.get("SELECT id FROM products WHERE name = ?", [degiLalMirch.name], (err, row) => {
                        if (!row) {
                            const stmt = db.prepare("INSERT INTO products (name, description, price, image, tags, category, weight, origin, ingredients, usage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                            stmt.run(degiLalMirch.name, degiLalMirch.description, degiLalMirch.price, degiLalMirch.image, degiLalMirch.tags, degiLalMirch.category, degiLalMirch.weight, degiLalMirch.origin, degiLalMirch.ingredients, degiLalMirch.usage);
                            stmt.finalize();
                        }
                    });
                }
            });
        });
    }
});

module.exports = db;
