import mongoose = require("mongoose");


const dbUrl = process.env.MONGOURL as string;

export const dbConnection = async () => {
    // try {
    await mongoose.connect(dbUrl);
    // console.log('Database connected');
    // } catch (error) {
    //     console.log(error);
    // }
};
