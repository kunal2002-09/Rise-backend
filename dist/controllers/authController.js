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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
// @desc    Register new user
// @route   POST /api/auth/signup
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userExists = yield user_model_1.default.findOne({ where: { email } });
        if (userExists) {
            return next(new ApiError_1.default(400, 'User already exists'));
        }
        const user = yield user_model_1.default.create({ email, password });
        return res.status(201).json({
            id: user.id,
            email: user.email,
            token: (0, generateToken_1.default)(user.id), // Generate JWT token on signup
        });
    }
    catch (error) {
        return next(new ApiError_1.default(500, error.message || 'Server error during signup'));
    }
});
exports.signup = signup;
// @desc    Authenticate user & get token
// @route   POST /api/auth/login
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ where: { email } });
        if (!user) {
            return next(new ApiError_1.default(401, 'Invalid email or password'));
        }
        // Verify password
        const isPasswordValid = yield user.validPassword(password);
        if (!isPasswordValid) {
            return next(new ApiError_1.default(401, 'Invalid email or password'));
        }
        return res.json({
            id: user.id,
            email: user.email,
            token: (0, generateToken_1.default)(user.id), // Return JWT token on login
        });
    }
    catch (error) {
        return next(new ApiError_1.default(500, error.message || 'Server error during login'));
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map