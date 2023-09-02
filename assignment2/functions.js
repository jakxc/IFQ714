// Step 1
function parseData(dataSet) {
    return JSON.parse(dataSet);
}

function getAirportById(dataset, id) {
    const filteredData = dataset.filter(el => el["id"] === id);
    
    return filteredData.length > 0 
        ? filteredData[0] : null;
}

function getAirportByIata(dataset, iata) {
    const filteredData = dataset.filter(el => el["iata"] === iata);
    
    return filteredData.length > 0 
        ? filteredData[0] : null;
}

// Step 2

// Mapping function
function mapData(dataset, callback) {
    const clonedData = [];
    const timestamp = new Date();
    dataset.forEach(el => {
        clonedData.push(el);
    })

    return {
        timestamp: timestamp,
        data: clonedData.map(callback)
    };
}

// Step 3
function displayFlight(flight) {
    const cloneObj = {
        ...flight,
        source_airport: flight.source_airport.name,
        destination_airport: flight.destination_airport.name,
        airline: flight.airline.name
    }

    return console.table(cloneObj);
}

function displayAllFlights(dataset) {
    const newData = dataset.map(flight => {
        const clone = Object.assign({}, flight);

        return {
            ...flight,
            source_airport: flight.source_airport.name,
            destination_airport: flight.destination_airport.name,
            airline: flight.airline.name
        }
    })

    console.table(newData);
}

function filterByOriginCity(dataset, city) {
    const validData = dataset.filter(el => el['source_airport']['city']);
    return validData.filter(el => el['source_airport']['city'] === city).length > 0 
            ? validData.filter(el => el['source_airport']['city'] === city)
            : null;
}

function filterByDestinationCity(dataset, city) {
    const validData = dataset.filter(el => el['destination_airport']['city']);
    return validData.filter(el => el['destination_airport']['city'] === city).length > 0
            ? validData.filter(el => el['destination_airport']['city'] === city)
            : null;
}

function filterByAircraft(dataset, aircraft) {
    const validData = dataset.filter(el => el['aircraft']);
    return validData.filter(el => el['aircraft'].includes(aircraft)).length > 0
            ? validData.filter(el => el['aircraft'].includes(aircraft))
            : null;
}

function filterByAirline(dataset, airline) {
    const validData = dataset.filter(el => el['airline'] && el['airline']['name']);
    return validData.filter(el => el['airline']['name'] === airline).length > 0
    ? validData.filter(el => el['airline']['name'] === airline)
    : null;
}

function mapNumOfAircrafts(flight) {
    const numOfAircrafts =  flight['aircraft'] ? flight['aircraft'].length : 0;

    return {
        ...flight,
        num_of_aircrafts: numOfAircrafts
    }
}

function mapPairOfAirports(flight) {
    const airports = [flight['source_airport']['name'],  flight['destination_airport']['name']];
    
    return {
        ...flight,
        airport_pair: airports
    }
}

function mapDirectDistanceBetweenAirports(flight) {
    const [originX, originY, originZ] = [flight['source_airport']['latitude'], flight['source_airport']['longitude'], flight['source_airport']['altitude']];
    const [destX, destY, destZ] = [flight['destination_airport']['latitude'], flight['destination_airport']['longitude'],  flight['destination_airport']['altitude']];
    const directDist = Math.sqrt((destX - originX)**2 + (destY - originY)**2 + (destZ - originZ)**2);
    
    return {
        ...el,
        direct_distance: directDist
    }
}

module.exports = {
    parseData: parseData,
    getAirportById: getAirportById,
    getAirportByIata: getAirportByIata,
    mapData: mapData,

    // Analysis functions
    displayFlight: displayFlight,
    displayAllFlights: displayAllFlights,
    filterByOriginCity: filterByOriginCity,
    filterByDestinationCity: filterByDestinationCity,
    filterByAircraft: filterByAircraft,
    filterByAirline: filterByAirline,

    mapNumOfAircrafts: mapNumOfAircrafts,
    mapDirectDistanceBetweenAirports: mapDirectDistanceBetweenAirports,
    mapPairOfAirports: mapPairOfAirports
}


