const express = require('express')

const { 
    ServerConfig, 
    // Logger 
} = require('./config')

const app = express();

// parse json body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const apiRoutes = require('./routes')

app.use('/api', apiRoutes)

const {City, Airport} = require("./models")

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`)
    // Logger.info("Successfully started the server")

    

})