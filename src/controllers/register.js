const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario')

const register = async (req,res)=>{
    const{nombre, correo, contraseña} = req.body

    Usuario.findOne({correo}).then((usuario)=>{
        if(usuario){
            return res.json({mensaje:'ya existe un usuario con ese correo'})
        }else if(!nombre || !correo || !contraseña){
            return res.json({mensaje: 'falta algun dato'})
        }else{
            bcrypt.hash(contraseña, 10, (error, contraseñaHasheada)=>{
                if(error) res.json({error})
                else{
                    const nuevoUsuario = new Usuario({
                        nombre, 
                        correo,
                        contraseña: contraseñaHasheada
                    })

                    nuevoUsuario.save().then((usuario)=>{
                        res.json({mensaje:'usuario creado correctamente', usuario})
                    })
                    .catch(error=>console.error(error))
                }
            })
        }

    })
}

module.exports = register