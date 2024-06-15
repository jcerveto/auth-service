export class UserRepository {
    static async login(username: string, password: string) {
        return {
            username: username + ' verified',
            password: password + ' verified'
        }
    }
}