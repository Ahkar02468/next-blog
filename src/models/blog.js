import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
     title: {
          type: String,
          required: true,
     },
     description: {
          type: String,
          required: true,
     }
})

const Blog = mongoose.models.Blog || mongoose.model('BLog', BlogSchema)
export default Blog