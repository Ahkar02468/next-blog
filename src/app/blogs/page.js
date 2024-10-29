import BlogOverView from '@/components/blog-overview'
import React from 'react'

const fetchListOfBlog = async () => {
     try {
          const apiResponse = await fetch("http://localhost:3000/api/getblogs", {
               method: "GET",
               cache: "no-store"
          })

          const result = await apiResponse.json()
          return result?.data
     } catch (error) {
          throw new Error(error)
     }
}
const Blogs = async () => {
     const blogsList = await fetchListOfBlog()
     console.log(blogsList)
     return (
          <BlogOverView blogsList={blogsList} />
     )
}

export default Blogs
