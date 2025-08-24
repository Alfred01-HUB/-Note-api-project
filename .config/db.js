const mongoose = require('mongoose');


// mongoose.connectDB(process.DATABASE_URI).then(()=>{

//         console.log('data base is connected succesfully');    
//     }).catch ((err) => {
//     console.log(err);  
    
// });

const connectDB = async () =>{

    try {
        await mongoose.connect(process.env.DATABASE_URI);

        console.log('date base connected succesfully');
    } catch (error) {

        console.error(`Error: ${error.message}`);

        process.exit(1);
    }
};

module.exports = connectDB;