
import express from 'express'
import isAuthenticated from '../server/middleware/isAuthenticated.js';
import { createCourse, editCourse, getCourseById, getCreatorAllCourse } from '../server/controllers/courseController.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.route('/').post(isAuthenticated, createCourse)
router.route('/').get(isAuthenticated,getCreatorAllCourse)
router.route('/:courseId').put(isAuthenticated,upload.single("courseThumbnail"),editCourse)
router.route('/:courseId').get(isAuthenticated,getCourseById);

export default router;