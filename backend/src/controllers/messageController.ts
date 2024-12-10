import { Request, Response } from "express";
import prisma from "../db/prisma";



export const sendMessage = async (req:Request,res:Response):Promise<any>=>{
   try {
     const {message} = req.body
     const {id:receiverId} = req.params
     const senderId = req.user.id

     let conversatoin = await prisma.conversation.findFirst({
        where:{
            participantsId: {
                hasEvery: [senderId,receiverId]
            }
        }
     })

     if(!conversatoin){
        conversatoin = await prisma.conversation.create({
            data:{
                participantsId: {
                    set: [senderId,receiverId]
                }
            }
        })
     }

     const newMessage = await prisma.message.create({
        data:{
            body: message,
            conversationId: conversatoin.id,
            senderId: senderId
        }
     })

     if(newMessage){
        conversatoin = await prisma.conversation.update({
            where: {
                id: conversatoin.id
            },
            data: {
                messages:{
                    connect:{
                        id: newMessage.id
                    }
                }
            }
        })
     }

     
    return res.status(200).json(newMessage)
    
   } catch (error:any) {
    console.log("error in sendMessage: ",error.message)
    res.status(400).json({error:"Internal server Error"})
   }

}


export const getMessages = async (req:Request,res:Response):Promise<any>=>{
   try {
    const {id:userToChatId} = req.params
    const senderId = req.user.id

    const conversation = await prisma.conversation.findFirst({
        where:{
            participantsId:{
                hasEvery: [ senderId, userToChatId]
            }
        },
        include:{
            messages:{
                orderBy:{
                    createdAt: "asc"
                }
            }
        }
    })

    if(!conversation){
        return res.status(200).json({messages:[]})
    }
     
    return res.status(200).json({messages: conversation?.messages})
    
   } catch (error:any) {
    console.log("error in sendMessage: ",error.message)
    res.status(400).json({error:"Internal server Error"})
   }
}


export const getUserForSideBar = async (req: Request,res:Response):Promise<any>=>{
    try {
        const senderId = req.user.id
        
        const users = await prisma.user.findMany({
            where:{
                id: {
                    not: senderId
                }
            },
            select:{
                id: true,
                fullname: true,
                profilePic: true
            }
        })

        if(!users){
           return res.status(200).json({message:"NO Other Users"})
        }

        res.status(200).json(users)

    } catch (error:any) {
        console.log("error in sendMessage: ",error.message)
        res.status(400).json({error:"Internal server Error"})
    }

}