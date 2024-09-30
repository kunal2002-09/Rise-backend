"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const v1_1 = __importDefault(require("./routes/v1"));
const error_1 = require("./middlewares/error");
const ApiError_1 = __importDefault(require("./utils/ApiError"));
const passport_1 = require("./config/passport");
const helmet_1 = __importDefault(require("helmet"));
const passport_2 = __importDefault(require("passport"));
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'your_secret_key', // Secret key for signing the session ID cookie
    resave: false, // Forces session to be saved back to the session store
    saveUninitialized: false, // Forces a session that is uninitialized to be saved to the store
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Set cookie expiration (1 day in this example)
    }
}));
// set security HTTP headers - https://helmetjs.github.io/
app.use((0, helmet_1.default)());
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// gzip compression
app.use((0, compression_1.default)());
// enable cors
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
// TODO: CRIO_TASK_MODULE_AUTH - Initialize passport and add "jwt" authentication strategy
app.use(passport_2.default.initialize());
app.use(passport_2.default.session());
passport_2.default.use("jwt", passport_1.jwtStrategy);
// Reroute all API request starting with "/v1" route
app.use("/v1", v1_1.default);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError_1.default(http_status_1.default.NOT_FOUND, "Not found"));
});
app.use(error_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map