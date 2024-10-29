import {
     Dialog,
     DialogContent,
     DialogFooter,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const AddNewBlog = ({
     name,
     openBlogDialog,
     setOpenBlogDialog,
     loading,
     setLoading,
     blogFormData,
     setBlogFormData }) => {
     return (
          <>
               <div>
                    <Button onClick={() => setOpenBlogDialog(true)}>{name}</Button>
               </div>
               <Dialog open={openBlogDialog} onOpenChange={setOpenBlogDialog}>
                    <DialogContent className="sm:max-w-[425px]">
                         <DialogHeader>
                              <DialogTitle>{name}</DialogTitle>
                         </DialogHeader>
                         <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                   <Label htmlFor="name" className="text-right">
                                        Title
                                   </Label>
                                   <Input
                                        id="title"
                                        name="title"
                                        placeholder="Enter blog title"
                                        value={blogFormData.title}
                                        onChange={(e) =>
                                             setBlogFormData({
                                                  ...blogFormData,
                                                  title: e.target.value,
                                             })
                                        }
                                        className="col-span-3"
                                   />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                   <Label htmlFor="username" className="text-right">
                                        Description
                                   </Label>
                                   <Input
                                        id="description"
                                        name="description"
                                        value={blogFormData.description}
                                        placeholder="Enter blog description"
                                        onChange={(e) =>
                                             setBlogFormData({
                                                  ...blogFormData,
                                                  description: e.target.value,
                                             })
                                        }
                                        className="col-span-3"
                                   />
                              </div>
                         </div>
                         <DialogFooter>
                              <Button type="button">Add</Button>
                         </DialogFooter>
                    </DialogContent>
               </Dialog>
          </>
     )
}

export default AddNewBlog
