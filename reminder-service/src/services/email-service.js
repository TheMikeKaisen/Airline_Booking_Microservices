const sender = require("../config/email-config");
const TicketRepository = require("../repositories/ticket-repository");

const repo = new TicketRepository();


const sendBasicEmail = async (mailTo, mailSubject, mailBody) => {
    try {
        const response = await sender.sendMail({
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        }, async (err, data) => {
            if(err) {
                console.log(err) ;
            } else{
                console.log(data);
            }
        })
        console.log(response);
    } catch (error) {
        console.log(error)
        throw error;
    }
    
}

const fetchPendingEmails = async ()=>{
    try {
        const response = await repo.get({status: 'PENDING'});
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateTicket = async (id, data) => {
    try {
        const response = await repo.update(id, data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createNotification = async(data) => {
    try {
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket
}