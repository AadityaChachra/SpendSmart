const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/transaction.js');
const mongoose = require('mongoose');
const path = require('path');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
})

app.get('/', (req, res) => {
    res.send('Welcome to SpendSmart server. Head over to /api/test to test if the API is working or not.');
});
app.get('/api', (req, res) => {
    res.send('Welcome to SpendSmart API.');
});

app.get('/api/test', (req, res) => {
    res.send('API Test Result: Ok');
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    try {
        const { name, description, datetime, savings } = req.body;
        const transaction = await Transaction.create({ name, description, datetime, savings });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }

});

app.delete('/api/transaction/:id', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    try {
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
});

app.listen({ port: 4000 }, () => {
    console.log('Server is running on http://localhost:4000');
});