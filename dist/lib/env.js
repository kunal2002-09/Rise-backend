"use strict";
/**
 * Helpers for accessing environment variables
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = getEnv;
/**
 * Get environment variable. If required is truthy, will throw
 * an error if the environment variable isn't present.
 */
function getEnv(envVariableName, required = false) {
    const value = process.env[envVariableName];
    if (required && !value) {
        throw new Error(`Missing required environment variable '${envVariableName}'`);
    }
    return value;
}
//# sourceMappingURL=env.js.map