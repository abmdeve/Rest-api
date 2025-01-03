import { Document, Schema, model } from 'mongoose';

//Interface user

export interface User extends Document {
    name : string,
    email : string,
    password : string,
    authentification : {
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024
        },
        salt : {
            type: String,
            select: false
        },
        sessionToken : {
            type: String,
            select: false
        }
    }
}

//schema for user

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
  authentification: {
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    salt : {
        type: String,
        select: true
    },

    sessionToken : {
        type: String,
        select: false
    }
  },
});

//model for user

export const UserModel = model<User>("User", userSchema);

export const getUsers = () => UserModel.find()
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentification.sessionToken': sessionToken
})
export const getUserById = (id: number) => UserModel.findOne({ id })

export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject())
export const deleteUSerById = (id: string) => UserModel.findByIdAndDelete({ _id: id })
export const updateUserByID = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)

