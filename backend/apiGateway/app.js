var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var adminsRouter = require('./routes/users/admin-api');
var doctorRouter =require('./routes/users/doctor-api');
var doctorOrderRouter= require('./routes/orders/doctorOrders-api');
var verifiedOrderRouter= require('./routes/orders/verifiedDocOrders-api');
var pickedUpOrderRouter= require('./routes/orders/pickedUpOrders-api');
var supplierRouter= require('./routes/suppliers-inventory/supplier-api');
var inventoryRouter= require('./routes/suppliers-inventory/inventory-api');
var salesRouter= require('./routes/suppliers-inventory/sales-api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);

//----------Users-----------------
app.use('/api/admin', adminsRouter)
app.use('/api/doctorUser',doctorRouter)

//--------Orders-----------------------
app.use('/api/doctorOrder', doctorOrderRouter)
app.use('/api/verifiedDoctorOrder', verifiedOrderRouter)
app.use('/api/pickedUpOrders',pickedUpOrderRouter)
//--------Supplier-inventory-----------
app.use('/api/supplier',supplierRouter)
app.use('/api/inventory',inventoryRouter)
app.use('/api/sales', salesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
  
module.exports = app;