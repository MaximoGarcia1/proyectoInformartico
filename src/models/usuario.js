const {model, Schema} = require("mongoose")

const UsuarioSchema = new Schema({
    nombre:{
        type: String, 
        required:true
    },
    correo:{
        type: String, 
        required:true, 
        unique:true
    },
    contraseña:{
        type: String, 
        required:true
    },
    cursos:[{
        type: Schema.Types.ObjectId,
        ref: 'Curso'
    }] 

    
})
module.exports = model('Usuario', UsuarioSchema)