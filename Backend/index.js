const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoute');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
app.use('/api', employeeRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
