import mongoose = require("mongoose");
import { hashPassword } from "../../utils/bcrypt";

const User = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    apiKey: {
        type: String,
        required: [true, 'apiKey is required']
    },
    promoCode: {
        type: String,
        required: [true, 'promoCode is required'],
        unique: true,
        min: 4,
        max: 8,
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    balance: {
        type: Number,
        default: 0
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    acceptedTerms: {
        type: Boolean,
        default: false
    },
    referrals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    verificationCode:{
        code:{
            type:String,
        },
        expiresAt:{
            type:Date,
        },
    }

}, {
    timestamps: true
});

// hash password before saving
User.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await hashPassword(user.password!);
    }
    next();
});

export default mongoose.model('User', User);