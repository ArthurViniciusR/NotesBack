const mongoose = require("mongoose")

const dbConfig = "mongodb+srv://devartthur:4002v@cluster0.ybbjxcx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connection = mongoose.connect(dbConfig)

module.exports = connection;