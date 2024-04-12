const express = require('express')
const routes = express.Router()

const AnnotationController = require('./controllers/AnnotationController')
const PriorityController = require('./controllers/PriorityController')
const ContentController = require('./controllers/ContentController')

routes.post('/annotations', AnnotationController.create)
routes.get('/annotations', AnnotationController.read)
routes.delete('/annotations/:id', AnnotationController.delete)

routes.get('/priorities', PriorityController.read)
routes.post('/priorities/:id', PriorityController.update)

routes.post('/contents/:id', ContentController.update)

module.exports = routes