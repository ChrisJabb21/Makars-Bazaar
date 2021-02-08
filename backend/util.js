import jwt from 'jsonwebtoken';
import config from "./config"

export const generateToken = (user) => jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password
    },
        config.JWT_SECRET
    );