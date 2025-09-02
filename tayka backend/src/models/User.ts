import mongoose, { Schema, Document } from 'mongoose';

export type UserType = Document & {
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    roles: string[];
    magicToken?: string;
    magicTokenExpiry?: number;
}

const UserSchema: Schema = new Schema<UserType>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: false, minlength: 6 },
    confirmPassword: { type: String, required: false, minlength: 6 },
    roles: [{
        type: String,
        enum: ['buyer', 'seller', 'distributor', 'admin'],
        default: []
    }],
    magicToken: { type: String, required: false },
    magicTokenExpiry: { type: Number, required: false }
});

const UserModel = mongoose.model<UserType>('User', UserSchema);

export default UserModel;


