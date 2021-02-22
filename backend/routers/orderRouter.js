import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import { isAuth } from '../util';

const orderRouter = express.Router();
orderRouter.get('/:id', isAuth,
 expressAsyncHandler(async (req,res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order Not found!'})
    }
 })
);
orderRouter.post('/', 
isAuth,
expressAsyncHandler(async (req,res)  => {
   const order = new Order({
       orderItems: req.body.orderItems,
       user: req.user.id,
       shipping: req.body.shipping,
       payment: req.body.payment,
       itemsPrice: req.body.itemsPrice,
       taxPrice: req.body.taxPrice,
       shippingPrice: req.body.shippingPrice,
       totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: 'New Order Created', order: createdOrder });
    })
);
export default orderRouter;