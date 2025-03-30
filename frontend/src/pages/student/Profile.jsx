import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import Course from './Course'
import { useLoadUserQuery } from '@/featureSlice/api/authApi'

const Profile = () => {

  // if getUser get then use this 
  const { data, isLoading, error } = useLoadUserQuery();
  console.log(data);

  if (isLoading) return <h1>Profile Loading</h1>

  const { user } = data;

  return (
    <div className='mx-w-4xl mx-auto container px-4 my-14'>
      <h1 className='font-bold text-2xl text-center md:text-left'>Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-center gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <div className="mb-2">
            <h1 className='font-semibold text-gray-900 dark:text-gray-100 ml-2'>
              Name: <span className='font-normal text-gray-700 dark:text-gray-300'>{user.name}</span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className='font-semibold text-gray-900 dark:text-gray-100 ml-2'>
              Email: <span className='font-normal text-gray-700 dark:text-gray-300'>{user.email}</span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className='font-semibold text-gray-900 dark:text-gray-100 ml-2'>
              role: <span className='font-normal text-gray-700 dark:text-gray-300'>{user.role.toUpperCase()}</span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-2" size="sm">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent aria-describedby="dialog-description">

              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                {/* Ensure this has an id that matches aria-describedby */}
                <DialogDescription id="dialog-description">
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="profile-photo">Profile Photo</Label>
                  <Input id="profile-photo" type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>


        </div>
      </div>
      <div className="">
        <h1 className='font-medium text-lg'>Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {
            user.enrolledCourses.length === 0 ? <h1>You haven't enrolled yet</h1> : (
              user.enrolledCourses.map((course) => <Course key={course._id} course={course} />)
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Profile