const fs = require('fs');
const functions = require('./functions');

const airportsData = fs.readFileSync("A2_Airports.json", "utf8");
const flightsData = fs.readFileSync("A2_Flights.json", "utf8");
const parseData = functions.parseData;
const getAirportById = functions.getAirportById;
const mapData = functions.mapData;

const getAircrafts = functions.getAircrafts;

function main() {
    const parsedAirportsData = parseData(airportsData);
    const parsedFlightsData = parseData(flightsData);
    const combinedData = [];
    
    parsedFlightsData.forEach(flight => {
        const sourceAirpoint = getAirportById(parsedAirportsData, flight["source_airport_id"])
        const destAirpoint = getAirportById(parsedAirportsData, flight["destination_airport_id"])
        const airlineValues = {
            code: flight["airline"],
            name: flight["airline_name"],
            country: flight["airline_country"]
        }
                
        combinedData.push({
            source_airport: sourceAirpoint,
            destination_airport: destAirpoint,
            codeshare: flight.codeshare,
            aircraft: flight.aircraft,
            airline: airlineValues
        })
    })

    console.log(mapData(combinedData, getAircrafts));
}

main();