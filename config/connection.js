

const mongoose = require('mongoose');

module.exports.dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://jenishVagadiya:jenishVagadiya@cluster0.1e6dc4l.mongodb.net/instaData");
        console.log('connected Successfully');
    } catch (err) {
        console.log(err);
    }
}
