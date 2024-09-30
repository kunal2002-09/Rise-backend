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
exports.sequelize = void 0;
// database.js
const constants_1 = require("../../lib/constants");
const config_1 = require("../../config/config");
const sequelize_1 = require("sequelize");
// Create a new Sequelize instance with MySQL connection
exports.sequelize = new sequelize_1.Sequelize(config_1.config[constants_1.ENVIRONMENT].MYSQL_SETTINGS.DATABASE, config_1.config[constants_1.ENVIRONMENT].MYSQL_SETTINGS.USER, config_1.config[constants_1.ENVIRONMENT].MYSQL_SETTINGS.PASSWORD, {
    host: config_1.config[constants_1.ENVIRONMENT].MYSQL_SETTINGS.HOST,
    port: config_1.config[constants_1.ENVIRONMENT].MYSQL_SETTINGS.PORT,
    dialect: config_1.config[constants_1.ENVIRONMENT].MYSQL_SETTINGS.DIALECT,
    dialectOptions: {
        supportBigNumbers: true,
        // useUTC: false  // Uncomment if needed
    },
    // timezone: '+05:30', // Uncomment if needed
    logging: false,
    pool: {
        max: 10,
        idle: 10000
    }
});
// Sync all models to the database
// sequelize.sync({ force: false }) // `force: true` drops the tables before recreating them && // force: false ensures tables are not dropped
//   .then(() => {
//     console.log('All models were synchronized successfully.');
//   })
//   .catch(error => {
//     console.error('Error synchronizing models:', error);
//   });
// Test the connection
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
testConnection();
//# sourceMappingURL=database.js.map