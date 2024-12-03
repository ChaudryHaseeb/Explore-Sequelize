const express = require('express');
const sequelize = require('./db_connection');
const userRoutes = require('./Routes/userRoute');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

// Test Database Connection
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
