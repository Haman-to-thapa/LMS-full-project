import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
import { Badge } from '@/components/ui/badge'

const Course = () => {
  return (
    <Card className='overflow-hidden dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300'>
      <div className="relative">
        <img src="https://images.ctfassets.net/23aumh6u8s0i/6pjUKboBuFLvCKkE3esaFA/5f2101d6d2add5c615db5e98a553fc44/nextjs.jpeg"
          alt="course"
          className="w-full h-36 object-cover rounded-t-lg" />

      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className='hover:underline text-lg font-bold truncate'>Nextjs Complete Course in Hindi 20XX</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='font-medium text-sm'>Govind MERN</h1>
            <Badge className={`bg-blue-600 text-white px-2 py-1 rounded-full text-sm`}>Advance</Badge>
          </div>
        </div>
        <div className='text-lg font-bold'>
          <span>₹499</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default Course
