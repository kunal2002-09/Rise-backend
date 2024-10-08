import mongoose, { Schema, Document } from 'mongoose';

// Define the attributes interface
interface RestaurantAttributes extends Document {
  name: string;
  address_components: object[];
  international_phone_number: string;
  url: string;
  opening_hours: object;
  rating: number;
  user_ratings_total: number;
  types: string[];
  takeout: boolean;
  serves_wine: boolean;
  serves_beer: boolean;
  reservable: boolean;
  price_level: number;
  place_id: string;
  photos: string[];
  dineIn: boolean;
  delivery: boolean;
  userId?: mongoose.Types.ObjectId;
}

// Create the Restaurant Schema
const RestaurantSchema: Schema<RestaurantAttributes> = new Schema(
  {
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
        validator: (v: string) => /^(https?:\/\/)/.test(v), // URL validation
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference the User model
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);

// Create the Restaurant model
const Restaurant = mongoose.model<RestaurantAttributes>('Restaurant', RestaurantSchema);

export default Restaurant;
