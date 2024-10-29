import mongoose from "mongoose";

const connnectToMongo = async () => {
     const connectionURL = "mongodb+srv://ahkarshwebaw:vidTube123456@next-cluster.nyuhc.mongodb.net/blogs?retryWrites=true&w=majority&appName=Next-Cluster"

     mongoose
          .connect(connectionURL)
          .then(() => console.log("Blog db connection success."))
          .catch((error) => console.log(error))
}

export default connnectToMongo