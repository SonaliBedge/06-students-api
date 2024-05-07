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
  const {
    user: { userId },
    params: { id: studentId },
  } = req;

  const student = await Student.findOne({ _id: studentId, createdBy: userId });
  if (!student) {
    throw new NotFoundError(`No student with this id ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student });
  // res.send("get student detail");
};
const createStudent = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const student = await Student.create(req.body);
  res.status(StatusCodes.CREATED).json({ student });
};
const updateStudent = async (req, res) => {
  const {
    body: { SchoolName, Grade },
    user: { userId },
    params: { id: studentId },
  } = req;

  if (SchoolName === "" || Grade === "") {
    throw new BadRequestError("School Name or Grade fields cannot be empty");
  }
  const student = await Student.findByIdAndUpdate(
    { _id: studentId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!student) {
    throw new NotFoundError(`No student with this id ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student });
  // res.send("update student record");
};
const deleteStudent = async (req, res) => {
  // res.send("delete student record");
  const {
    user: { userId },
    params: { id: studentId },
  } = req;

  const student = await Student.findByIdAndRemove({
    _id: studentId,
    createdBy: userId,
  });
  if (!student) {
    throw new NotFoundError(`No student with this id ${studentId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
