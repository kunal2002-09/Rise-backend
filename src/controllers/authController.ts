import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import Restaurant from '../models/restaurant.model';
import generateToken from '../utils/generateToken';
import ApiError from '../utils/ApiError';

// @desc    Register new user
// @route   POST /api/auth/signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password ,restaurantDetails} = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return next(new ApiError(400, 'User already exists'));
    }

    const user = await User.create({ email, password });
    const restaurant = await Restaurant.create({...restaurantDetails,userId:user.id});


    return res.status(201).json({
      id: user.id,
      email: user.email,
      token: generateToken(user.id),  // Generate JWT token on signup
    });
  } catch (error: any) {
    return next(new ApiError(500, error.message || 'Server error during signup'));
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    // Verify password
    const isPasswordValid = await user.validPassword(password);
    if (!isPasswordValid) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    return res.json({
      id: user.id,
      email: user.email,
      token: generateToken(user.id),  // Return JWT token on login
    });
  } catch (error: any) {
    return next(new ApiError(500, error.message || 'Server error during login'));
  }
};
