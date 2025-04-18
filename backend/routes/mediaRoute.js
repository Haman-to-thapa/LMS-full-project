import express from 'express'
import upload from '../utils/multer.js'
import { uploadMedia } from '../utils/cloudinary.js'

const router = express.Router();

router.route('/upload-video').post(upload.single("file"), async(req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
         message: "No file provided" });
    }

    const result = await uploadMedia(req.file.path);

    return res.status(200).json({
      success: true,
      message: "File Upload successfully",
      data: result,
      url: result?.secure_url 
    });
    
    
    
  } catch (error) {
    console.log("UPLOAD ERROR", error.response?.data || error.message || error)

    return res.status(500).json({message:"Server Ereror"})
  }
})


export default router;