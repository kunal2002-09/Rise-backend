import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import Restaurant from './restaurant.model';  // Import the Restaurant model

// Define a UserAttributes interface for the shape of the User model.
interface UserAttributes extends Document {
  email: string;
  password: string;
  validPassword(password: string): Promise<boolean>;
}

// Create the User schema
const UserSchema: Schema<UserAttributes> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v), // Email validation regex
        message: props => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);

// Password comparison method
UserSchema.methods.validPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Hash password before saving the user
UserSchema.pre<UserAttributes>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Define associations (optional in Mongoose as you retrieve by querying)
UserSchema.virtual('restaurants', {
  ref: 'Restaurant',
  localField: '_id',
  foreignField: 'userId',
});

// Create the User model
const User = mongoose.model<UserAttributes>('User', UserSchema);

export default User;
