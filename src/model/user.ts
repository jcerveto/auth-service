import { Validator } from "../controllers/validator"
import { Role } from "./roles"


export class User {
    private _name: string = ''
    private _email: string = ''
    private _role: string = ''

    constructor(name: string, email: string, role: string) {
        this.name = name
        this.email = email
        this.role = role
    }

    get name() {
        return this._name
    }

    set name(name: string) {
        if (!Validator.validateName(name)) {
            throw new Error('Invalid name')
        }

        this._name = name
    }

    get email() {
        return this._email
    }

    set email(email: string) {
        if (!Validator.validateEmail(email)) {
            throw new Error('Invalid email')
        }

        this._email = email
    }

    get role() {
        return this._role
    }

    set role(role: string) {
        if (!Object.values(Role).includes(role as Role)) {
            throw new Error('Invalid role')
        }

        this._role = role
    }
}


