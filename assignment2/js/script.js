import { writeFile, readFileSync } from 'fs';
import { 
    parseData, 
    mapData, 
    getAirportById, 
    filterByOriginCity, 
    filterByDestinationCity, 
    filterByAircraft, sortByDistance, 
    sortByNumberOfAircrafts, mapPairOfAirports, 
    mapDirectDistanceBetweenAirports, 
    displayAllFlights
  } from './functions.js';

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
    })

    for (const key in aircraftsObj) {
      aircraftsObj[key] = aircraftsObj[key].length || 0;
    }

    function getMaxFromObj(obj) {
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
  
   
        // min: { value: minPair, airport_pairs: minArr.join(', ')},
        return { value: maxPair, airport_pairs: maxArr.join(', ') }
        // avg: { value: avgPair, airport_pairs: avgArr.join(', ')},)
    }

    console.table({max: {num_of_flights: `${getMaxFromObj(airportsObj)['value']} (${getMaxFromObj(airportsObj)['airport_pairs']})` , 
                        num_of_aircrafts: `${getMaxFromObj(aircraftsObj)['value']} (${getMaxFromObj(aircraftsObj)['airport_pairs']})`
                    }})

    const sortedByDistance = sortByDistance(combinedDataWithAirports);

    const maxDist = { from: sortedByDistance[sortedByDistance.length - 1]['source_airport']['name'], 
                      to: sortedByDistance[sortedByDistance.length - 1]['destination_airport']['name'],
                      distance: sortedByDistance[sortedByDistance.length - 1]['direct_distance']
                    }
    const minDist = { from: sortedByDistance[0]['source_airport']['name'], 
                      to: sortedByDistance[0]['destination_airport']['name'],
                      distance: sortedByDistance[0]['direct_distance']
                   }
    const avgDist = { distance: combinedDataWithAirports.reduce((acc, curr) => acc + curr['direct_distance'], 0) / combinedDataWithAirports.length } ;
    console.table({max: maxDist, min: minDist, avg: avgDist});

    const sortedByNumOfAircrafts = sortByNumberOfAircrafts(combinedDataWithAirports);
    const maxAircrafts = { from: sortedByNumOfAircrafts[sortedByNumOfAircrafts.length - 1]['source_airport']['name'], 
                      to: sortedByNumOfAircrafts[sortedByNumOfAircrafts.length - 1]['destination_airport']['name'],
                      airline: sortedByNumOfAircrafts[sortedByNumOfAircrafts.length - 1]['airline']['name'],
                      number_of_aircrafts: sortedByNumOfAircrafts[sortedByNumOfAircrafts.length - 1]['aircraft'].join(', ')
                    }

    console.table(maxAircrafts);          
}

main();