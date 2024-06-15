import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

import { User } from "../model/user"
import { Validator } from "./validator";
import { Role } from "../model/roles";


export class UserController {
    static SALT_ROUNDS = 10


    static async hashPassword(password: string) {
        return await bcrypt.hash(password, UserController.SALT_ROUNDS)
    }

    static async createUUID(): Promise<string> {
        return uuidv4()
    }

    static async create(user: User) {
        console.log('User created: ', user)
    }

    static async read(user: User) {
        console.log('User read: ', user)
    }

    static async update(user: User) {
        console.log('User updated: ', user)
    }

    static async delete(user: User) {
        console.log('User deleted: ', user)
    }

    static async changeRole(user: User, role: string) {
        if (!Object.values(Role).includes(role as Role)) {
            throw new Error('Invalid role')
        }

        console.log('Role changed: ', user)
    }

    static async changeEmail(user: User, email: string) {
        if (!Validator.validateEmail(email)) {
            throw new Error('Invalid email')
        }

        console.log('Email changed: ', user)
    }

    static async changeName(user: User, name: string) {
        if (!Validator.validateName(name)) {
            throw new Error('Invalid name')
        }

        console.log('Name changed: ', user)
    }

    static async changePassword(user: User, password: string) {
        if (!Validator.validatePassword(password)) {
            throw new Error('Invalid password')
        }

        console.log('Password changed: ', user)
    }
}

