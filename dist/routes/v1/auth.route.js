"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../../controllers/authController");
const router = express_1.default.Router();
// Auth routes
router.post('/signup', authController_1.signup); // Route for signup
router.post('/login', authController_1.login); // Route for login
exports.default = router;
//# sourceMappingURL=auth.route.js.map