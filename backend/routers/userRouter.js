import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { generateToken } from '../util';

const userRouter = express.Router();
userRouter.get("/createadmin", 
expressAsyncHandler(async(req, res) => {
    try {
        const user = new User({
            firstname:'Arnold',
            lastname: 'Schwartznegger',
            username:'admin',
            email: 'admin@makars.com',
            password:'M4k4r123',
            isAdmin: true,
        });
        const createdUser = await user.save();
        res.send(createdUser);
    } catch(err){
        res.status(500).send({ message: err.message});
    }
}));

userRouter.post('/signin', 
expressAsyncHandler(async (req,res)  => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if(!signinUser){
        res.status(401).send({
            message: 'Invalid Email or Password',
        });
    } else {
        res.send({
            id: signinUser.id,
            firstname: signinUser.firstname,
            lastname: signinUser.lastname,
            username: signinUser.username,
            email: signinUser.email,
            password: signinUser.password,
            isAdmin: signinUser.isAdmin,
            token: generateToken(signinUser),

        })

    }

}));

export default userRouter;