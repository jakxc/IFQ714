// Step 1
export function parseData(dataSet) {
    return JSON.parse(dataSet);
}

export function getAirportById(dataset, id) {
    const filteredData = dataset.filter(el => el["id"] === id);
    
    return filteredData.length > 0 
        ? filteredData[0] : null;
}

export function getAirportByIata(dataset, iata) {
    const filteredData = dataset.filter(el => el["iata"] === iata);
    
    return filteredData.length > 0 
        ? filteredData[0] : null;
}

// Step 2

// Mapping function
export function mapData(dataset, callback) {
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
export function displayFlight(flight) {
    const cloneObj = {
        ...flight,
        source_airport: flight.source_airport.name,
        destination_airport: flight.destination_airport.name,
        airline: flight.airline.name
    }

    return console.table(cloneObj);
}

export function displayAllFlights(dataset) {
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

export function filterByOriginCity(dataset, city) {
    const validData = dataset.filter(el => el['source_airport']['city']);
    return validData.filter(el => el['source_airport']['city'] === city).length > 0 
            ? validData.filter(el => el['source_airport']['city'] === city)
            : null;
}

export function filterByDestinationCity(dataset, city) {
    const validData = dataset.filter(el => el['destination_airport']['city']);
    return validData.filter(el => el['destination_airport']['city'] === city).length > 0
            ? validData.filter(el => el['destination_airport']['city'] === city)
            : null;
}

export function filterByAircraft(dataset, aircraft) {
    const validData = dataset.filter(el => el['aircraft']);
    return validData.filter(el => el['aircraft'].includes(aircraft)).length > 0
            ? validData.filter(el => el['aircraft'].includes(aircraft))
            : null;
}

export function filterByAirline(dataset, airline) {
    const validData = dataset.filter(el => el['airline'] && el['airline']['name']);
    return validData.filter(el => el['airline']['name'] === airline).length > 0
    ? validData.filter(el => el['airline']['name'] === airline)
    : null;
}

export function mapNumOfAircrafts(flight) {
    const numOfAircrafts =  flight['aircraft'] ? flight['aircraft'].length : 0;

    return {
        ...flight,
        num_of_aircrafts: numOfAircrafts
    }
}

export function mapPairOfAirports(flight) {
    const airports = [flight['source_airport']['name'],  flight['destination_airport']['name']];
    
    return {
        ...flight,
        airport_pair: airports
    }
}

export function mapDirectDistanceBetweenAirports(flight) {
    const [originX, originY, originZ] = [flight['source_airport']['latitude'], flight['source_airport']['longitude'], flight['source_airport']['altitude']];
    const [destX, destY, destZ] = [flight['destination_airport']['latitude'], flight['destination_airport']['longitude'],  flight['destination_airport']['altitude']];
    const directDist = Math.sqrt((destX - originX)**2 + (destY - originY)**2 + (destZ - originZ)**2);
    
    return {
        ...el,
        direct_distance: directDist
    }
}




