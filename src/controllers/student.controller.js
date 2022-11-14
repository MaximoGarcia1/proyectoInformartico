const StudentCtrl = {}
const Usuario = require('../models/usuario')
const Curso = require('../models/Curso')
const Student = require('../models/Estudiante')
const { findById } = require('../models/Estudiante')

StudentCtrl.getStudents = async (req, res) => {
    const user = await Curso.findById(req.params).populate('students')
    res.json(user.students)
}

StudentCtrl.getStudent = async (req, res) => {
    const studentID = req.params
    const estudiante = await Student.findById(studentID)
    res.json(estudiante)
}

StudentCtrl.updateStudent = async (req, res) => {
    const {estado, faltas}=req.body 
    await Student.findByIdAndUpdate(req.params,{
        estado,
        faltas
    })
    
    res.json({mensaje:'actualizado'})
}

StudentCtrl.createStudent = async (req, res) => {
    const { nombre, correo, estado, faltas } = req.body
    const user = await Usuario.findById(req.params._id1)
    const cursos = await Curso.findById(req.params._id2)

    const newStudent = new Student({
        nombre,
        correo,
        curso: cursos,
        estado,
        faltas

    })
    await newStudent.save()
    cursos.students.push(newStudent)
    await cursos.save()
    await user.save()
    res.json({ message: 'Estudiante guardado' })
}

StudentCtrl.deleteStudent = async (req, res) => {

    const cursoID = req.params._id2
    const studentID = req.params._id1

    await Student.findOneAndDelete({
        _id: studentID,
        curso: cursoID
    })

    res.json({ mensaje: 'Estudiante eliminado' })
}

module.exports = StudentCtrl