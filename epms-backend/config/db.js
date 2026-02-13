import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const  db= mysql2.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "EPMS"
})


// db.connect((err)=>{
//     if(err){
//         console.error("Failed to connect to database:", err.message);
//         console.error("Connection details:", {
//             host: process.env.DB_HOST,
//             port: process.env.DB_PORT,
//             user: process.env.DB_USER,
//             database: process.env.DB_NAME
//         });
//         return
//     }

//     console.log("Mysql database connected successfully.")
// })

export default db;