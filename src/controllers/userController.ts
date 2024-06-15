import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises'

import { User } from "../model/user"
import { Validator } from "./validator";
import { Role } from "../model/roles";


export class UserController {
    static SALT_ROUNDS = 10
    static USER_FILE_PATH = './db/users.json'
    static FILE_ENCODING: any = 'utf-8'


    static async hashPassword(password: string) {
        return await bcrypt.hash(password, UserController.SALT_ROUNDS)
    }

    static async createUUID(): Promise<string> {
        return uuidv4()
    }


    static async create(user: User) {
        fs.writeFile(UserController.USER_FILE_PATH, JSON.stringify(user.toJSON()    ), { flag: 'a' })
            .then(() => {
                return user
            })
            .catch((error) => {
                console.error('Error creating user: ', error)
                return null
            })        
    }

    static async read(user: User) {
        fs.readFile(UserController.USER_FILE_PATH, UserController.FILE_ENCODING)
            .then((data) => {
                const jsonUsers = JSON.parse(data.toString())
                const users = jsonUsers.map((u: any) => User.fromJSON(u))
                return users.find((u: User) => u.equals(user))
            })
            .catch((error) => {
                console.error('Error reading users: ', error)
                return null
            })

    
    }

    static async update(user: User) {
        const users: [any] = await UserController.readAll()
        if (!users) {
            throw new Error('Error reading users')
        }

        users.filter((u: User) => u.equals(user))

        await UserController.writeAll(users)
    }

    static async delete(user: User) {
        const users: [any] = await UserController.readAll()
        if (!users) {
            throw new Error('Error reading users')
        }

        users.filter((u: any) => u.id === user.id)

        await UserController.writeAll(users)
    }

    static async readAll() {
        return fs.readFile(UserController.USER_FILE_PATH, UserController.FILE_ENCODING)
            .then((data) => {
                const jsonUsers = JSON.parse(data.toString())
                return jsonUsers.map((u: User) => User.fromJSON(u))
            })
            .catch((error) => {
                console.error('Error reading users: ', error)
                return null
            })
    }

    static async writeAll(users: User[]) {
        return fs.writeFile(UserController.USER_FILE_PATH, JSON.stringify(users.map((u) => u.toJSON())))
            .then(() => {
                return users
            })
            .catch((error) => {
                console.error('Error writing users: ', error)
                return null
            })
    }

    static async changeRole(user: User, role: string) {
        if (!Object.values(Role).includes(role as Role)) {
            throw new Error('Invalid role')
        }

        const users: [any] = await UserController.readAll()
        if (!users) {
            throw new Error('Error reading users')
        }

        users.find((u: any) => user.equals(u)).role = role
        await UserController.writeAll(users)
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

        const users: [any] = await UserController.readAll()
        if (!users) {
            throw new Error('Error reading users')
        }

        users.find((u: any) => user.equals(u)).name = name
        await UserController.writeAll(users)
    }

    static async changePassword(user: User, password: string) {
        if (!Validator.validatePassword(password)) {
            throw new Error('Invalid password')
        }

        const users: [any] = await UserController.readAll()
        if (!users) {
            throw new Error('Error reading users')
        }

        users.find((u: any) => user.equals(u)).password = await UserController.hashPassword(password)
        await UserController.writeAll(users)
    }
}

