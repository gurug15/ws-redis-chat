import express from 'express'
import authRoutes from './routes/auth.route'
import messageRoutes from "./routes/message.route"   
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config();

const PORT = process.env.PORT

const app = express();
app.use(cors(
    {
        origin: [process.env.FRONTEND_URL!,"http://localhost:5173"], // Frontend URL
        credentials: true, // Allow cookies
    }
))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)


app.listen(PORT,()=>{
    console.log("Listening on Port 5000")
})