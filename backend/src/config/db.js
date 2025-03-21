import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_CONNECTION, { autoIndex: true })
    .then(() => {
      console.log("Successfully connected to the DataBase.");
    })
    .catch((error) => {
      console.log("Error in conecting the Database: " + error.message);
    });
};
