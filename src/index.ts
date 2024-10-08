import app from './app';

const PORT = process.env.PORT || 6551;

const startServer = async () => {
  try {
  
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();