require("dotenv").config();
const mongoose = require("mongoose");
const data = require("./data")
const Brand = require("../model/brand.model")

const dbOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function initDb(){
  try{
    const connect = await mongoose.connect(process.env.MONGODB_URI, dbOptions);
    console.log("connect",connect)
    const brands = await Brand.create(data);
    console.log("centros",brands)
    mongoose.connection.close();
  }catch(e){
    console.error(e)
  }
};

initDb();