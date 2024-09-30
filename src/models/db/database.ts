// database.js
import { ENVIRONMENT  } from '../../lib/constants';
import { config } from '../../config/config';
import { Sequelize } from 'sequelize';

// Create a new Sequelize instance with MySQL connection
export const sequelize = new Sequelize(
  config[ENVIRONMENT].MYSQL_SETTINGS.DATABASE,
  config[ENVIRONMENT].MYSQL_SETTINGS.USER,
  config[ENVIRONMENT].MYSQL_SETTINGS.PASSWORD,
  {
    host: config[ENVIRONMENT].MYSQL_SETTINGS.HOST,
    port: config[ENVIRONMENT].MYSQL_SETTINGS.PORT,
    dialect: config[ENVIRONMENT].MYSQL_SETTINGS.DIALECT,
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
  }
);

// Sync all models to the database
// sequelize.sync({ force: false }) // `force: true` drops the tables before recreating them && // force: false ensures tables are not dropped
//   .then(() => {
//     console.log('All models were synchronized successfully.');
//   })
//   .catch(error => {
//     console.error('Error synchronizing models:', error);
//   });

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

