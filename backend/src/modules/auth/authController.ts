import { Request, Response } from "express";
import { createUser, findUser, findUserById } from "../user/userService"
import { comparePassword } from "../../utils/bcrypt";
import { generateToken, verifyToken } from "../../utils/jwt";


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await findUser(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await comparePassword(password, user.password!);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = await generateToken({ id: user._id });
        
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
            secure: true,
            domain: process.env.HOST === "localhost" ?
                "localhost"
                : "chatmaid.onrender.com"

        });
        res.status(200).json({ message: "success", user: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const user = await findUser(email);
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await createUser(name, email, password);

        const token = await generateToken({
            id: newUser._id,
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
            secure: true,
            domain: process.env.HOST === "development" ? "localhost" : "chatmaid.onrender.com"
        });

        res.status(201).json({ message: "success", user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id } = await verifyToken(token);
        if(!id){
            return res.status(401).json({ message: "Unauthorized" })
        }
        // @ts-ignore
        const user = await findUserById(id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.status(200).json({ user: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: process.env.HOST === "localhost" ? "localhost" : "smstippers.onrender.com"
        });

        res.status(200).json({ message: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

