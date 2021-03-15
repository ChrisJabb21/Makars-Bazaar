import jwt from 'jsonwebtoken';
import config from "./config";

export const generateToken = (user) => jwt.sign(
    {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password
    },
    config.JWT_SECRET
);

export const isAuth = (req, res, next) => {

    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        res.status(401).send({ message: 'Token is not supplied' });
    }
    else {
        const token = bearerToken.slice(7, bearerToken.length);
        jwt.verify(token, config.JWT_SECRET, (err, data) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            }
            else {
                req.user = data;
                next();
            }
        });
    }
}

export const isAdmin = (req, res, next) => {
  if(req.user && req.user.isAdmin){
     next();
  } else {
      res.status(401).send({ message: 'invalid token, access is not authorized for this user'})
  }
   
}