import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(
      `Connection to the database successful on port: ${conn.connection.host} ${conn.connection.port}`
    );
  } catch (error) {
    console.log(
      `Connection to the database isn't sucessful, error: ${error.message}`
    );
    await mongoose.connection.close();
  }
};

export default connectDB;
