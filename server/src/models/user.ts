import mongoose, { Document, Model, Schema } from 'mongoose';
import { CourseDoc } from './course'; // Assuming CourseDoc is the type for Course document

interface UserAttrs {
  username: string;
  password: string;
  email: string;
  purchasedCourses: Array<CourseDoc['_id']>;
}

interface UserDoc extends Document {
  username: string;
  password: string;
  email: string;
  purchasedCourses: Array<CourseDoc['_id']>;
}

interface UserModel extends Model<UserDoc> {}

const userSchema = new Schema<UserDoc>({
  username: String,
  password: String,
  email: String,
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, UserDoc };
