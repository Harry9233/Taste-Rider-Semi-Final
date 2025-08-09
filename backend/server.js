const express = require('express');
const cors = require('cors');
const db = require('./database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3001;
const JWT_SECRET = 'your_jwt_secret'; // Replace with a strong secret in a real application

app.use(cors());
app.use(express.json());

// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { name, phone, email, password, address, city, state, pincode } = req.body;
    if (!name || !phone || !email || !password || !address || !city || !state || !pincode) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userSql = 'INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)';
        db.run(userSql, [name, phone, email, hashedPassword], function(err) {
            if (err) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            const userId = this.lastID;
            const addressSql = 'INSERT INTO addresses (user_id, full_name, phone, address, city, state, pincode, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            db.run(addressSql, [userId, name, phone, address, city, state, pincode, true], function(err) {
                if (err) {
                    // Attempt to clean up the created user if address insertion fails
                    db.run('DELETE FROM users WHERE id = ?', [userId]);
                    return res.status(500).json({ error: 'Could not save address' });
                }
                res.status(201).json({ id: userId });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        
        const addressesSql = 'SELECT * FROM addresses WHERE user_id = ?';
        db.all(addressesSql, [user.id], (err, addresses) => {
            if (err) {
                return res.status(500).json({ error: 'Server error' });
            }
            res.json({ token, user: { id: user.id, name: user.name, phone: user.phone, email: user.email, addresses } });
        });
    });
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Get cart endpoint
app.get('/api/cart', authenticateToken, (req, res) => {
    const sql = 'SELECT cart_data FROM user_carts WHERE user_id = ?';
    db.get(sql, [req.user.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        res.json(row ? JSON.parse(row.cart_data) : []);
    });
});

// Update cart endpoint
app.post('/api/cart', authenticateToken, (req, res) => {
    const { cart } = req.body;
    const sql = 'INSERT OR REPLACE INTO user_carts (user_id, cart_data) VALUES (?, ?)';
    db.run(sql, [req.user.id, JSON.stringify(cart)], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        res.sendStatus(200);
    });
});

// Address Management Endpoints
app.get('/api/addresses', authenticateToken, (req, res) => {
    const sql = 'SELECT * FROM addresses WHERE user_id = ?';
    db.all(sql, [req.user.id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        res.json(rows);
    });
});

app.post('/api/addresses', authenticateToken, (req, res) => {
    const { fullName, phone, address, city, state, pincode, isDefault } = req.body;
    const userId = req.user.id;

    if (isDefault) {
        const updateSql = 'UPDATE addresses SET is_default = 0 WHERE user_id = ?';
        db.run(updateSql, [userId], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Server error' });
            }
        });
    }

    const sql = 'INSERT INTO addresses (user_id, full_name, phone, address, city, state, pincode, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.run(sql, [userId, fullName, phone, address, city, state, pincode, isDefault], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Could not save address' });
        }
        res.status(201).json({ id: this.lastID });
    });
});

app.put('/api/addresses/:id', authenticateToken, (req, res) => {
    const { fullName, phone, address, city, state, pincode, isDefault } = req.body;
    const addressId = req.params.id;
    const userId = req.user.id;

    if (isDefault) {
        const updateSql = 'UPDATE addresses SET is_default = 0 WHERE user_id = ?';
        db.run(updateSql, [userId], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Server error' });
            }
        });
    }

    const sql = 'UPDATE addresses SET full_name = ?, phone = ?, address = ?, city = ?, state = ?, pincode = ?, is_default = ? WHERE id = ? AND user_id = ?';
    db.run(sql, [fullName, phone, address, city, state, pincode, isDefault, addressId, userId], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Could not update address' });
        }
        res.sendStatus(200);
    });
});

app.delete('/api/addresses/:id', authenticateToken, (req, res) => {
    const addressId = req.params.id;
    const userId = req.user.id;

    const sql = 'DELETE FROM addresses WHERE id = ? AND user_id = ?';
    db.run(sql, [addressId, userId], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Could not delete address' });
        }
        res.sendStatus(200);
    });
});

// Get products endpoint
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        res.json(rows);
    });
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(row);
    });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // IMPORTANT: You need to configure your own email transport.
    // This example uses ethereal.email for testing.
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'your_ethereal_user@ethereal.email', // Replace with your Ethereal email
            pass: 'your_ethereal_password' // Replace with your Ethereal password
        }
    });

    const mailOptions = {
        from: email,
        to: 'your_support_email@example.com', // Replace with your support email
        subject: `Contact form submission from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send message' });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Message sent successfully' });
    });
});


app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
