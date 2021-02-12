import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { generateToken, isAuth } from '../util';

const userRouter = express.Router();
userRouter.get("/createadmin", 
expressAsyncHandler(async(req, res) => {
    try {
        const user = new User({
            firstname:'Arnold',
            lastname: 'Schwartznegger',
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
            email: signinUser.email,
            password: signinUser.password,
            isAdmin: signinUser.isAdmin,
            token: generateToken(signinUser),

        })

    }

}));

userRouter.post('/register', 
expressAsyncHandler(async (req,res)  => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    });
    const createdUser = await user.save();
    if(!createdUser){
        res.status(401).send({
            message: 'Invalid user data!',
        });
    } else {
        res.send({
            id: createdUser.id,
            firstname: createdUser.firstname,
            lastname: createdUser.lastname,
            email: createdUser.email,
            password: createdUser.password,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
        });
    }
}));

userRouter.put('/:id', isAuth,
expressAsyncHandler(async (req,res)  => {
   const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).send({
            message: 'User does not exist',
        });
    } else {
        user.firstname = req.body.firstname || user.firstname;
        user.lastname = req.body.lastname || user.lastname;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            id: updatedUser.id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            password: updatedUser.password,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    }
}));
export default userRouter;