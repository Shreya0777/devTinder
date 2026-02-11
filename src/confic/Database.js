const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://singhsshreya297_db_user:OILAUUaPf6r68QDA@namastedev.tdv64gy.mongodb.net/devTinderDB")
}

module.exports  = {connectDB}
