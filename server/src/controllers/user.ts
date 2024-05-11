import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {Course} from '../models/course';
import { User,  UserDoc } from '../models/user';

async function getUserProfile(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
}

async function userLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        res.status(403).send('User does not exist');
        return;
    }
    const token = jwt.sign({ email, role: 'user' }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ message: 'User logged in successfully', token });
}

async function userSignup(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(403).send('User already exists');
        return;
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    const token = jwt.sign({ email, role: 'user' }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
}

async function showAllCourses(req: Request, res: Response): Promise<void> {
    const courses = await Course.find({});
    res.json(courses);
}

async function purchaseCourse(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
        res.status(404).send('Course does not exist');
        return;
    }
    const user = req.user as UserDoc | undefined;
    if (!user) {
        res.status(404).send('User does not exist');
        return;
    }
    user.purchasedCourses.push(course);
    await user.save();
    res.json({ message: 'Course purchased successfully', course: course.name });
}

async function showPurchasedCourses(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await User.findById(id).populate('purchasedCourses');
    if (!user) {
        res.status(404).send('User does not exist');
        return;
    }
    res.json({ purchasedCourses: user.purchasedCourses || [] });
}

export {
    getUserProfile,
    userLogin,
    userSignup,
    showAllCourses,
    purchaseCourse,
    showPurchasedCourses
};
