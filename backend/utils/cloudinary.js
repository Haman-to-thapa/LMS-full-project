import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config({})



cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
})


// uploadMedia to upload all file photo video

export const uploadMedia = async(file) => {
  try {
    
    const uploadResponse = await cloudinary.uploader.upload(file, {resource_type: "auto"})
  
    return uploadResponse;
  } catch (error) {
    console.log(error);
  }
}


// deleteUpload file photo

export const deleteMediaFromCloudinary = async(publicId) => {
  try {
   await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error)
  }
}

// deletUpload video files

export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    
    await cloudinary.uploader.destroy(publicId, {resource_type:"video"})

  } catch (error) {
    console.log(error)
  }
}