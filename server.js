require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware'); // Corrected path

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather'); // Import weather routes
app.use('/todos', authMiddleware, todoRoutes); // Protect /todos routes
app.use('/auth', authRoutes);
app.use('/weather', weatherRoutes); // Use weather routes

// Middleware to check authentication for the main page
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

app.get('/index.html', authMiddleware, (req, res) => { // Protect /index.html route
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the todos page
app.get('/todos.html', (req, res, next) => {
    const token = req.query.token;
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
        authMiddleware(req, res, next);
    } else {
        res.status(401).json({ error: 'Access denied. No token provided.' });
    }
}, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'todos.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//Register
//curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}'

//Login
//curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}'