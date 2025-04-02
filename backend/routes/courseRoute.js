
import express from 'express'
import isAuthenticated from '../server/middleware/isAuthenticated.js';
import { createCourse } from '../server/controllers/courseController.js';

const router = express.Router();

router.route('/').post(isAuthenticated, createCourse)

export default router;