"use client"
import { useState } from "react"
import AddNewBlog from "../add-new-blog"

const initialBlogFormData = {
     title: "",
     description: "",
};
const BlogOverView = () => {
     const [openBlogDialog, setOpenBlogDialog] = useState(false)
     const [loading, setLoading] = useState(false)
     const [blogFormData, setBlogFormData] = useState(initialBlogFormData)
     // console.log(blogFormData)
     const handleBlogDataSave = async () => {
          try {
               setLoading(true)
               const apiResponse = await fetch("/api/addblog", {
                    method: "POST",
                    body: JSON.stringify(blogFormData)
               })
               const result = await apiResponse.json()
               if (result.success) {
                    setLoading(false)
                    setBlogFormData(initialBlogFormData)
                    setOpenBlogDialog(false)
               }
               console.log(result)
          } catch (error) {
               console.log(error)
               setLoading(false)
               setBlogFormData(initialBlogFormData)
          }
     }
     return (
          <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
               <AddNewBlog
                    name="Add New Blog"
                    openBlogDialog={openBlogDialog}
                    setOpenBlogDialog={setOpenBlogDialog}
                    loading={loading}
                    setLoading={setLoading}
                    blogFormData={blogFormData}
                    setBlogFormData={setBlogFormData}
                    handleBlogDataSave={handleBlogDataSave}
               />
               <div>
                    Blog List
               </div>
          </div>
     )
}

export default BlogOverView