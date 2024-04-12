const mongoose = require('mongoose')

const AnnotationsDataScheema = new mongoose.Schema({
    title: String,
    notes: String,
    priority: Boolean,
})

module.exports = mongoose.model('Annotations', AnnotationsDataScheema)