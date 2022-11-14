const {model, Schema} = require("mongoose")

const StudentSchema = new Schema({
    nombre:{
        type: String, 
        required:true
    },
    correo:{
        type: String, 
        required:true, 
    },
    curso:{
        type: Schema.Types.ObjectId,
        ref: 'Curso'
    },
    faltas:{
        type: Number
    },
    estado:{
        type: String
    }
})
module.exports = model('Estudiante', StudentSchema)