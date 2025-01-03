import { createUser, getUserByEmail, User } from "../db/users"
import { authentification, random } from "../helpers"
import { Request, Response, NextFunction } from 'express'
import { hash , compare } from 'bcrypt'

//Function to Login in existing account
export const Login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Please provide email and password' });
            return;
        }
        const hased = await hash(password, 10)
        // Fetch user with authentication details
        const user = await getUserByEmail(email).select('+authentification.salt +authentification.password');

        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Validate password
        const hashedPassword = authentification(user.authentification.salt, password);

        if (user.authentification.password !== hashedPassword) {
            res.status(403).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate session token
        const salt = random();
        user.authentification.sessionToken = authentification(salt, user._id.toString());
        await user.save();

        // Set session cookie
        res.cookie('TEST-AUTH', user.authentification.sessionToken, { domain: 'localhost', path: '/' });
        res.status(200).json({ message: 'Logged in successfully', user });
    } catch (error) {
        console.error("Error when login:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//Funtion to Register account
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        if (!email || !name || !password) {
            res.status(400).json({ message: 'Please provide all fields' });
            return;
        }

        const userExiste = await getUserByEmail(email);

        if (userExiste) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const salt = random();
        const user = await createUser({
            name,
            email,
            authentification: {
                password: authentification(salt, password),
                salt,
            },
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
