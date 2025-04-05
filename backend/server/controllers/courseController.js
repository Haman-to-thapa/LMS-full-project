import { Course } from "../../modules/courseModel.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../../utils/cloudinary.js";


export const createCourse = async (req, res) => {
  try {

    const { courseTitle, category} = req.body;
    if(!courseTitle || !category) {
      return res.status(404).json({message: "Course title and category are required"})
    }

    const course = await Course.create({courseTitle, category, creator: req.id})

    return res.status(201).json({
      course, message:"Course created"
    })
    
  } catch (error) {
    console.log(error)
    return  res.status(500).json({message:"Failed to create course"})
  }
}

export const  getCreatorAllCourse = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    const courses = await Course.find({creator: userId});
    if(!courses) {
      return res.status(401).json({courses:[], message:"No courses available"})
    }

    return res.status(201).json(courses)
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server Failed"})
  }
}

export const editCourse = async(req, res) => {
  try {
    const {courseTitle, subTitle, description, category, courseLevel, coursePrice} = req.body;
    const thumbnail = req.file;
    const courseId = req.params.courseId;

    let course = await Course.findById(courseId);
    if(!course) {
      return res.status(404).json({message:"course id not found"})
    }

    let courseThumbnail;
    if(thumbnail) {
    if(course.courseThumbnail) {
      const publicId = course.courseThumbnail.split('/').pop().split(".")[0];
      await deleteMediaFromCloudinary(publicId)
    }
    courseThumbnail = await uploadMedia(thumbnail.path)
    }

    // upload a thumbnail on cloudinary 

    // 
    const updateData =  {courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail:courseThumbnail?.secure_url }


  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"server error"})
  }
}