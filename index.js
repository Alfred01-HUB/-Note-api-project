// const express = require ('express');
// const { default: mongoose } = require('mongoose');
// require ('dotenv').config();

// const connectDB = require ('./.config/db');
// connectDB();

// const app = express();
// const port = process.env.PORT || 5000;

// mongoose.connect

// app.listen(port,()=>{
//     console.log(`server is running on port ${port}`)
// });

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./.config/db');
const router  = require ('./routes/noteroutes');
// Load env vars
dotenv.config();

// Initialize express app
const app = express();
app.use(express.json());

app.use('/api/Note',router);


const PORT = process.env.PORT || 5000;


const startServer = async () => {
  try {

    await connectDB();

  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

// Call the function to start everything
startServer();