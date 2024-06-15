import { Validator } from "../controllers/validator"
import { Role } from "./roles"
import { UserController } from "../controllers/userController"


export class User {
    private _name: string = ''
    private _email: string = ''
    private _role: string = ''
    private _id: string = ''

    public constructor(
        name: string, 
        email: string, 
        role: string,
        id: string = ''
    ) {
        this.name = name
        this.email = email
        this.role = role
        this.id = id
    }

    public get name() {
        return this._name
    }

    public set name(name: string) {
        if (!Validator.validateName(name)) {
            throw new Error('Invalid name')
        }

        this._name = name
    }

    public get email() {
        return this._email
    }

    public set email(email: string) {
        if (!Validator.validateEmail(email)) {
            throw new Error('Invalid email')
        }

        this._email = email
    }

    public get role() {
        return this._role
    }

    public set role(role: string) {
        if (!Object.values(Role).includes(role as Role)) {
            throw new Error('Invalid role')
        }

        this._role = role
    }

    public get id() {
        return this._id
    }

    public set id(id: string) {
        this._id = id
    }


    public static fromJSON(json: any) {
        return new User(json.name, json.email, json.role)
    }

    public toJSON() {
        return {
            name: this.name,
            email: this.email,
            role: this.role,
        }
    }

    public equals(other: User) {
        return this.id === other.id
    }
    
    public async create(): Promise<void> {
        await UserController.create(this)
    }

    public async read(): Promise<void> {
        await UserController.read(this)
    }

    public async update(): Promise<void> {
        await UserController.update(this)
    }

    public async delete(): Promise<void> {
        await UserController.delete(this);
    }

    public async changeRole(role: string): Promise<void>{
        await UserController.changeRole(this, role);
    }

    public async changeEmail(email: string): Promise<void>{
        await UserController.changeEmail(this, email);
    }
    
    public async changeName(name: string): Promise<void>{
        await UserController.changeName(this, name);
    }

    public async changePassword(password: string): Promise<void>{
        await UserController.changePassword(this, password);
    }



}


