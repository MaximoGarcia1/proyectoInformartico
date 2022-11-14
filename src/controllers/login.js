const bcrypt =require('bcrypt')
const usuario = require('../models/usuario')
const Usuario = require('../models/usuario')
const jwt = require('jsonwebtoken')

const login = async (req,res)=>{
    const{correo, contraseña} = req.body 
    Usuario.findOne({correo}).then((usuario)=>{
        if(!usuario){
            return res.json({mensaje:'usuario no encontrado'})
        }
        bcrypt.compare(contraseña, usuario.contraseña).then((esCorrecta)=>{
            if(esCorrecta){
                const{id, nombre} = usuario
                
                const data = {
                    id,
                    nombre
                }

                const token = jwt.sign(data, 'secreto',{
                    expiresIn: 86400 /* 24hs */
                })
                
                res.json({mensaje:'Usuario logeado correctamente', usuario:{
                    id, 
                    nombre,
                    token
                }
            })
            } else{
                return res.json({mensaje:'contraseña incorrecta'})
            }
        })
    })

}

module.exports = login