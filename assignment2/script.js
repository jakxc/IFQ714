import { writeFile, readFileSync } from 'fs';
import { parseData, mapData, getAirportById, filterByOriginCity, filterByDestinationCity, mapPairOfAirports, mapDirectDistanceBetweenAirports, displayAllFlights, filterByAircraft } from './functions.js';

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
    const combinedDataWithAirports = mapData(combinedDataWithDistance, mapPairOfAirports).data;

    // Flights from Brisbane to Roma
    const brisbaneToRomaFlights = filterByOriginCity(filterByDestinationCity(combinedDataWithDistance, 'Roma'), 'Brisbane');
    displayAllFlights(brisbaneToRomaFlights);

    // Flights that use AirbusA330 aircraft
    const airbusFlights = filterByAircraft(combinedDataWithDistance, 'Airbus A330');
    displayAllFlights(airbusFlights);

    // Determine min, max and average values for number of flights between airport pairs,
    // number of unique aircrafts each flight and direct distance of flights
    const airportsObj = {};
    const aircraftsObj = {};
    const distanceObj= {};

    combinedDataWithAirports.forEach(el => {
      const unsortedKeys = el['pair_of_airports'];
      const sortedKeys = el['pair_of_airports'].sort();

      if (!airportsObj[sortedKeys.join('-')]) {
        airportsObj[sortedKeys.join('-')] = 1;
      } else {
        airportsObj[sortedKeys.join('-')]++;
      }

      const aircrafts = [...new Set(el['aircraft'])];
      if (!aircraftsObj[unsortedKeys.join('-')]) {
        aircraftsObj[unsortedKeys.join('-')] = aircrafts;
      } else {
        aircraftsObj[unsortedKeys.join('-')].push(...aircrafts);
        aircraftsObj[unsortedKeys.join('-')] = [...new Set (aircraftsObj[unsortedKeys.join('-')])]
      }

      if (!distanceObj[sortedKeys.join('-')]) {
        if (typeof el['direct_distance'] === 'number') distanceObj[sortedKeys.join('-')] = el['direct_distance'];
      }
    })

    for (const key in aircraftsObj) {
      aircraftsObj[key] = aircraftsObj[key].length || 0;
    }

    function analyseData(obj) {
      const minPair = Math.min(...Object.values(obj)); 
      const maxPair = Math.max(...Object.values(obj));
      const avgPair = Object.values(obj).reduce((acc, curr) => acc + curr, 0) / Object.values(obj).length;
      const minArr = [];
      const maxArr = [];
      const avgArr = [];
  
      for (const key in obj) {
        if (obj[key] === minPair) minArr.push(key);
        if (obj[key] === maxPair) maxArr.push(key);
        if (obj[key] === avgPair) avgArr.push(key);
      }
  
      console.table({
        min: { value: minPair, airport_pairs: minArr.join(', ')},
        max: { value: maxPair, airport_pairs: maxArr.join(', ')},
        avg: { value: avgPair, airport_pairs: avgArr.join(', ')},
      })
    }

    analyseData(airportsObj);
    analyseData(aircraftsObj);
    analyseData(distanceObj)
}

main();