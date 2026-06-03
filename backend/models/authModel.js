import db from "../config/db.js";

export const getUser = async (student_id) => {
    return await db
    .selectFrom('users')
    .selectAll()
    .where('student_id', '=', student_id)
    .executeTakeFirst();
}

export const resetPass = async (id, pass) => {
    return await db
    .updateTable("users")
    .set({
        password: pass,
    })
    .where("student_id", "=", id)
    .executeTakeFirst();
}