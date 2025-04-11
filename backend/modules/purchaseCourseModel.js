import moogoose from 'mongoose'
const coursePurchaseSchema = new moogoose.Schema({
  courseId: {
    type:moogoose.Schema.Types.ObjectId,
    ref:"Course",
    required:true,
  },
  userId: {
    ref:"User",
    required:true,
  },
  amount: {
    type:Number,
    required:true,
  },
  status:{
    type:String,
    enum:["pending","completed","failed"],
    default:"pending",
  },
  paymentId:{
    type:String,
    required:true
  }
},{timestamps:true});


export const CoursePurchase = moogoose.model("CoursePurchase",coursePurchaseSchema)