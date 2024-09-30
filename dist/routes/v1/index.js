"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const userRoute = require("./user.route");
const auth_route_1 = __importDefault(require("./auth.route"));
const router = express_1.default.Router();
// Middleware
router.use(express_1.default.json());
// TODO: CRIO_TASK_MODULE_AUTH - Reroute all API requests beginning with the `/v1/auth` route to Express router in auth.route.js 
// router.use("/products", productRoute);
router.use("/auth", auth_route_1.default);
// router.use("/users",userRoute);
// router.use("/cart", cartRoute);
exports.default = router;
//# sourceMappingURL=index.js.map