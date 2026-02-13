
import jwt from "jsonwebtoken"
import  dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'l5sodb_fidele'; 

export const generateToken = (userId , email)=>{


            const token = jwt.sign(
                { id: userId, email:email }, 
                JWT_SECRET, 
                { expiresIn: '1h' }
            );


            return token

}