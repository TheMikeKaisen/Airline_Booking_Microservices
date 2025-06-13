const express = require('express')

const { 
    ServerConfig, 
    // Logger 
} = require('./config')

const app = express();

const apiRoutes = require('./routes')

app.use('/api', apiRoutes)

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`)
    // Logger.info("Successfully started the server")
})