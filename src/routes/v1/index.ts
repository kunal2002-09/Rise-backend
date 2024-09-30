import express from "express";
// const userRoute = require("./user.route");
import authRoute from "./auth.route";
// const productRoute = require("./product.route");
// const cartRoute = require("./cart.route");
import { json } from 'body-parser';

 const router = express.Router();

// Middleware
router.use(express.json()); 
// TODO: CRIO_TASK_MODULE_AUTH - Reroute all API requests beginning with the `/v1/auth` route to Express router in auth.route.js 
// router.use("/products", productRoute);
router.use("/auth", authRoute);
// router.use("/users",userRoute);
// router.use("/cart", cartRoute);

export default router;