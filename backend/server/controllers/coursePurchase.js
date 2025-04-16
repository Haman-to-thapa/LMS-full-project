import { Course } from "../../modules/courseModel.js";
import { Lecture } from "../../modules/lectureModels.js";
import { User } from "../../modules/userModel.js";
import { CoursePurchase } from "../../modules/purchaseCourseModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    // Check if courseId is provided
    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "Course ID is required" });
    }

    // Fetch course details from database
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Ensure course price is a valid number
    if (isNaN(course.coursePrice) || course.coursePrice <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid course price" });
    }

    // Create a new purchase record
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: course.courseThumbnail ? [course.courseThumbnail] : [],
            },
            unit_amount: course.coursePrice * 100, // Stripe expects price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`,
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Shipping only available in India for now
      },
    });

    // Check if session URL was successfully created
    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Save the purchase record with the payment ID from Stripe
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    console.log("Stripe checkout session URL:", session.url);

    return res.status(200).json({
      success: true,
      url: session.url, // Provide URL for frontend to redirect user to checkout
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const stripeWebhook = async (req, res) => {
  const payloadString = JSON.stringify(req.body, null, 2);
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify webhook signature
    const header = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle checkout session completed event
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object;

      // Retrieve the purchase from the database based on the payment ID
      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({
        path: "courseId",
      });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      // Update the amount and status of the purchase
      if (session.amount_total) {
        purchase.amount = session.amount_total / 100; // Convert cents to INR
      }

      purchase.status = "completed";

      // Update lectures to be free for preview
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update the user with the enrolled course
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourse: purchase.courseId._id } },
        { new: true }
      );

      // Update the course with the enrolled student
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

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.params;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      course,
      purchased: purchased ? true : false,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "getCourseDetailWithPurchaseStatus failed" });
  }
};


export const getAllPurchasedCourse = async (req,res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({status: "completed"}).populate('courseId');

    return res.status(200).json({
      purchasedCourse,
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server error"})
  }
}