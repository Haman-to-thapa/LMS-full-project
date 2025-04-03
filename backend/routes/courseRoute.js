
import express from 'express'
import isAuthenticated from '../server/middleware/isAuthenticated.js';
import { createCourse, getCreatorAllCourse } from '../server/controllers/courseController.js';

const router = express.Router();

router.route('/').post(isAuthenticated, createCourse)
router.route('/').get(isAuthenticated,getCreatorAllCourse)

export default router;