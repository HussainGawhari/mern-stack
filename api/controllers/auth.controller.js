import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async(req, res, next) => {
    const { username, email, password } = req.body;

    if (!username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === ''
    ) {
        next(errorHandler(400, 'All fields are required'));

    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json("user successfully added")
    } catch (err) {
        next(err);
    }
}

export const signIn = async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, 'Invalid email or password'));

    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Password incorrect'));
        }
        const token = jwt.sign({ id: validUser._id },
            process.env.JWT_SECRET)

        const { password: pas, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
                hhtponly: true,
            })
            .json(rest);
    } catch (err) {
        return next(err);
    }
}