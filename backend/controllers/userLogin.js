import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as AuthModel from "../models/authModel.js";

dotenv.config();

export const resetPassword = async (req, res) => {
    try{
        const { student_id, password, newPassword } = req.body;
        const user = await AuthModel.getUser(student_id);
        
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: "Current password doesn't match!" });
        }
        const newPass = await bcrypt.hash(newPassword, 10);
        const reset = await AuthModel.resetPass(student_id, newPass);

        if(!reset){
            return res.status(500).json({ error: "Something went wrong, please try again!" });
        }
        return res.status(201).json({ message: "Reset Password Successful!"})
    }catch(error){
        console.error("Login route error:", error);
        return res.status(500).json({ error: "Internal server error" });

    }
}

export const userLogin = async (req, res) => {
    try {
        const { student_id, password } = req.body;
        const user = await AuthModel.getUser(student_id);


        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials!" }); 
        }

  
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: "Invalid Credentials!" });
        }


        const accessToken = jwt.sign(
            { student_id: user.student_id, id: user.id }, 
            process.env.AUTH_SECRET,
            { expiresIn: '1h' } 
        );

        return res.status(200).json({ 
            message: "User login success!", 
            accessToken,
            user: {
                id: user.id,
                student_id: user.student_id,
                last_name: user.last_name,
                first_name: user.first_name,
            }
        });

    } catch (error) {
        console.error("Login route error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
