import Stripe from 'stripe';
import { Course } from '../../modules/courseModel.js';
import { CoursePurchase } from '../../modules/purchaseCourseModel.js';
import { Lecture } from '../../modules/lectureModels.js';
import { User } from '../../modules/userModel.js';


const stripe = new Stripe(process.env.STRIFPE_SECRET_KEY);

export const createCheckoutSession = async(req, res) => {
  try {
    const userId = req.id;
    const {courseId} = req.body;

    const course = await Course.findById(courseId);
    if(!course) {
      return res.status(404).json({
        success:false,
        message:"Course not found"
      })
    }

    // Create a new course puchase record
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount:course.coursePrice,
      status:"pending"
    })


    // Create a Stripe checkout session 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items : [
        {
          price_data: {
            currency:"inr",
            product_data: {
              name: course.courseTitle,
              images: course.courseThumbnail ? [course.courseThumbnail] : [],

            },
            unit_amount:course.coursePrice * 100,
          },
          quantity:1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/course-progress/${courseId}`,
      cancel_url: `${process.env.FRONTEND_URL}/course-details/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
        },
        shipping_address_collection: {
          allowed_countries:["IN"],
        },
    });
    if(!session.url) {
      return res
      .status(400).json({success:false, message:"Error while creating session"})
    }

    // save the purchase record
    newPurchase.paymentId = session.id;
    await newPurchase.save();
    
    return res.status(200).json({
      success:true,
      url:session.url,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Server Error"})
  }
};


export const stripeWebhook = async (req, res) => {
  const payloadString = JSON.stringify(req.body, null, 2);
  const secret = process.env.WEBHOOK_SECRET;

  let event;

  try {
    const header = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentIntentId: session.id, // <- Make sure this field matches in DB
      }).populate({ path: "courseId" });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }

      purchase.status = "completed";

      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update user enrolled courses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourse: purchase.courseId._id } },
        { new: true }
      );

      // Update course with enrolled student
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );

      return res.status(200).send("Webhook handled successfully");
    } catch (error) {
      console.error("Error handling the event:", error.message);
      return res.status(500).send(`Error handling event: ${error.message}`);
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
    return res.status(200).send("Event received, but not handled");
  }
};
