const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/grocery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const products = [
  { name: 'Wheat Flour', price: 45 },
  { name: 'Basmati Rice', price: 90 },
  { name: 'Sunflower Oil', price: 140 },
  { name: 'Sugar', price: 40 },
  { name: 'Toor Dal', price: 110 }
];

Product.insertMany(products)
  .then(() => {
    console.log('✅ Products inserted!');
    mongoose.connection.close();
  })
  .catch(err => console.error('❌ Insert failed:', err));
