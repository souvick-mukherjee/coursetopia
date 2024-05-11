import express,{Router} from 'express';
import {authenticateJWT} from '../middlewares/auth';
import { getUserProfile, userLogin, userSignup, showAllCourses, purchaseCourse, showPurchasedCourses } from '../controllers/user';

const router:Router=express.Router();

router.get('/:id',authenticateJWT, getUserProfile);

router.post('/login', userLogin);

router.post('/signup',userSignup);

router.get('/courses',authenticateJWT,showAllCourses);

router.put('/courses/:id',authenticateJWT,purchaseCourse);

router.get('/courses/:id',authenticateJWT,showPurchasedCourses);

export default router;