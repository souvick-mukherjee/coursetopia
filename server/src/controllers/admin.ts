import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Admin from '../models/admin';
import {Course} from '../models/course';

async function getAdminById(req: Request, res: Response): Promise<void> {
    const admin = await Admin.findOne({ username: req.user?.username });
    if (!admin) {
        res.status(403).send('Admin does not exist');
        return;
    }
    res.json({ username: admin.username });
}

async function adminLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
        res.status(403).send('Admin does not exist');
    } else {
        const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ message: 'Admin logged in successfully', token });
    }
}

async function adminSignup(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email, password });
    if (existingAdmin) {
        res.status(403).send('Admin already exists');
    } else {
        const newAdmin = new Admin({ username, email, password });
        await newAdmin.save();
        const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
}

async function addNewCourse(req: Request, res: Response): Promise<void> {
    const { name, description, price, imageLink } = req.body;
    const newCourse = new Course({ name, description, price, imageLink });
    await newCourse.save();
    res.json({ message: 'Course added successfully', name: newCourse.name, description: newCourse.description, price: newCourse.price });
}

async function getAllCourses(req: Request, res: Response): Promise<void> {
    const courses = await Course.find({});
    res.json(courses);
}

async function courseDetails(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const course = await Course.findById(id);
    res.json(course);
}

async function editCourse(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!course) {
        res.status(404).send('Course does not exist');
        return;
    }
    res.json({ message: 'Course updated successfully', name: course.name, description: course.description, price: course.price });
}

export {
    getAdminById,
    adminLogin,
    adminSignup,
    addNewCourse,
    getAllCourses,
    courseDetails,
    editCourse
};
