import { User } from "../../modules/userModel.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
      return res.status(400).json({success:false, message:"All field are required."})
    }

    const user = await User.findOne({email});
    if(user) {
      return res.status(400).json({success:false,message:"User already exist with this email"})
    }

    // password secure 
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password : hashPassword});
      return res.status(201).json({success:true, message:"Account create successfully"})

  } catch (error) {
   console.error(error)
   res.status(500).json({success:false,message:"failed to register"})
  }
}

export const login = async(req, res) => {

  try {
  
    const {email, password} = req.body;

    if(!email || !password) {
     return res.status(404).json({success:false, message:"All field are required"})
    }
    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({ success: false, message: "Incorrect email" });

    } 

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch) {
      return res.status(400).json({success:false, message:"Incorrect password"})
    }

    // generateToken link with another component
    return generateToken(res, user, `Welcome back ${user.name}`);

    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Server Error"})
  }
}

export const logout = async(_, res) => {
  try {
    
    return res.status(200).cookie("token", "", {maxAge:0}.json({
      message: "Logged out sucessfully",
      success:true
    }))

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"failed to logout"
    })
  }
}


export const getUserProfile = async(req, res) => {
  try {
    //req from middleware
    const userId = req.id;

    const user = await User.findById(userId).select("-password");

    if(!user) {
      return res.status(401).json({success:false, message:"Profile not found"})
    }
    return res.status(200).json({success:true, user})

  } catch (error) {
    console.log(error)
    return res.status(500).json({success:true, message:"Server Error"})
  }
}



export const updateProfile = async (req, res) => {

  try {
    const userId = req.id;
    const {name} = req.body;
    // this comming from mongodb
    const profilePhoto = req.file;
    
    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({success:false, message:"User not found"})
    }



    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Failed to update profile"
    })
  }
}