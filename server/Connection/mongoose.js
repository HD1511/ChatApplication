const mongoose = require('mongoose');
require('dotenv').config();

const Mongo = async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("done..."))
        .catch((err) => console.log(err));
}

module.exports = Mongo;