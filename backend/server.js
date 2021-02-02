import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import data from './data';
import config from './config';
import userRouter from './routers/userRouter';

mongoose.connect(
  config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to MongoDB.")
  })
  .catch((error) => {
    console.log(error.reason);
  });
const app = express();
app.use(cors());
app.use('/api/users', userRouter);
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x.id === req.params.id);
  if (product) {
    res.send(product); 
  } else {
    res.status(404).send({ message: 'Product Not Found!'});
  }
});

app.listen(5000, () => {
  console.log('Listening at http://localhost:5000');
});
