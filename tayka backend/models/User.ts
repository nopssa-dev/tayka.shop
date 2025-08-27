import mongoose, { Schema } from 'mongoose';


export type UserType = Document &  {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles:[];
}

const UserSchema : Schema = new Schema<UserType>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true , lowercase: true, trim: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  roles: { type: [String] },
})

const UserModel = mongoose.model<UserType>('User', UserSchema);

export default UserModel;