const express = require('express')
const app = express()
const env= require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors=require('cors');
const bodyParser = require("body-parser")
env.config();

//routes
const authRoutes=require('./routes/auth');
const adminRoutes=require('./routes/admin/auth');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart'); 
const initialDataRoutes=require('./routes/admin/initialData');
const pageRoutes=require('./routes/admin/page');
const orderRoutes=require('./routes/order');
const addressRoutes=require('./routes/address');
const adminOrderRoute = require("./routes/admin/orderRoutes");

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.nswkl.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)
.then(()=>{
  console.log('Database Connect');
});

app.use(cors());
app.use(bodyParser());
app.use(express.json());
// app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialDataRoutes);
app.use('/api',pageRoutes);
app.use('/api',orderRoutes);
app.use('/api',addressRoutes);
app.use('/api',adminOrderRoute);



app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})