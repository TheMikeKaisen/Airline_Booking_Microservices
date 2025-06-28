const { ServerConfig } = require("../config");
const { JWT_KEY } = require("../config/server-config");
const UserRepository = require("../repositories/user-repository");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppErrors = require("../utils/error-handler");
const ClientError = require("../utils/client-error");
const { StatusCodes } = require("http-status-codes");

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
            throw new AppErrors(
                "Server Error", 
                "Something went wrong in service layer", 
                "Logical issue found", 
                500,
            );
        }
    }

    async signIn(email, plainPassword) {
        try {
            // 1. fetch the user using the email
            const user = await this.userRepository.getByEmail(email);

            if(user==undefined){
                throw new ClientError(
                    "AttributeNotFound", 
                    "Invalid email sent in the request", 
                    "check the email", 
                    StatusCodes.NOT_FOUND
                )
            }

            // 2. compare incoming plain password with stores encrypted password
            const passwordMatch = await this.checkPassword(plainPassword, user.password);
            if (!passwordMatch) {
                throw new ClientError(
                    "AttibuteError", 
                    "Password doesn't match", 
                    "check you password", 
                    StatusCodes.BAD_REQUEST
                )
            }
            

            // 3. if the passwords match then create a jwt token and send it to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;


        } catch (error) {
            console.log("Something went wrong in the service layer", error);
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            // Step 1: Verify the token
            const decoded = this.verifyToken(token);
            if (!decoded || !decoded.id) {
                throw new ClientError(
                    "TokenExpired",
                    "Invalid or expired token",
                    "Authentication Failed",
                    401,
                );
            }
    
            // Step 2: Fetch user from DB using decoded ID
            const user = await this.userRepository.getById(decoded.id);
            if(user==undefined){
                throw new ClientError(
                    "AttributeNotFound", 
                    "Invalid email sent in the request", 
                    "check the email", 
                    StatusCodes.NOT_FOUND
                )
            }
    
            // Step 3: Success
            return user.id;
    
        } catch (error) {
            console.log("Something went wrong in isAuthenticated:", error);
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

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer!");
            throw error;
        }
    }




}

module.exports = UserService