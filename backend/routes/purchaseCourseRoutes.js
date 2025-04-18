import express from 'express'
import isAuthenticated from '../server/middleware/isAuthenticated.js';
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from '../server/controllers/coursePurchase.js';

const router = express.Router();

router.route('/checkout/create-checkout-session').post(isAuthenticated, createCheckoutSession);
router.route('/webhook').post(
  express.raw({ type: 'application/json' }), 
  stripeWebhook
);
router.route('/course/:courseId/details-with-status').get(getCourseDetailWithPurchaseStatus);



router.route('/').get(getAllPurchasedCourse)


export default router;