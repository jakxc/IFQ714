// Step 1
function parseData(dataSet) {
    return JSON.parse(dataSet);
}

function getAirportById(dataset, id) {
    const filteredData = dataset.filter((el) => el["id"] === id);
    
    return filteredData.length > 0 
        ? filteredData[0] : null;
}

function getAirportByIata(dataset, iata) {
    const filteredData = dataset.filter((el) => el["iata"] === iata)
    
    return filteredData.length > 0 
        ? filteredData[0] : null;
}

// Step 2
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
    return dataset.filter(el => el['source_airport']['city'] === city).length > 0 
            ? dataset.filter(el => el['source_airport']['city'] === city)
            : null;
}

function filterByDestinationCity(dataset, city) {
    return dataset.filter(el => el['destination_airport']['city'] === city).length > 0
            ? dataset.filter(el => el['destination_airport']['city'] === city)
            : null;
}

function filterByAircraft(dataset, aircraft) {
    return dataset.filter(el => el['aircraft'].includes(aircraft)).length > 0
            ? dataset.filter(el => el['aircraft'].includes(aircraft))
            : null;
}

// Ascending order
function sortByNumberOfAircrafts(dataset) {
    return dataset.sort((a,b) => a['aircraft'].length === b['aircraft'].length 
                                    ? 0
                                    : a['aircraft'].length > b['aircraft'].length ? 1 : -1       )
}

function mapAirportNames(flight) {
    return {
        ...flight,
        source_airport: flight.source_airport.name,
        destination_airport: flight.destination_airport.name
    }
}

function mapAirlineNames(flight) {
    return {
        ...flight,
        arline: flight.airline.name
    }
}

function mapPairOfAirports(flight) {
    const airports = [flight['source_airport']['name'],  flight['destination_airport']['name']];
    
    return {
        ...flight,
        airportPair: airports
    }
}

function mapDirectDistanceBetweenAirports(flight) {
    const [originX, originY] = [flight['source_airport']['latitude'], flight['source_airport']['longitude']];
    const [destX, destY] = [flight['destination_airport']['latitude'], flight['destination_airport']['longitude']];
    const directDist = Math.sqrt((destX - originX)**2 + (destY - originY)**2);
    
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

    sortByNumberOfAircrafts: sortByNumberOfAircrafts,

    mapDirectDistanceBetweenAirports: mapDirectDistanceBetweenAirports,
    mapPairOfAirports: mapPairOfAirports,
    mapAirportNames: mapAirportNames,
    mapAirlineNames: mapAirlineNames
}


