const AppError = require('./error-handler');
const { StatusCodes } = require('http-status-codes');

class ClientError extends AppError {
    constructor(name, message, explanation, statusCode) {
        // let errorName = error.name;
        // let explanation = [];
        // error.errors.forEach((err) => {
        //     explanation.push(err.message);
        // });

        super(
            name,
            message,
            explanation,
            statusCode
        );
    }
}

module.exports = ClientError;