import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const validateToken = (req, res, next) => {
    const token = req.headers("accessToken");

    if(!token) return res.status(403).json({error: "User not logged in!"});

    try{
        const validToken = jwt.verify(token, process.env.AUTH_SECRET);
        if(validToken){
            return next();
        }
    } catch(err){
        return res.json( { error : err });
    }
} 

module.exports = { validateToken };