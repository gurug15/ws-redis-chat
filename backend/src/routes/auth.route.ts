import express from 'express'
import { getMe, login, logout, signup } from '../controllers/authController'
import { protectedRoute } from '../middleware/protectedRoute'

const router = express.Router()

router.get("/me",protectedRoute ,getMe)

router.post("/login", login)

router.post("/signup", signup)

router.post("/logout",logout)





export default router