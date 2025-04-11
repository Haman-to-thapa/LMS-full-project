import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate()

  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`)
  }


  return (
    <div className='flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 my-2 rounded-md'>
      <h1 className='font-bold text-gray-800 dark:text-gray-100'>
        Lecture - {index + 1} {lecture.lectureTitle}
      </h1>
      <div className='flex gap-2'>
        <h1 className='text-sm font-medium hover:text-blue-500'>Edit</h1>

        <Edit
          size={20}
          onClick={goToUpdateLecture}
          className='cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' />
      </div>
    </div>
  )
}

export default Lecture
