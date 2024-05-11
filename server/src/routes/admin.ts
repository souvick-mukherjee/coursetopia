import express, { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { adminLogin, adminSignup, addNewCourse, getAllCourses, courseDetails, editCourse, getAdminById } from '../controllers/admin';

const router: Router = express.Router();

router.get('/me', authenticateJWT, getAdminById);

router.post('/login', adminLogin);

router.post('/signup', adminSignup);

router.post('/courses/add', authenticateJWT, addNewCourse);

router.get('/courses', authenticateJWT, getAllCourses);

router.get('/courses/:id', authenticateJWT, courseDetails);

router.put('/courses/:id', authenticateJWT, editCourse);

export default router;
