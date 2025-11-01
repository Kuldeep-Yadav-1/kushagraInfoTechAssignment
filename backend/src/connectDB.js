import mongoose from "mongoose";

const URL = `mongodb+srv://kulyad123:jVNAePzb8K3i3xFC@kuldeep.jawgneh.mongodb.net/KushagraInfoTechData?retryWrites=true&w=majority&appName=Kuldeep`;

const connectDB = async () => {
  try {
    if (URL) {
      await mongoose.connect(URL);
      console.log(`DataBase connected Successfully`);
    }
  } catch (error) {
    console.log(`something went wrong ${error}`);
  }
};

export default connectDB;
