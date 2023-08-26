const mongoose =  require("mongoose");

const postPictureSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
        trim: true
    },

    location: {
        type: String,
        required: false,
        trim: true
    },
    
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'song'
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

const postPictureModel = mongoose.model("postPicture", postPictureSchema)


module.exports =  {postPictureModel};
