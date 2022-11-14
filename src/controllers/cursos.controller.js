const cursosCtrl = {}
const Usuario = require('../models/usuario')
const Curso = require('../models/Curso')

cursosCtrl.getCursos = async (req, res) => {
    const user = await Usuario.findById(req.params).populate('cursos')
    res.json(user)
}
 
cursosCtrl.createCursos = async (req, res) => {
    const { curso, division, materia } = req.body
    const user = await Usuario.findById(req.params)
    const newCurso = new Curso({
        curso,
        division,
        materia,
        author: user
    })
    await newCurso.save()
    user.cursos.push(newCurso)
    await user.save()
    res.json({ message: 'Curso guardado' })
}

cursosCtrl.getCurso = async (req, res) => {
    const cursoID = req.params._id2
    const userID = req.params._id1
    
    const usuario = await Usuario.findById(userID)
        .populate({ path: 'cursos', match: { _id: cursoID } })
    const curso = usuario.cursos
    
    res.json(curso)
}


cursosCtrl.deleteCurso = async (req, res) => {

    const cursoID = req.params._id2 
    const authorID = req.params._id1

    await Curso.findOneAndDelete({
        _id: cursoID,
        author: authorID
    })

    res.json({mensaje:'curso eliminado'})
}

module.exports = cursosCtrl