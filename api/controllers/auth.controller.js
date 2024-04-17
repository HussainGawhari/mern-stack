import User from '../models/user.model.js';

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

    const newUser = new User({
        username,
        email,
        password,
    });

    try {
        await newUser.save();
        res.json("user successfully added")
    } catch (err) {
        next(err);
    }
}