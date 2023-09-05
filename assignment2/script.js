import { writeFile, readFileSync } from 'fs';
import { parseData, mapData, getAirportById, filterByOriginCity, filterByDestinationCity, mapPairOfAirports, mapDirectDistanceBetweenAirports, displayAllFlights, filterByAircraft } from './functions.js';

function setFlightsData() {
    fetch('https://server.com/A2_Flights.json')
        .then(res => res.json())
        .then(data => console.log(data));
}

function exportDataToFile(filename, dataSet) {
    const stringifiedData = JSON.stringify(dataSet);
    writeFile(filename, stringifiedData, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully");
        }
    });
}

function main() {
    // const parsedAirportsData = parseData(readFileSync("A2_Airports.json", "utf8"));
    // const parsedFlightsData = parseData(readFileSync("A2_Flights.json", "utf8"));
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
    const combinedData = JSON.parse(readFileSync("Combined_Data.json", "utf8"));
    const combinedDataWithDistance = mapData(combinedData, mapDirectDistanceBetweenAirports).data;
    const combinedDataWithAirports = mapData(combinedData, mapPairOfAirports).data;

    // Flights from Brisbane to Roma
    const brisbaneToRomaFlights = filterByOriginCity(filterByDestinationCity(combinedDataWithDistance, 'Roma'), 'Brisbane');
    displayAllFlights(brisbaneToRomaFlights);

    // Flights that use AirbusA330 aircraft
    const airbusFlights = filterByAircraft(combinedDataWithDistance, 'Airbus A330');
    displayAllFlights(airbusFlights);

    // Determine min, max and average values for number of flights between airport pairs
    const airportsObj = {};

    combinedDataWithAirports.forEach(el => {
      const pair = el['pair_of_airports'].sort();

      if (!airportsObj[pair.join(' and ')]) {
        airportsObj[pair.join(' and ')] = 1;
      } else {
        airportsObj[pair.join(' and ')]++;
      }
    })

    const minPair = Math.min(...Object.values(airportsObj)); 
    const maxPair = Math.max(...Object.values(airportsObj));
    const avgPair = Math.floor(Object.values(airportsObj).reduce((acc, curr) => acc + curr, 0) / Object.values(airportsObj).length);
    const minArr = [];
    const maxArr = [];
    const avgArr = [];

    for (const key in airportsObj) {
      if (airportsObj[key] === minPair) minArr.push(key);
      if (airportsObj[key] === maxPair) maxArr.push(key);
      if (airportsObj[key] === avgPair) avgArr.push(key);
    }

    console.table({
      min: { value: minPair, airport_pairs: minArr.join(', ')},
      max: { value: maxPair, airport_pairs: maxArr.join(', ')},
      avg: { value: avgPair, airport_pairs: avgArr.join(', ')},
    })
}

main();