import express from 'express'
import isAuthenticated from '../server/middleware/isAuthenticated.js';
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from '../server/controllers/coursePurchase.js';

const router = express.Router();

// Test route to check authentication
router.route('/auth-test').get(isAuthenticated, (req, res) => {
  return res.status(200).json({ success: true, message: "Authentication successful", userId: req.id });
});

router.route('/checkout/create-checkout-session').post(isAuthenticated, createCheckoutSession);
router.route('/webhook').post(
  express.raw({ type: 'application/json' }),
  stripeWebhook
);
router.route('/course/:courseId/details-with-status').get(getCourseDetailWithPurchaseStatus);



router.route('/').get(getAllPurchasedCourse)


export default router;