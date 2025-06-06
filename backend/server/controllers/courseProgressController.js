import { Course } from "../../modules/courseModel";
import { CourseProgress } from "../../modules/courseProgress";


export const getCourseProgress = async (req, res) => {
  try {
    const {courseId} = req.params;
    const userId = req.id;

    // step 1 fetch the user course progress
    let courseProgress = await CourseProgress.findOne({courseId, userId}).populate("courseId")
    
    const courseDetails = await Course.findById(courseId);

    if(!courseDetails) {
      return res.status(404).json({
        message: " Course not found"
      })
    }
    // step-2 if no progress found , return course details with an empty progres
    if(!courseProgress) {
      return res.status(200).json({
        data:{
          courseDetails,
          progress:[],
          completed:false
        }
      })
    }


    // Step-3 Return the user's course progress alog with course details
    return res.status(200).json({
      data:{
        courseDetails,
        progress:courseProgress.lectureProgress,
        completed:courseProgress.completed
      }
    })

  } catch (error) {
    console.log(error)
  }
}


export const updateLectureProgress = async (req,res) => {
  try {
  const {courseId, lectureId} = req.params;
  const userId = req.id;

  // fetch or create course progress
  let courseProgress = await CourseProgress.findOne({ courseId, userId });


  if(!courseProgress) {
   // if no progress exist , create a new record
   courseProgress = new CourseProgress({
    userId,
    courseId,
    completed:false,
    lectureProgress:[],
   })
  }
  // find the lecture progress in the course progress
  const lectureIndex = courseProgress.lectureProgress.findIndex(
    (lecture) => lecture.lectureId.toString() === lectureId
  );

  if(lectureIndex !== -1){
    // if lecture already exist , update its status
    courseProgress.lectureProgress[lectureIndex].viewed = true;
  } else {
    // add new lecture progress
    courseProgress.lectureProgress.push({
      lectureId, viewed:true,
    })
  }
// if all lecure is complete 

const viewedLectures = courseProgress.lectureProgress.filter((lecture) => lecture.viewed);


const course = await Course.findById(courseId);
if (course && viewedLectures.length === course.lectures.length) {
  courseProgress.completed = true;
}

await courseProgress.save(); 

return res.status(200).json({
  message: "Lecture progress update successFully"
})

  } catch (error) {
    console.error("Error updating lecture progress:", error);
    return res.status(500).json({
      error: "Something went wrong while updating lecture progress",
    });
  }
}



export const markAsCompleted = async (req, res) => {
  try {
    
    const {courseId} = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({courseId, userId});
    if(!courseProgress) {
      return res.status(404).json({message:"Course Progress not found"})
    }

    courseProgress.lectureProgress = courseProgress.lectureProgress.map((lecture) => ({
      ...lecture,
      viewed: true,
    }));

    courseProgress.completed = true;
    await courseProgress.save()
    return res.status(200).json({message:"Course marked as completed"})

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Something went wrong while marking course as completed" });
  }
}


export const markAsInCompleted = async (req, res) => {
  try {
  
    const {courseId} = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({courseId,userId})
    
    if(!courseProgress) {
      return res.status(404).json({
        message: "Course progress not found"
      })
    }

    courseProgress.completed = false;
    await courseProgress.save()

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Something went wrong while marking course as incomplete",
    });
  }
}