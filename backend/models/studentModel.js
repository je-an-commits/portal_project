import db from "../config/db.js";

export const getInfo = async (id) => {
    return await db
    .selectFrom('users')
    .select([
        "users.id",
    ])
    .innerJoin("student_info", "users.id", "student_info.student_id")
    .selectAll("student_info")
    .where('users.id', '=', id)
    .executeTakeFirst();
};

export const getSubjects = async (id, sem, year) => {
    return await db
    .selectFrom("student_subjects")
    .selectAll()
    .where('student_id', '=', id)
    .where('semester', '=', sem)
    .where('acad_year', '=', year)
    .execute();
};

export const getSem = async () => {
    return await db
    .selectFrom("school_semester")
    .selectAll()
    .where('status', '=', "ONGOING")
    .executeTakeFirst();
};

export const getProg = async (id) => {
    return await db
    .selectFrom("student_info")
    .select(["program"])
    .where('student_id', '=', id)
    .executeTakeFirst();
};

export const getGrade = async (id) => {
    const records = await db
    .selectFrom("student_subjects as ss")
    .leftJoin(
        "grades as g",
        (join) =>
        join
            .onRef("ss.student_id", "=", "g.student_id")
            .onRef("ss.sub_code", "=", "g.course_code")
    )
    .select([
        "ss.sub_code",
        "ss.sub_desc",
        "ss.units",
        "ss.semester",
        "ss.acad_year",
        "g.final_grade",
        "g.status",
    ])
    .where("ss.student_id", "=", id)
    .orderBy("ss.acad_year")
    .orderBy("ss.semester")
    .execute();

    return records;
};