const sender = require("../config/email-config");

const sendBasicEmail = async (mailTo, mailSubject, mailBody) => {
    try {
        const response = await sender.sendMail({
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        })
        console.log(response);
    } catch (error) {
        console.log(error)
    }
    
}


module.exports = {
    sendBasicEmail
}