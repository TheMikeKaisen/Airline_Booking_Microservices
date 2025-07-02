const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { sendBasicEmail } = require('./services/email-service');

const cron = require('node-cron')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // sendBasicEmail(
    //     "themikekaisen@gmail.com", 
    //     "hie, how are you!",
    //     "ore wa saikyoo dakara!"
        
    // )
    
cron.schedule('*/2 * * * *', () => {
    console.log('running a task every two minute');
  });
});
