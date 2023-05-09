import mongoose from "mongoose";

const uri = process.env.NEXT_PUBLIC_MONGO_URL;

const dbConnect = async () => {
  if (mongoose.connections[0].readyState == 1) return;
  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return connection;
  } catch (error) {
    console.log("db connection fail: ", error);
  }
};

export default dbConnect;
