const { ServerConfig } = require("../config");
const { JWT_KEY } = require("../config/server-config");
const UserRepository = require("../repositories/user-repository");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw error;
            }
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            // 1. fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            if(user==undefined){
                console.log("User don't exist!");
                const error = new Error("User don't exist");
                error.statusCode = 401; // Unauthorized
                error.explanation = "User couldn't be found";
                throw error;
            }

            // 2. compare incoming plain password with stores encrypted password
            const passwordMatch = await this.checkPassword(plainPassword, user.password);
            if (!passwordMatch) {
                console.log("Incorrect password");
                const error = new Error("Incorrect password");
                error.statusCode = 401; // Unauthorized
                error.explanation = "Password does not match the stored hash";
                throw error;
            }
            

            // 3. if the passwords match then create a jwt token and send it to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;

            
        } catch (error) {
            console.log("Something went wrong in the service layer", error);
            throw error;
        }
    }


    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1h'});
            return result;
        } catch (error) {
            console.log("Something got wrong in token creation!")
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const result = jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            console.log("Something got wrong in token validation!", error);
            throw error;
        }
    }


    async checkPassword(userInputPlainPassword, hashedPassword) {
        try {
            return await bcrypt.compare(userInputPlainPassword, hashedPassword);
        } catch (error) {
            console.log("Something went wrong during password comparison")
            throw error;
        }
    }
}

module.exports = UserService