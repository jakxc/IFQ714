// Step 1
export function parseData(dataSet) {
    return JSON.parse(dataSet);
}

export function getAirportById(dataset, id) {
    if (!Array.isArray(dataset) || typeof id !== 'number') {
        console.log('Invalid parameter type');
        return;
    }
    
    const validData = dataset.filter(el => el["id"] && el["id"] === id);
    
    return validData.length > 0 
        ? validData[0] : console.log('No airports were found matching this id');
}

export function getAirportByIata(dataset, iata) {
    if (!Array.isArray(dataset) || typeof iata !== 'string') {
        console.log('Invalid parameter type');
        return;
    }
    
    const validData = dataset.filter(el => el["iata"] && el["iata"] === iata);
    
    return validData.length > 0 
        ? validData[0] : console.log('No airports were found matching this iata');
}

// Step 2

// Mapping function
export function mapData(dataset, callback) {
    const clonedData = Array.from(dataset);
    const timestamp = new Date();

    return {
        timestamp: timestamp,
        data: clonedData.map(callback)
    };
}

// Step 3
export function filterByOriginCity(dataset, city) {
    if (!Array.isArray(dataset) || typeof city !== 'string') {
        console.log('Invalid parameter type');
        return null;
    }

    const validData = dataset.filter(el => el['source_airport'] && el['source_airport']['city'] && el['source_airport']['city'] === city)

    return validData.length > 0 
            ? validData
            : console.log('No flights were found matching this origin city');
}

export function filterByDestinationCity(dataset, city) {
    if (!Array.isArray(dataset) || typeof city !== 'string') {
        console.log("Invalid parameter type");
        return null;
    }

    const validData = dataset.filter(el => el['destination_airport'] && el['destination_airport']['city'] && el['destination_airport']['city'] === city);

    return validData.length > 0
            ? validData
            : console.log('No flights were found matching this destination city');
}

export function filterByOriginAirport(dataset, airport) {
    if (!Array.isArray(dataset) || typeof airport !== 'string') {
        console.log("Invalid parameter type");
        return;
    }
    
    const validData = dataset.filter(el => el['source_airport'] && el['source_airport']['name'] && el['source_airport']['name'] === airport)

    return validData.length > 0 
            ? validData
            : console.log('No flights were found with this origin airport');
}

export function filterByDestinationAirport(dataset, airport) {
    if (!Array.isArray(dataset) || typeof airport !== 'string') console.log("Invalid parameter type");

    const validData = dataset.filter(el => el['destination_airport'] && el['destination_airport']['name'] && el['destination_airport']['name'] === airport)
    
    return validData.length > 0
            ? validData
            : console.log('No flights were found with this destination airport');
}

export function filterByAircraft(dataset, aircraft) {
    if (!Array.isArray(dataset) || typeof aircraft !== 'string') console.log("Invalid parameter type");

    const validData = dataset.filter(el => el['aircraft'] && Array.isArray(el['aircraft']) && el['aircraft'].includes(aircraft));
    
    return validData.length > 0
            ? validData
            : console.log('No flights were found with this aircraft');
}

export function filterByAirline(dataset, airline) {
    if (!Array.isArray(dataset) || typeof airline !== 'string') console.log("Invalid parameter type");

    const validData = dataset.filter(el => el['airline'] && el['airline']['name'] && el['airline']['name'] === airline)

    return validData.length > 0
    ? validData
    : console.log('No flights were found with this airline');
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
        pair_of_airports: airports
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

export function displayFlight(flight) {
    if (!dataset)  {
        console.log('No flight to display');
        return;
    }

    const cloneObj = {
        source_airport: flight['source_airport']['name'] || 'Not specifed',
        destination_airport: flight['destination_airport.']['name'] || 'Not specifed',
        airline: flight['airline']['name'] || 'Not specifed',
        aircrafts: flight['aircraft'].join(', ') || 'Not specifed',
        distance: `${flight['direct_distance'].toFixed(2)}km` || 'Not specifed'
    }

    return console.table(cloneObj);
}

export function displayAllFlights(dataset) {
    if (!dataset) {
        console.log('No flights to display');
        return;
    }

    const newData = dataset.map(flight => {
        return {
            source_airport: flight['source_airport']['name'] || 'Not specifed',
            destination_airport: flight['destination_airport']['name'] || 'Not specifed',
            airline: flight['airline']['name'] || 'Not specifed',
            aircrafts: flight['aircraft'].join(', ') || 'Not specifed',
            distance: `${flight['direct_distance'].toFixed(2)}km` || 'Not specifed'
        }
    })

    console.table(newData);
}


export function filterAirportsByCity(dataset, city) {
    if (!Array.isArray(dataset) || typeof city !== 'string') console.log("Invalid parameter type");

    const validData = dataset.filter(el => el['city'] && el['city'] === city);

    return validData.length > 0 
            ? validData
            : console.log('No airports were found matching this city');
}

export function filterAirportsByName(dataset, query) {
    if (!Array.isArray(dataset) || typeof query !== 'string') console.log("Invalid parameter type");

    const validData = dataset.filter(el  => el['name'] && el['name'].toLowerCase().includes(query.toLowerCase()));
    return validData.length > 0
        ? validData
        : console.log('No airports were found matching this city');
}




