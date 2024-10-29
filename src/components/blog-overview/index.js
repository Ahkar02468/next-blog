"use client"
import { useEffect, useState } from "react"
import AddNewBlog from "../add-new-blog"
import {
     Card,
     CardContent,
     CardDescription,
     CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


const initialBlogFormData = {
     title: "",
     description: "",
};
const BlogOverView = ({ blogsList }) => {
     const [openBlogDialog, setOpenBlogDialog] = useState(false)
     const [loading, setLoading] = useState(false)
     const [blogFormData, setBlogFormData] = useState(initialBlogFormData)
     const [editableBlogID, setEditableBlogID] = useState(null)
     const router = useRouter()
     useEffect(() => {
          router.refresh()
     }, [])
     // console.log(blogFormData)
     const handleBlogDataSave = async () => {
          try {
               setLoading(true)
               const apiResponse = editableBlogID !== null
                    ? await fetch(`/api/updateblog?id=${editableBlogID}`, {
                         method: "PUT",
                         body: JSON.stringify(blogFormData)
                    })
                    : await fetch("/api/addblog", {
                    method: "POST",
                    body: JSON.stringify(blogFormData)
               })
               const result = await apiResponse.json()
               if (result?.success) {
                    setLoading(false)
                    setBlogFormData(initialBlogFormData)
                    setOpenBlogDialog(false)
                    setEditableBlogID(null)
                    router.refresh()
               }
               console.log(result)
          } catch (error) {
               console.log(error)
               setLoading(false)
               setBlogFormData(initialBlogFormData)
          }
     }

     const handleDeleteBlogByID = async (blogID) => {
          try {
               const apiResponse = await fetch(`/api/deleteblog?id=${blogID}`, {
                    method: "DELETE"
               })
               const result = await apiResponse.json()
               if (result?.success) {
                    setLoading(false)
                    setBlogFormData(initialBlogFormData)
                    setOpenBlogDialog(false)
                    router.refresh()
               }
               console.log(result)
          } catch (error) {
               console.log(error)
               setLoading(false)
               setBlogFormData(initialBlogFormData)
          }
     }

     const handleEditBlog = (blog) => {
          setEditableBlogID(blog._id)
          console.log(editableBlogID)
          setBlogFormData({
               title: blog.title,
               description: blog.description,
          })
          setOpenBlogDialog(true)
          try {

          } catch (error) {
               console.log(error)
               setLoading(false)
               setBlogFormData(initialBlogFormData)
          }
     }


     return (
          <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
               <AddNewBlog
                    openBlogDialog={openBlogDialog}
                    setOpenBlogDialog={setOpenBlogDialog}
                    loading={loading}
                    setLoading={setLoading}
                    blogFormData={blogFormData}
                    setBlogFormData={setBlogFormData}
                    handleBlogDataSave={handleBlogDataSave}
                    editableBlogID={editableBlogID}
                    setEditableBlogID={setEditableBlogID}
               />
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                    {
                         blogsList && blogsList.length > 0
                              ? blogsList.map(blog => (
                                   <Card className="p-5" key={blog._id}>
                                        <CardContent>
                                             <CardTitle>
                                                  {blog?.title}
                                             </CardTitle>
                                             <CardDescription>
                                                  {blog?.description}
                                             </CardDescription>
                                             <div className="mt-5 flex gap-5 justify-center items-center">
                                                  <Button onClick={() => handleEditBlog(blog)}>Edit</Button>
                                                  <Button onClick={() => handleDeleteBlogByID(blog._id)}>Delete</Button>
                                             </div>
                                        </CardContent>
                                   </Card>
                              )
                              )
                              : <label className="text-6xl font-extrabold">No blogs are found. Please add some bolgs.</label>
                    }
               </div>
          </div>
     )
}

export default BlogOverView
