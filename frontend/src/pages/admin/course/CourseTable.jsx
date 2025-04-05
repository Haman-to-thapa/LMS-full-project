import { Button } from '@/components/ui/button'
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import { useGetCeatorCourseQuery } from '@/featureSlice/api/courseApi'
import { Edit } from 'lucide-react'
import { Badge } from '@/components/ui/badge'


const CourseTable = () => {

  const { data, isLoading } = useGetCeatorCourseQuery()
  const navigate = useNavigate()

  if (isLoading) return <h1>Loading...</h1>

  console.log(data);


  return (
    <div>
      <Button onClick={() => navigate('create')}>
        Create New Course
      </Button>

      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data.map((course) => (
              <TableRow key={course._id}>

                <TableCell>{data?.coursePrice || "NA"}</TableCell>
                <TableCell> <Badge>{course.isPublished ? "Published" : "Draft"}</Badge></TableCell>

                <TableCell >{course.
                  courseTitle}</TableCell>
                <TableCell className="text-right">
                  <Button size='sm' variant="ghost"
                    onClick={() => navigate(`${course._id}`)}
                  ><Edit /></Button>
                </TableCell>
              </TableRow>


            ))
          }
        </TableBody>
      </Table>

    </div>
  )
}

export default CourseTable