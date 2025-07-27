require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transaction.routes');
require('./models/transaction.model');
// require('./events/subscriber');

const app = express();
const PORT = process.env.PORT || 4100;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/transaction', transactionRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('Transaction Service is up and running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Transaction Service running on port ${PORT}`);
});
