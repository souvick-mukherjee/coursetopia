import mongoose, { Document, Model } from 'mongoose';

interface AdminAttrs {
  email: string;
  username: string;
  password: string;
}

interface AdminDoc extends Document {
  email: string;
  username: string;
  password: string;
}

interface AdminModel extends Model<AdminDoc> {}

const adminSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

const Admin = mongoose.model<AdminDoc, AdminModel>('Admin', adminSchema);

export default Admin;
