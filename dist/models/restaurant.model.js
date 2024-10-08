"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("./db/database");
const user_model_1 = __importDefault(require("./user.model")); // Import User model
// Extend the Sequelize Model
class Restaurant extends sequelize_1.Model {
}
// Initialize the Restaurant model
Restaurant.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address_components: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    international_phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    opening_hours: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 5,
        },
    },
    user_ratings_total: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        },
    },
    types: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    takeout: {
        type: sequelize_1.DataTypes.BOOLEAN, // Whether the restaurant offers takeout
        allowNull: false,
        defaultValue: false,
    },
    serves_wine: {
        type: sequelize_1.DataTypes.BOOLEAN, // Whether the restaurant serves wine
        allowNull: false,
        defaultValue: false,
    },
    serves_beer: {
        type: sequelize_1.DataTypes.BOOLEAN, // Whether the restaurant serves beer
        allowNull: false,
        defaultValue: false,
    },
    reservable: {
        type: sequelize_1.DataTypes.BOOLEAN, // Whether the restaurant accepts reservations
        allowNull: false,
        defaultValue: false,
    },
    price_level: {
        type: sequelize_1.DataTypes.INTEGER, // Price level (e.g., 1, 2, 3, 4)
        allowNull: false,
        validate: {
            min: 1,
            max: 4, // Based on common price level scales (1 to 4)
        },
    },
    place_id: {
        type: sequelize_1.DataTypes.STRING, // Place ID, possibly from a service like Google Places
        allowNull: false,
    },
    photos: {
        type: sequelize_1.DataTypes.JSON, // Store photos as a JSON array
        allowNull: true,
    },
    dineIn: {
        type: sequelize_1.DataTypes.BOOLEAN, // Whether the restaurant offers dine-in service
        allowNull: false,
        defaultValue: false,
    },
    delivery: {
        type: sequelize_1.DataTypes.BOOLEAN, // Whether the restaurant offers delivery
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: {
            model: user_model_1.default,
            key: 'id',
        },
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'restaurants',
    modelName: 'Restaurant',
});
exports.default = Restaurant;
//# sourceMappingURL=restaurant.model.js.map