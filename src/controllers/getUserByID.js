const Usuario = require('../models/usuario')

const getUserByID = async (req,res)=>{
    const {id} = req.user

    if(id.length === 24){
        Usuario.findById(id).then((usuario)=>{
            if(!usuario){
                return res.json({mensaje:'usuario no encontrado'})
            }else{
                const {_id,contraseña,__v,...resto } = usuario._doc
                res.json(resto)
            }
        })
    } else{
        res.json({mensaje:'estas enviando una contraseña incorrecta'})
    }
}

module.exports = getUserByID