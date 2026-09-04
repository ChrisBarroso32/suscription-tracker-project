import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es necesario.'],
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Es necesaerio tener un email.'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Ingrese un correo valido"], // example@email.com
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, { timestaps: true });

const User = mongoose.model("User", userSchema);

export default User;