const express = require('express')
const routes = express.Router()

const AnnotationController = require('./controllers/AnnotationController')
const PriorityController = require('./controllers/PriorityController')


routes.post('/annotations', AnnotationController.create)
routes.get('/annotations', AnnotationController.read)
routes.delete('/annotations/:id', AnnotationController.delete)
routes.post('/contents/:id', AnnotationController.update)

routes.get('/priorities', PriorityController.read)
routes.post('/priorities/:id', PriorityController.update)


module.exports = routes