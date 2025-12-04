const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const mongoDB = "mongodb://localhost:27017/altenshop";
mongoose.set("strictQuery", false);

// Import des routes 
const productRouter = require('./routes/product.routes');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');

app.use(express.json());

// Définition des routes
app.use('/', authRouter);
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);

mongoose
  .connect(mongoDB)
  .then(() => console.log('Database connection successful!'))
  .catch((err) => console.error('Database connection error:', err));

app.listen(port, () => {
  console.log(`Alten shop backend running on port ${port}`);
});
