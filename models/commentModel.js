const mongoose =  require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'post'
    },
    
    comment: {
        type: String,
        required: true,
        trim: true
    },

    commentBy: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'user'
    },

    commentLikes: {
        type: Number,
        required: true,
        default: 0
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

const commentModel = mongoose.model("comment", commentSchema)


module.exports =  {commentModel};
