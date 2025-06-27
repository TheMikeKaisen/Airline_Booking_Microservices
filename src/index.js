const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const UserService = require('./services/user-service');
const db = require('./models');



const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

    // do this only once to sync the database to create "User_Roles" table!
    db.sequelize.sync({alter: true})
});
