export class UserRepository {
    static async login(username: string, password: string) {
        if (!username || !password) {
            throw new Error('Invalid input')
        }
        
        return {
            username: username + ' verified',
            password: password + ' verified'
        }
    }
}