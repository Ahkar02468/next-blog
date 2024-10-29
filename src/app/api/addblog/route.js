import connnectToMongo from '@/database'
import Blog from '@/models/blog'
import Joi from 'joi'
import { NextResponse } from 'next/server'

const AddNewBlog = Joi.object({
     title: Joi.string().required(),
     description: Joi.string().required()
})

const POST = async (req) => {
     try {
          await connnectToMongo()
          const extractBlogData = await req.json()
          const { title, description } = extractBlogData
          const { error } = AddNewBlog.validate({
               title,
               description
          })
          if (error) {
               return NextResponse.json({
                    success: false,
                    message: error.details[0].message
               })
          }

          const newBlog = await Blog.create(extractBlogData)
          if (newBlog) {
               return NextResponse.json({
                    success: true,
                    message: "Bolg is added successfully"
               })
          } else {
               return NextResponse.json({
                    success: false,
                    message: 'Something went wrong | please try again'
               })
          }
     } catch (error) {
          console.log(error)
          return NextResponse.json({
               success: false,
               message: 'Something went wrong | please try again'
          })
     }
}

export default POST
