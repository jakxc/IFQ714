import fetch from "node-fetch";
import { 
        mapData, 
        parseData, 
        getAirportById,
        displayAllFlights, 
        filterByOriginCity, 
        filterByDestinationCity, 
        filterByAircraft,
        sortByNumberOfAircrafts,
        mapDirectDistanceBetweenAirports,
        mapPairOfAirports
    } from "./functions.js"

let airportsData;
let flightsData;

fetch("../data/A2_Airports.json")
    .then(res => JSON.parse(res))
    .then(data => console.log(data[0]));

// fetch("../data/A2_Flights.json")
//     .then(res => flightsData = res);

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
    
    console.table(mapData());
}

// main();