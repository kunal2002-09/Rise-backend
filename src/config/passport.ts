import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import {config} from './config';
import { tokenTypes } from './tokens';
import  User from '../models/user.model';
import { Payload } from './types'; // We'll define the Payload interface later
import { VerifiedCallback } from 'passport-jwt';

// Set mechanism to retrieve Jwt token from user request
const jwtOptions: StrategyOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Implement verify callback for passport strategy to find the user whose token is passed
const jwtVerify = async (payload: Payload, done: VerifiedCallback): Promise<void> => {
  try {
    // Check if the token type is "ACCESS"
    if (payload.type !== tokenTypes.ACCESS) {
      return done(null, false, { message: 'Invalid token type' });
    }

    // Find the user based on the ID in the payload
    const user = {
      id: 12,
      email: 'dsadad', //kunal
    };

    // If user not found, handle it as unauthorized
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    // If user is found, return the user
    return done(null, user);
  } catch (error) {
    // Handle any errors that occurred during user retrieval
    return done(error, false);
  }
};

// Create the JWT strategy using jwtOptions and jwtVerify
export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);


