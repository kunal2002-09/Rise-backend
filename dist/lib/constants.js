"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENVIRONMENT = void 0;
const env_1 = require("./env");
exports.ENVIRONMENT = (0, env_1.getEnv)('NODE_ENV') || 'development';
//# sourceMappingURL=constants.js.map