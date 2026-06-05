import express from "express";
import { getSemester, getStudentInfo, getStudentSubjects, getProgram, getGrades, createAppointment, getApp, getCurrentApp } from "../controllers/studentController.js";

const router = express.Router();

router.get("/info/:id", getStudentInfo)
router.get("/subjects/:id/:sem/:year", getStudentSubjects)
router.get("/semester", getSemester)
router.get("/program/:id", getProgram)
router.get("/grades/:id", getGrades)
router.get("/appointment/:id", getApp)
router.get("/appointment/current/:id", getCurrentApp)
router.post("/appointment", createAppointment)
export default router;