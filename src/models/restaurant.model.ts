import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db/database';
import User from './user.model'; // Import User model

// Define the attributes interface
interface RestaurantAttributes {
  id?: number;
  name: string;
  address_components: object[];
  international_phone_number: string;
  url: string;
  opening_hours: object;
  rating: number;
  user_ratings_total:number;
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
  userId?: number;
}

// Extend the Sequelize Model
class Restaurant extends Model<RestaurantAttributes> implements RestaurantAttributes {
  public id!: number;
  public name!: string;
  public address_components!: object[];
  public international_phone_number!: string;
  public opening_hours!: object;
  public rating!: number;
  public user_ratings_total!: number;
  public url!: string;
  public types!: string[];
  public takeout!: boolean;
  public serves_wine!: boolean;
  public serves_beer!: boolean;
  public reservable!: boolean;
  public price_level!: number;
  public place_id!: string;
  public photos!: string[];
  public dineIn!: boolean;
  public delivery!: boolean;
  public userId!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Restaurant model
Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_components: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    international_phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },

    opening_hours: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
    user_ratings_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },

    types: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    takeout: {
      type: DataTypes.BOOLEAN, // Whether the restaurant offers takeout
      allowNull: false,
      defaultValue: false,
    },
    serves_wine: {
      type: DataTypes.BOOLEAN, // Whether the restaurant serves wine
      allowNull: false,
      defaultValue: false,
    },
    serves_beer: {
      type: DataTypes.BOOLEAN, // Whether the restaurant serves beer
      allowNull: false,
      defaultValue: false,
    },
    reservable: {
      type: DataTypes.BOOLEAN, // Whether the restaurant accepts reservations
      allowNull: false,
      defaultValue: false,
    },
    price_level: {
      type: DataTypes.INTEGER, // Price level (e.g., 1, 2, 3, 4)
      allowNull: false,
      validate: {
        min: 1,
        max: 4, // Based on common price level scales (1 to 4)
      },
    },
    place_id: {
      type: DataTypes.STRING, // Place ID, possibly from a service like Google Places
      allowNull: false,
    },
    photos: {
      type: DataTypes.JSON, // Store photos as a JSON array
      allowNull: true,
    },
    dineIn: {
      type: DataTypes.BOOLEAN, // Whether the restaurant offers dine-in service
      allowNull: false,
      defaultValue: false,
    },
    delivery: {
      type: DataTypes.BOOLEAN, // Whether the restaurant offers delivery
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'id',
      },
    }

  },
  {
    sequelize,
    tableName: 'restaurants',
    modelName: 'Restaurant',
  }
);

export default Restaurant;
