import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import prisma from "../db/prisma";


interface DecodeType extends JwtPayload {
    userId: string
}

declare global {
    namespace Express {
        export interface Request{
            user:{
                id: string
            }
        }
    }
}

export const protectedRoute = async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(400).json({error:"Token Not Found"})
        }

        const decoded: DecodeType= jwt.verify(token,process.env.JWT_SECRET!) as DecodeType

        if(!decoded){
          return res.status(400).json({error:"invalid Token"})
        }

        const user = await prisma.user.findUnique({
            where:{
                id:decoded.userId
            },
            select:{
                id:true,
                username:true,
                fullname: true,
                profilePic: true
            }
        })

        if(!user) {
            return res.status(400).json({error:"user not found"})
        }

        req.user = user
        next()
    } catch (error:any) {
        console.log("error in protected route: ", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}