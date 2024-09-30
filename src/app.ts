import express from "express";
import session from 'express-session';
import compression from "compression";
import cors from "cors";
import httpStatus from "http-status";
import router from "./routes/v1";
import { errorHandler } from "./middlewares/error";
import ApiError from "./utils/ApiError";
import { jwtStrategy } from "./config/passport";
import helmet from "helmet";
import passport from "passport";

const app = express();

app.use(session({
    secret: 'your_secret_key', // Secret key for signing the session ID cookie
    resave: false, // Forces session to be saved back to the session store
    saveUninitialized: false, // Forces a session that is uninitialized to be saved to the store
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Set cookie expiration (1 day in this example)
    }
}));

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// TODO: CRIO_TASK_MODULE_AUTH - Initialize passport and add "jwt" authentication strategy
app.use(passport.initialize())
app.use(passport.session())
passport.use("jwt",jwtStrategy)
// Reroute all API request starting with "/v1" route
app.use("/v1", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandler);

export default app;