"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Create the Restaurant Schema
const RestaurantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    address_components: {
        type: [Object], // Store address components as an array of objects
        required: true,
    },
    international_phone_number: {
        type: String,
        required: true,
    },
    opening_hours: {
        type: Object, // Store opening hours as a JSON-like object
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    user_ratings_total: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^(https?:\/\/)/.test(v), // URL validation
            message: props => `${props.value} is not a valid URL!`,
        },
    },
    types: {
        type: [String], // Store types as an array of strings
        required: true,
    },
    takeout: {
        type: Boolean,
        required: true,
        default: false,
    },
    serves_wine: {
        type: Boolean,
        required: true,
        default: false,
    },
    serves_beer: {
        type: Boolean,
        required: true,
        default: false,
    },
    reservable: {
        type: Boolean,
        required: true,
        default: false,
    },
    price_level: {
        type: Number,
        required: true,
        min: 1,
        max: 4,
    },
    place_id: {
        type: String,
        required: true,
    },
    photos: {
        type: [String], // Store photos as an array of strings (URLs)
    },
    dineIn: {
        type: Boolean,
        required: true,
        default: false,
    },
    delivery: {
        type: Boolean,
        required: true,
        default: false,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
    },
}, {
    timestamps: true, // Add createdAt and updatedAt timestamps
});
// Create the Restaurant model
const Restaurant = mongoose_1.default.model('Restaurant', RestaurantSchema);
exports.default = Restaurant;
//# sourceMappingURL=restaurant.model.js.map