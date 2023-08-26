
require('dotenv').config()
const mongoose = require('mongoose');

module.exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
        console.log('connected Successfully');
    } catch (err) {
        console.log(err);
    }
}
