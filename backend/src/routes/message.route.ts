import express from 'express'
import { getMessages, getUserForSideBar, sendMessage } from '../controllers/messageController'
import { protectedRoute } from '../middleware/protectedRoute'


const router = express.Router()

router.post("/send/:id",protectedRoute,sendMessage)
router.get("/conversations",protectedRoute,getUserForSideBar)
router.get("/:id",protectedRoute,getMessages)



export default router