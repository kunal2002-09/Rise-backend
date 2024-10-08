import mongoose from 'mongoose';
import { ENVIRONMENT } from '../../lib/constants';
import { config } from '../../config/config';

// Build the MongoDB connection string
const mongoURI = config[ENVIRONMENT].MONGODB_SETTINGS.URI;

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, // Maintain up to 10 socket connections
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
  // Uncomment below if you want to enforce using the correct timezone
  // useCreateIndex: true,
  // useFindAndModify: false,
};

// Connect to MongoDB
mongoose.connect(mongoURI, options)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Function to test the connection (optional since Mongoose handles connection testing)
async function testConnection() {
  try {
    await mongoose.connection;
    console.log('MongoDB connection is established successfully.');
  } catch (error) {
    console.error('Error testing MongoDB connection:', error);
  }
}

testConnection();

export default mongoose;
