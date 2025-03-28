import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import Course from './Course'

const Profile = () => {

  const isLoading = false;
  const enrolledCourse = [1, 2];

  return (
    <div className='mx-w-4xl mx-auto container px-4 my-14'>
      <h1 className='font-bold text-2xl text-center md:text-left'>Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-center gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <div className="mb-2">
            <h1 className='font-semibold text-gray-900 dark:text-gray-100 ml-2'>
              Name: <span className='font-normal text-gray-700 dark:text-gray-300'> Haman Mernstack</span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className='font-semibold text-gray-900 dark:text-gray-100 ml-2'>
              Email: <span className='font-normal text-gray-700 dark:text-gray-300'> haman@gamil.com</span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className='font-semibold text-gray-900 dark:text-gray-100 ml-2'>
              role: <span className='font-normal text-gray-700 dark:text-gray-300'>Instructor</span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-2" size="sm">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. click save you're done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input type="text" placeholder="Name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isLoading}>
                  {
                    isLoading ? (<>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                    </>) : "Save Changes"
                  }
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
            enrolledCourse.length === 0 ? <h1>You haven't enrolled yet</h1> : (
              enrolledCourse.map((course, index) => <Course key={index} />)
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Profile