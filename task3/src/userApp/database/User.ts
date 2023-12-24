import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    email: string;
    age: number;
}

const userSchema: Schema<UserDocument> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        validate: {
            validator: function (email: string): boolean {
                const re = /^[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+(?:.[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
                return re.test(email);
            },
            message: (): string => 'Please fill a valid email address',
        },
        match: [/^[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+(?:.[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'Please fill a valid email address']
    },
    age: {
        type: Number,
        validate: {
            validator: function (value: number): boolean {
                return value > 0;
            },
            message: (): string => "Please enter a valid age",
        },
    },
});


export const User = mongoose.model<UserDocument>('User', userSchema);