const Teacher = require("../models/Teacher");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTeachers = async (req, res) => {
  const teachers = await Teacher.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ teachers, count: teachers.length });
};
const getTeacher = async (req, res) => {
  res.send("get teacher detail");
};
const createTeacher = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const teacher = await Teacher.create(req.body);
  res.status(StatusCodes.CREATED).json({ teacher });
};
const updateTeacher = async (req, res) => {
  res.send("update teacher record");
};
const deleteTeacher = async (req, res) => {
  res.send("delete teacher record");
};

module.exports = {
  getAllTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
