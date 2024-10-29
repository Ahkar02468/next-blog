import mongoose from "mongoose";

const connnectToMongo = async () => {
     const connectionURL = "mongodb+srv://ahkarshwebaw:vidTube123456@cluster0.ohdlloc.mongodb.net/"
     mongoose
          .connect(connectionURL)
          .then(() => console.log("Blog db connection success."))
          .catch((error) => console.log(error))
}

export default connnectToMongo