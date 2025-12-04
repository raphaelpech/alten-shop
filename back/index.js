const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const mongoDB = "mongodb://localhost:27017/altenshop";
mongoose.set("strictQuery", false);

// Import des routes Products
const productRouter = require('./routes/product.routes');

app.use(express.json());

// Mise en place des routes Products
app.use('/api/products', productRouter);

mongoose
  .connect(mongoDB)
  .then(() => console.log('Database connection successful!'))
  .catch((err) => console.error('Database connection error:', err));

app.listen(port, () => {
  console.log(`Alten shop backend running on port ${port}`);
});
