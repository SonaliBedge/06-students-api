const express = require('express')
const router = express.Router()

const {
    getAllTeachers,
    getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
} = require('../controllers/teachers')

router.route('/').post(createTeacher).get(getAllTeachers)
router.route('/:id').get(getTeacher).delete(deleteTeacher).patch(updateTeacher)

module.exports = router