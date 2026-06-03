import * as StudentModel from "../models/studentModel.js";

export const getStudentInfo = async (req, res) => {
    const id  = req.params.id;
    const user = await StudentModel.getInfo(id);

    if(!user) {
        return res.status(404).json({ error: "User not found!" }); 
    }
    return res.status(200).json({
        message: "User found!",
        user
    });
};

export const getStudentSubjects = async (req, res) => {
    const { id, sem, year }  = req.params;
    const subjects = await StudentModel.getSubjects(id, sem, year);

    if(!subjects){
         return res.status(404).json({ error: "Subjects not found!" });
    }
    return res.status(200).json({
        message: "Subjects found!",
        subjects
    });
};

export const getSemester = async (req, res) => {
    const semesters = await StudentModel.getSem();
    if(!semesters){
        return res.status(404).json({ error: "No active semester!" });
    }
    return res.status(200).json({
        message: "Semester found!",
        semesters
    });
}

export const getProgram = async (req, res) => {
    const id = req.params.id;
    const prog = await StudentModel.getProg(id);
    if(!prog){
        return res.status(404).json({ error: "Not found!" });
    }
    return res.status(200).json({
        prog
    });
}

export const getGrades = async (req, res) => {
    const id = req.params.id;
    const grades = await StudentModel.getGrade(id);
    if(!grades){
        return res.status(404).json({ error: "No grades found!" });
    }
    return res.status(200).json({
        grades
    });
}