import dotenv from 'dotenv';
dotenv.config();

 export const jwtSecret = process.env.JWT_SECRET;

 export const db_uri = process.env.REMOTE_DB_URL + process.env.REMOTE_DB; 
 