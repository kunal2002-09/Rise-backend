"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("./config");
const tokens_1 = require("./tokens");
// Set mechanism to retrieve Jwt token from user request
const jwtOptions = {
    secretOrKey: config_1.config.jwt.secret,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
// Implement verify callback for passport strategy to find the user whose token is passed
const jwtVerify = (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the token type is "ACCESS"
        if (payload.type !== tokens_1.tokenTypes.ACCESS) {
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
    }
    catch (error) {
        // Handle any errors that occurred during user retrieval
        return done(error, false);
    }
});
// Create the JWT strategy using jwtOptions and jwtVerify
exports.jwtStrategy = new passport_jwt_1.Strategy(jwtOptions, jwtVerify);
//# sourceMappingURL=passport.js.map