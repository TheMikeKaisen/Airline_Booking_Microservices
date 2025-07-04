const express = require('express');

const { ServerConfig } = require('./config');
const { sendBasicEmail } = require('./services/email-service');

const cron = require('node-cron');
const jobs = require('./utils/job');
const { TicketController } = require('./controllers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// as this is just a small service, i am setting up my routes here only
app.post("/api/v1/tickets", TicketController.createNotification)

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    jobs();
});
