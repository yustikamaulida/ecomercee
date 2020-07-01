const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const cors = require('cors');



/* CORS */
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Import Routes
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/orders');
const requestRouter = require('./routes/request');
const rulesRouter = require('./routes/rules');


// Define Routes
/**
 * @swagger
 * /api/products:
 *   get:
 *    description: Get All Products
 *
 */

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api/request', requestRouter);
app.use('/api/rules', rulesRouter);


module.exports = app;
