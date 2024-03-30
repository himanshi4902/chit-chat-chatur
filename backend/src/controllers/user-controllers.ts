import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/token-manager.js";
import { hash,compare } from "bcrypt";

export const getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
    try{
        const users = await User.find();
        return response.status(200).json({message: "ok",users});
    }
    catch(error){
        console.log(error);
        return response.status(200).json({message: "ERROR",cause: error.message});
    }
};

export const userSignup = async (request: Request, response: Response, next: NextFunction) => {
    const {name,email,password} = request.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        return response.status(401).json({message: "User already exists"});
    }
    const hashedPassword = await hash(password,10);
    const user = new User({name,email,password:hashedPassword});
    await user.save();
    try{
        const users = await User.find();
        return response.status(201).json({message: "ok",id : user._id.toString()});
    }
    catch(error){
        console.log(error);
        return response.status(200).json({message: "ERROR",cause: error.message});
    }
};

export const userLogin = async (request: Request, response: Response, next: NextFunction) => {
    const {email,password} = request.body;
    try{
    const existingUser = await User.findOne({email});
    if(!existingUser) {
        return response.status(401).json({message: "User does not exist"});
    }
    const isPasswordCorrect = await compare(password,existingUser.password);
    if(!isPasswordCorrect){
        return response.status(403).json({message: "Incorrect password"});
    }
    // function in the code means that the "auth-token" cookie will be removed from the client's browser when the HTTP response is sent.
    response.clearCookie("auth-token",{path: "/",domain: "localhost",httpOnly: true,signed:true});
    
    const token = generateToken(existingUser._id.toString(),existingUser.email,"7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    //we want to send the cookie from backend to frontend for that we will the cookie parser
    response.cookie("auth-token",token,{path: "/",domain: "localhost",expires,httpOnly: true,signed:true});

    return response.status(201).json({message: "ok",id : existingUser._id.toString()});
    }catch(error){
        console.log(error);
        return response.status(200).json({message: "ERROR",cause: error.message});
    }
};
