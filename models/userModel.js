const mongoose =  require("mongoose");

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },
    
    Name: {
        type: String,
        required: true,
        trim: true
    },

    userName: {
        type: String,
        required: true,
        trim: true
    },

    pronouns: {
        type: String,
        required: false,
        trim: true
    },

    bio: {
        type: String,
        required: false,
        trim: true
    },

    gender: { type: String,
        enum: ['male', 'female', 'other'],
        required: true 
    },
   
    profilePicture: {
        type: String,
        required: false,
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    createdAt: Number,
    updatedAt: Number
},

    { timestamps: true });

const userModel = mongoose.model("user", userSchema)

module.exports = {userModel}
