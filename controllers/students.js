const Student = require("../models/Student");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllStudents = async (req, res) => {
  const students = await Student.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ students, count: students.length });
};
const getStudent = async (req, res) => {
  res.send("get student detail");
};
const createStudent = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const student = await Student.create(req.body);
  res.status(StatusCodes.CREATED).json({ student });
};
const updateStudent = async (req, res) => {
  res.send("update student record");
};
const deleteStudent = async (req, res) => {
  res.send("delete student record");
};

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
