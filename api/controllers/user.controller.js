import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
export const test = (req, res) => {
    res.json({ message: 'API is working!' });
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie('acess_token')
            .status(200)
            .json('User signed out');
    } catch (err) {
        next(err);
    }
}


export const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(404, 'User not found'));
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password too short'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username must not have space'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9_]+$/)) {
            return next(errorHandler(400, 'Username can only contain letters, numbers, and underscores'));
        }
    }

    try {
        const newUser = await User.findByIdAndUpdate(
            req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    // profilePicture: req.body.profilePicture,
                    password: req.body.password,
                    // Ensure this is intentional
                    // If not, remove one of them
                },
            }, { new: true }
        );
        const { password, ...rest } = newUser._doc;
        res.status(200).json(rest);
    } catch (err) {
        return next(errorHandler(500, err.message));
    }
};

export const deleteUser = async(req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(400, 'you are not allowed to delete'))
    }
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json('User deleted successfully');
    } catch (err) {
        next(err);
    }

}