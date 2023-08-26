const mongoose =  require("mongoose");

const songSchema = new mongoose.Schema({
    songLink: {
        type: String,
        required: true,
        trim: true
    },

    useCount: {
        type: Number,
        required: true,
        trim: true
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

const songSchemaModel = mongoose.model("song", songSchema)


moudule.exports =  {songSchemaModel};
