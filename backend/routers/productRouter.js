import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';
import { isAdmin, isAuth } from '../util';

const productRouter = express.Router();
productRouter.post('/', 
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'sample product',
      description: 'sample description',
      category: 'sample category',
      brand: 'sample brand',
      image: '/images/default-image.jpg', 
    });
    const createdProduct = await product.save();
    if(createdProduct){
      res.status(201)
      .send({ message:'Product created!', product: createdProduct});
    }
    else {
      res.status(500).send({ message: 'Error in creating product'});
    }
  })
);
export default productRouter;