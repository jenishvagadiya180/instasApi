const mongoose =  require("mongoose");

const shareSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'post'
    },

    shareCount: {
        type: Number,
        required: true,
        default: 0
    },
    
    shareTo: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'user'
    },

    shareBy: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'user'
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

const shareModel = mongoose.model("share", shareSchema)

module.exports =  {shareModel};
