import connnectToMongo from "@/database"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"

export async function DELETE(req) {
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
          const deleteBlogByID = await Blog.findByIdAndDelete(currentBlogID)
          if (deleteBlogByID) {
               return NextResponse.json({
                    success: true,
                    message: "Blog deleted successfully"
               })
          } else {
               return NextResponse.json({
                    success: false,
                    message: "Blog not found or can't delete the blog"
               })
          }
     } catch (error) {
          console.log(error)
          return NextResponse.json({
               success: false,
               message: "Something wrong in deleting blog | find the bug",
          })
     }
}