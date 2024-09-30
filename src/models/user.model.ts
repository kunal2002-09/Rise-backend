import { DataTypes, Model } from 'sequelize';
import {sequelize} from './db/database';
import bcrypt from 'bcryptjs';

// Define a UserAttributes interface for defining the shape of the User model.
interface UserAttributes {
  id?: number;
  email: string;
  password: string;
}

// Extend Sequelize's Model class and provide UserAttributes and CreationAttributes
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Check if password matches the hashed password
  public async validPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users', // This defines the table name in the DB
    modelName: 'User',  // This defines the name of the model in Sequelize
  }
);

// Hash password before saving the user
User.beforeCreate(async (user: User) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

export default User;
