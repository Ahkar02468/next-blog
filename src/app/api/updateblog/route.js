import connnectToMongo from "@/database"
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server"

const EditBlog = Joi.object({
     title: Joi.string().required(),
     description: Joi.string().required(),
});

export async function PUT(req) {
     try {
          await connnectToMongo()
          const { searchParams } = new URL(req.url)
          const currentBlogID = searchParams.get("id")
          if (!currentBlogID) {
               return NextResponse.json({
                    seccess: false,
                    message: "Bolg ID is required"
               })
          }
          const { title, description } = await req.json()
          const { error } = EditBlog.validate({
               title,
               description,
          });
          if (error) {
               return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
               });
          }
          const updateBlogByID = await Blog.findOneAndUpdate({
               _id: currentBlogID
          }, { title, description }, { new: true })
          if (updateBlogByID) {
               return NextResponse.json({
                    success: true,
                    message: "Blog updated successfully",
               })
          } else {
               return NextResponse.json({
                    success: false,
                    message: "Blog not found or can't update the blog"
               })
          }
     } catch (error) {
          console.log(error)
          return NextResponse.json({
               success: false,
               message: "Something wrong in updating blog | find the bug",
          })
     }
}