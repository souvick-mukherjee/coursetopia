import mongoose, { Document, Model } from 'mongoose';

interface CourseAttrs {
  name: string;
  description: string;
  price: number;
  imageLink: string;
}

interface CourseDoc extends Document {
  name: string;
  description: string;
  price: number;
  imageLink: string;
}

interface CourseModel extends Model<CourseDoc> {}

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageLink: String,
});

const Course = mongoose.model<CourseDoc, CourseModel>('Course', courseSchema);

export {Course, CourseDoc};
