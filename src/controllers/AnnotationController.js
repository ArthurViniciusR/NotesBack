const Annotations = require('../models/AnnotationsData')

module.exports = {

    async read(request, response){
        const annotationList = await Annotations.find()

        return response.json(annotationList)
    },

    async create(request, response){
        const {title, notes, priority} = request.body

        if(!notes || !title){
            return response.status(400).json({
                error: "Preencha os campos corretamente!"
            })
        }

        const AnnotationCreated = await Annotations.create({
            title,
            notes,
            priority
        })

        return response.json(AnnotationCreated)
    },

    async delete(request, response){

        const { id } = request.params

        const AnnotationDeleted = await Annotations.findOneAndDelete({ _id : id })

        if(AnnotationDeleted){
            return response.json(AnnotationDeleted)
        } else {
            return response.status(401).json({
                error: "Nota não encontrada"
            })
        }
    }


}