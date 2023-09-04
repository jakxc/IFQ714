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
    const validData = dataset.filter(el => el['source_airport'] && el['source_airport']['city']);
    return validData.filter(el => el['source_airport']['city'] === city).length > 0 
            ? validData.filter(el => el['source_airport']['city'] === city)
            : null;
}

export function filterByDestinationCity(dataset, city) {
    const validData = dataset.filter(el => el['destination_airport'] && el['destination_airport']['city']);
    return validData.filter(el => el['destination_airport']['city'] === city).length > 0
            ? validData.filter(el => el['destination_airport']['city'] === city)
            : null;
}

export function filterByOriginAirport(dataset, airport) {
    const validData = dataset.filter(el => el['source_airport'] && el['source_airport']['name']);
    return validData.filter(el => el['source_airport']['name'] === airport).length > 0 
            ? validData.filter(el => el['source_airport']['name'] === airport)
            : null;
}

export function filterByDestinationAirport(dataset, airport) {
    const validData = dataset.filter(el => el['destination_airport'] && el['destination_airport']['name']);
    return validData.filter(el => el['destination_airport']['name'] === airport).length > 0
            ? validData.filter(el => el['destination_airport']['name'] === airport)
            : null;
}


export function filterByAircraft(dataset, aircraft) {
    const validData = dataset.filter(el => el['aircraft'] && Array.isArray(el['aircraft']));
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
    const haversineDistanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
        if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) return null;
        let latDiff = (lat2 - lat1) * Math.PI / 180.0;
        let lonDiff = (lon2 - lon1) * Math.PI / 180.0;
           
        lat1 = (lat1) * Math.PI / 180.0;
        lat2 = (lat2) * Math.PI / 180.0;
         
        let a = Math.pow(Math.sin(latDiff / 2), 2) +
                   Math.pow(Math.sin(lonDiff / 2), 2) *
                   Math.cos(lat1) *
                   Math.cos(lat2);
        let rad = 6371;
        let c = 2 * Math.asin(Math.sqrt(a));
        return rad * c;
    }
    
    const [originX, originY] = [flight['source_airport'] ? flight['source_airport']['latitude'] : null, flight['source_airport'] ? flight['source_airport']['longitude'] : null];
    const [destX, destY] = [flight['destination_airport'] ? flight['destination_airport']['latitude'] : null, flight['destination_airport'] ? flight['destination_airport']['longitude'] : null];
    const directDist = haversineDistanceBetweenPoints(originX, originY, destX, destY);
    
    return {
        ...flight,
        direct_distance: directDist
    }
}




