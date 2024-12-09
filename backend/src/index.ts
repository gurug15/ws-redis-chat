import express from 'express'
import authRoutes from './routes/auth.route'
import messageRoutes from "./routes/message.route"   
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)


app.listen(5000,()=>{
    console.log("Listening on Port 5000")
})