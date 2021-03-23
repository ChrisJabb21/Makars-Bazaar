import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import User from '../models/userModel';
import { isAdmin, isAuth } from '../util';

const orderRouter = express.Router();

orderRouter.get('/summary', isAuth,isAdmin,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            numOrders: { $sum:1 },
            totalSales: { $sum:'$totalPrice' },
          },
        },
      ]);
      const users = await User.aggregate([
        {
          $group: {
            _id: null,
            numUsers: { $sum: 1 },
          },
        },
      ]);
      res.send({ users, orders });
    })
);

/** Get all orders by user id */
orderRouter.get('/myorders', isAuth,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({ user: req.user.id });
      res.send(orders);
    })
);
/* Get all placed orders */
orderRouter.get('/', isAuth,isAdmin,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({}).populate('user');
      res.send(orders);
    })
);
/** Get order by id */
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

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment.paymentResult = {
            payerID: req.body.payerID,
            paymentID: req.body.paymentID,
            orderID: req.body.orderID,
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order not found!'})
    }
})
);
orderRouter.put('/:id/deliver', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order not found!'})
    }
})
);

orderRouter.delete('/:id', isAuth,isAdmin, 
expressAsyncHandler(async(req, res) => {
  const order = await Order.findById(req.params.id);
    if(order){
      const deletedOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deletedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found'});
    }
  })
);



export default orderRouter;