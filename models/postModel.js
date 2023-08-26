const mongoose =  require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    mentions: {
        type: [String],
        required: false,
        trim: true
    },
    
    postPictureId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'postPicture'
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

const postModel = mongoose.model("post", postSchema)


module.exports = {postModel};
