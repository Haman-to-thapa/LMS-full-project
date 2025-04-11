import BuyCurseButton from '@/components/BuyCurseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React from 'react'

const CourseDetails = () => {


  const purchasedCourse = false;

  return (
    <div className='space-y-5'>
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1>Course Title</h1>
          <p>Course sub-title</p>
          <p>Create By {" "} <span className='text-[#C0C4FC] underline italic'>HanaN MernStack</span></p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last Updated 11-4-2025</p>
          </div>
          <p>Student enrolled: 10</p>

        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className='font-bold text- md:text-2xl'>Description</h1>
          <p className='text-sm'>This comprehensive course i designed for develpers who want to learn how to build  robust, production-ready web applications using Next.js . You will naster server-side Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio dolor saepe recusandae quisquam eaque ducimus iure suscipit eos voluptates ipsum, cumque commodi vel deleniti quas veritatis maiores neque, necessitatibus nam!</p>
          <Card>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>
              4 lectures
            </CardDescription>
            <CardContent className='space-y-3  '>
              {
                [1, 2, 3, 4].map((lecture, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span>
                      {
                        false ? (<PlayCircle size={14} />) : (<Lock size={14} />)
                      }
                    </span>
                    <p>Lecture title</p>
                  </div>
                ))
              }

            </CardContent>
          </Card>
        </div>
        <div className=" w-full lg:w-1/3">
          <Card>
            <CardContent className='p-4 flex flex-col'>
              <div className="w-full aspect-video mb-4">
                React player Video ayega
              </div>
              <h1>Lecture title</h1>
              <Separator className='my-2' />
              <h1 className='text-lg md:text-xl font-semibold'>Course Priece</h1>
            </CardContent>
            <CardFooter className='flex justify-center p-4'>
              {
                purchasedCourse ? (<Button className="w-full">Continue Course</Button>) : (
                  <BuyCurseButton />
                )
              }

            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
