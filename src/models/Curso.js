const{ Schema, model }=require('mongoose') 

const cursoSchema = new Schema({
    curso: String,
    division: String,
    materia: String,
    students:[{
        type:Schema.Types.ObjectId,
        ref:'Estudiante'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Curso',cursoSchema) 