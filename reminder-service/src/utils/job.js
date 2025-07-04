const cron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/email-config");

const setupJobs = () => {
    // run every five minutes
    cron.schedule('*/10 * * * *', async () => {
        const response = await emailService.fetchPendingEmails()
        console.log(response);
        response.forEach((email) => {
            sender.sendMail(
                {
                    to: email.recipientEmail,
                    subject: email.subject,
                    text: email.content
                },
                async (err, data) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(data);
                        console.log("email id" , email.id);
                        await emailService.updateTicket(email.id, {status: "SUCCESS"})
                    }
                }

            )
        }
        
    )
    console.log(response)
        
      });
}

module.exports = setupJobs