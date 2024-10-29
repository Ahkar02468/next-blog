import mongoose from "mongoose";

const connnectToMongo = async () => {
     const connectionURL = process.env.NEXT_PUBLIC_MONGO_URI

     mongoose
          .connect(connectionURL)
          .then(() => console.log("Blog db connection success."))
          .catch((error) => console.log(error))
}

export default connnectToMongo