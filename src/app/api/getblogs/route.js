import connnectToMongo from '@/database'
import Blog from '@/models/blog'
import { NextResponse } from 'next/server'

export async function GET() {
     try {
          await connnectToMongo()
          const getALlBlogs = await Blog.find({})
          if (getALlBlogs) {
               return NextResponse.json({
                    success: true,
                    message: "Blogs fetched successfully",
                    data: getALlBlogs
               })
          } else {
               return NextResponse.json({
                    success: false,
                    message: "Can't fetch the blogs"
               })
          }
     } catch (error) {
          console.log(error)
          return NextResponse.json({
               success: false,
               message: "Can't fetch the blogs | try again"
          })
     }
}
