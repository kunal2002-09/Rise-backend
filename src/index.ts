import app from './app';
import {sequelize} from './models/db/database';
 // Import your Sequelize connection

const PORT = process.env.PORT || 6551;

const startServer = async () => {
  try {
    await sequelize.authenticate();  // Connect to database
    console.log('Database connected');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();