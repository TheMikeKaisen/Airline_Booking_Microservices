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

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`)
    // Logger.info("Successfully started the server")

    // Some self learning stuff that I will remove in the upcoming commits: #ThumbsUpWaliEmoji
    const jprCity = await City.findByPk(1);
    // console.log(dlhCity)

    // const dlhAirport = await dlhCity.createAirport({name: "delhi airport", code: "DLH", address: "delhi"});
    // console.log(dlhAirport);

    // get all airports associated with the given city
    // const totalAirports = await jprCity.getAirports();
    // console.log(totalAirports)

    // Remove an Airport
    await City.destroy({
        where: {
            id: 1
        }
    })


})