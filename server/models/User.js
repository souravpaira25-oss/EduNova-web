const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,

    isVerified: {
        type: Boolean,
        default: false
    },

    verificationToken: {
        type: String,
        default: null
    },

    resetPasswordToken: {
        type: String,
        default: null
    },

    fcmToken: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);