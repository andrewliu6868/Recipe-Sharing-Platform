// model for users
import mongoose from "mongoose";

// define the schema
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    savedReceipes: [{type: mongoose.Schema.Types.ObjectId, ref:"recipes"}] // ref refers to some table
});

// define "users" as the name of the table for UserSchema
export const UserModel = mongoose.model("users", UserSchema)