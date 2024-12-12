import { Request, Response } from 'express'
import prisma from '../db/prisma'
import bcryptjs from 'bcryptjs'
import { generateToken } from '../utils/geenrateTokens'
import { Gender } from '@prisma/client'

export const login = async (req:Request,res:Response):Promise<any>=>{
    try {
        const {username,password} = req.body;
        const user = await prisma.user.findUnique({where:{username}})
        if(!user){
            return res.status(400).json({error:"Username does not Exists"})
        }
        const isPasswordCorrect = await bcryptjs.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({error:"Incorrect Password"})
        }
        generateToken(user.id,res)

        res.status(201).json({
            id: user.id,
            fullName: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
            gender: user.gender
        })

    } catch (error:any) {
        console.log("error in signup controllers", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }

}

export const signup =  async (req:Request,res:Response):Promise<any>=>{

    try {
        
    const {username,fullName, password,confirmPassword,gender} = req.body
    const user = await prisma.user.findUnique({where: {username}})
    
    if(user){
        return res.status(400).json({error: "Username already Exists"})
    }
    
    if(!username || !password || !confirmPassword || !gender || !fullName){
        return res.status(400).json({error:"Fill all the Fields"});
    }

    if(password !== confirmPassword){
        return res.status(400).json({error:"Password does not match"});
    }
     const salt = await bcryptjs.genSalt(10)
     const hashedPassword = await bcryptjs.hash(password,salt)  
     
     const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
     const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

     const newUser = await prisma.user.create({
        data:{
            username,
            fullname: fullName,
            password: hashedPassword,
            gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic
        }
     })

     if(newUser){
        generateToken(newUser.id,res);
        res.status(201).json({
            id: newUser.id,
            fullName: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,
            gender: newUser.gender
        })
     }else{
        return res.status(400).json({error:"invalid user Inputs"})
     }

    
    } catch (error:any) {
        console.log("error in Login controllers", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }


}

export const logout =  async (req:Request,res:Response)=>{
   try {
    res.cookie("jwt","",{maxAge:0});
    res.status(201).json({message: "logged out Succesfully"})
   } catch (error:any) {
    console.log("Error in LogOut Controller",error.message)
    res.status(500).json({error:"Internal Server Error"})
   }

}

export const  getMe = async (req: Request,res:Response):Promise<any>=>{
   try {
    const user = await prisma.user.findUnique({where:{id: req.user.id}})
    if(!user){
        return res.status(400).json({message:"User not Found"})
    }
    res.status(201).json({
        id: user.id,
        fullName: user.fullname,
        username: user.username,
        profilePic: user.profilePic,
        gender: user.gender
    })
   } catch (error:any) {
    console.log("Error in getMe method:",error.message)
    res.status(500).json({error:"Internal Server Error"})
   }
}

