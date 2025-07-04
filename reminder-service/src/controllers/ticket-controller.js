const TicketService = require("../services/email-service")

/*
create Notification api would look something like this.
{
    "subject":"This is a ticket", 
    "content":"this is some content to be sent",
    "recipientEmail": "yourgmail@gmail.com",
    "notificationTime": "2025-07-03 20:07:00"
}
*/
const createNotification = async (req, res) => {
    try {
        const response = await TicketService.createNotification(req.body);
        console.log(response);
        return res.status(201).json({
            success: true, 
            data: response, 
            err: {},
            message: 'Successfully registered an email reminder',
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            data: {}, 
            err:  error,
            message: 'Failed to register an email reminder',
        })
    }
}

module.exports = {
    createNotification
}