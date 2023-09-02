const fs = require('fs');
const functions = require('./functions');
const parseData = functions.parseData;
const getAirportById = functions.getAirportById;
const mapData = functions.mapData;
const displayFlight = functions.displayFlight;
const displayAllFlights = functions.displayAllFlights;
const filterByOriginCity = functions.filterByOriginCity;
const filterByDestinationCity = functions.filterByDestinationCity;
const mapDirectDistanceBetweenAirports = functions.mapDirectDistanceBetweenAirports;
const mapPairOfAirports = functions.mapPairOfAirports;

function setFlightsData() {
    fetch('https://server.com/A2_Flights.json')
        .then(res => res.json())
        .then(data => console.log(data));
}

function exportDataToFile(filename, dataSet) {
    const stringifiedData = JSON.stringify(dataSet);
    fs.writeFile(filename, stringifiedData, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully");
        }
    });
}

function main() {
    // const parsedAirportsData = parseData(fs.readFileSync("A2_Airports.json", "utf8"));
    // const parsedFlightsData = parseData(fs.readFileSync("A2_Flights.json", "utf8"));
    // const combinedData = [];
    
    // parsedFlightsData.forEach(flight => {
    //     const sourceAirpoint = getAirportById(parsedAirportsData, flight["source_airport_id"])
    //     const destAirpoint = getAirportById(parsedAirportsData, flight["destination_airport_id"])
    //     const airlineValues = {
    //         code: flight["airline"],
    //         name: flight["airline_name"],
    //         country: flight["airline_country"]
    //     }
                
    //     combinedData.push({
    //         source_airport: sourceAirpoint,
    //         destination_airport: destAirpoint,
    //         codeshare: flight.codeshare,
    //         aircraft: flight.aircraft,
    //         airline: airlineValues
    //     })
    // })

    // exportDataToFile("Combined_Data.json", combinedData);
    const combinedData = JSON.parse(fs.readFileSync("Combined_Data.json", "utf8"));
    const brisbaneToRomaFlights = filterByOriginCity(filterByDestinationCity(combinedData, 'Roma'), 'Brisbane');
    displayAllFlights(brisbaneToRomaFlights);
}

main();