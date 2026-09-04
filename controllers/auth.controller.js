import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res, next) => {
    // Implementación de la lógica de registro de usuario.
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Crear un nuevo usuario
        const { name, email, password } = req.body;

        // Varificar si el usuario existe
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el usuario
        const newUser = await User.create([{ name, email, password: hashedPassword }], { session });

        const token = jwt.sign({ userId: newUser[0]._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                users: newUser[0],
            }
        });
    } catch (error){
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    // Implementación de la lógica de inicio de sesión.
    try {
        const { email, password } = req.body;
        const user = await User.findOne( { email });

        // Varificar si el usuario existe
        if (!user) {
            const error = new Error('User Not Found');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid){
            const error = new Error('Invalid Password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN});

        res.status(201).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user,
            }
        });
    } catch (error){
        next(error);
    }
};

export const signOut = async (req, res) => {
    // Implementación de la lógica de cierre de sesión.
};