"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("../config/config");
// Error handler middleware
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    // Default status code and message if not provided
    statusCode = statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
    message = message || 'Something went wrong';
    res.locals.errorMessage = err.message;
    // Response object
    const response = Object.assign({ code: statusCode, message }, (config_1.config.env === 'development' && { stack: err.stack }));
    // Log error in development mode
    if (config_1.config.env === 'development') {
        console.error(err);
    }
    // Send response
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map