const mongoose =  require("mongoose");

const likeSchema = new mongoose.Schema({
    likes: {
        type: Number,
        required: true,
        default: 0
    },

    likeBy: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'user'
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'post'
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

const likeModel = mongoose.model("like", likeSchema)


module.exports =  {likeModel};
