import express from "express";
import { getSemester, getStudentInfo, getStudentSubjects, getProgram, getGrades } from "../controllers/studentController.js";

const router = express.Router();

router.get("/info/:id", getStudentInfo)
router.get("/subjects/:id/:sem/:year", getStudentSubjects)
router.get("/semester", getSemester)
router.get("/program/:id", getProgram)
router.get("/grades/:id", getGrades)
export default router;