import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/featureSlice/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {

  const [lectureTitle, setLectureTitle] = useState("")

  const navigate = useNavigate()
  const param = useParams()
  const courseId = param.courseId;

  const [createLecture, { data, isSuccess, isLoading, error }] = useCreateLectureMutation()

  // const { data: lectureData, isLoading: lectureIsLoading, isError: lectureError } = useGetCourseLectureQuery()

  const { data: lectureData, isLoading: lectureIsLoading, isError: lectureError, refetch } = useGetCourseLectureQuery(courseId)


  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId })
  }

  console.log(lectureData)

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "lecture updated successfully")
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong")
    }
  }, [isSuccess, error, data])


  return (
    <div className="flex-1 mx-10 py-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="font-bold text-2xl text-gray-700">
          Let's Add a Lecture, add some basic details for your new Lecture
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          It typically includes engaging lectures, hands-on exercises, and real-world examples to enhance understanding.
        </p>
      </div>
      <div className="space-y-6 mt-4">
        <div className="">
          <Label>Title</Label>
          <Input type="text"
            name="lectureTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Course Name" />
        </div>

        <div className="flex items-center gap-x-5">
          <Button variant='outline' className='hover:bg-red-600 hover:text-white' onClick={() => navigate(`/admin/course/${courseId}`)} >Back to Course</Button>
          <Button
            onClick={createLectureHandler}
            className="hover:bg-blue-600 hover:text-white"
            disabled={isLoading}

          >
            {
              isLoading ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </> : "Create Lecture"
            }
          </Button>
        </div>
        <div className="">
          {
            lectureIsLoading ? (
              <p>Loading lecture...</p>
            ) : lectureError ? (
              <p>Failed to load lectures.</p>
            ) : lectureData.lectures.length === 0 ? (
              <p>No lectures available</p>
            ) : (
              lectureData.lectures.map((lecture, index) => (
                <>
                  <Lecture key={index || lecture?._id} index={index} lecture={lecture} />
                </>
              ))


            )
          }

        </div>
      </div>
    </div>
  )
}

export default CreateLecture
