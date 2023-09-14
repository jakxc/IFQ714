// Step 1
export function parseData(dataSet) {
    return JSON.parse(dataSet);
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
        distance: flight['direct_distance'] ? `${flight['direct_distance'].toFixed(2)} km` : 'Not specifed'
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
            distance: flight['direct_distance'] ? `${flight['direct_distance'].toFixed(2)} km` : 'Not specifed'
        }
    })

    console.table(newData);
}


/**
 * Returns array of elements with matching iata property
 *
 * @param {object} dataset The data array.
 * @param {string} id The aircraft to be filtered.
 * @return {object} filtered data array by id. 
 */
export function getAirportById(dataset, id) {
    if (!Array.isArray(dataset) || typeof id !== 'number') {
        console.log('Invalid parameter type');
        return;
    }
    
    const validData = dataset.filter(el => el["id"] && el["id"] === id);
    
    return validData.length > 0 
        ? validData[0] : console.log('No airports were found matching this id');
}

/**
 * Returns array of elements with matching iata property
 *
 * @param {object} dataset The data array.
 * @param {string} iata The aircraft to be filtered.
 * @return {object} filtered data array by iata. 
 */
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

/**
 * Returns array of elements with matching city property
 *
 * @param {object} dataset The data array.
 * @param {string} city The city to be filtered.
 * @return {object} filtered data array by city.
 */
export function filterByOriginCity(dataset, city) {
    if (!Array.isArray(dataset) || typeof city !== 'string') {
        console.log('Invalid parameter type');
        return;
    }

    const validData = dataset.filter(el => el['source_airport'] && el['source_airport']['city'] && el['source_airport']['city'] === city)

    return validData.length > 0 
            ? validData
            : console.log('No flights were found matching this origin city');
}

/**
 * Returns array of elements with matching city property
 *
 * @param {object} dataset The data array.
 * @param {string} city The city to be filtered.
 * @return {object} filtered data array by city.
 */
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

/**
 * Returns array of elements with matching airport property
 *
 * @param {object} dataset The data array.
 * @param {string} airport The airport to be filtered.
 * @return {object} filtered data array by airport. 
 */
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

/**
 * Returns array of elements with matching airport property
 *
 * @param {object} dataset The data array.
 * @param {string} airport The airport to be filtered.
 * @return {object} filtered data array by airport. 
 */
export function filterByDestinationAirport(dataset, airport) {
    if (!Array.isArray(dataset) || typeof airport !== 'string') {
        console.log("Invalid parameter type");
        return;
    }

    const validData = dataset.filter(el => el['destination_airport'] && el['destination_airport']['name'] && el['destination_airport']['name'] === airport)
    
    return validData.length > 0
            ? validData
            : console.log('No flights were found with this destination airport');
}

/**
 * Returns array of elements with matching aircraft property
 *
 * @param {object} dataset The data array.
 * @param {string} aircraft The aircraft to be filtered.
 * @return {object} filtered data array by aircraft. 
 */
export function filterByAircraft(dataset, aircraft) {
    if (!Array.isArray(dataset) || typeof aircraft !== 'string') {
        console.log("Invalid parameter type");
        return;
    }

    const validData = dataset.filter(el => el['aircraft'] && Array.isArray(el['aircraft']) && el['aircraft'].includes(aircraft));
    
    return validData.length > 0
            ? validData
            : console.log('No flights were found with this aircraft');
}

/**
 * Returns array of elements with matching airline property
 *
 * @param {object} dataset The data array.
 * @param {string} airline The aircraft to be filtered.
 * @return {object} filtered data array by airline. 
 */
export function filterByAirline(dataset, airline) {
    if (!Array.isArray(dataset) || typeof airline !== 'string') {
        console.log("Invalid parameter type");
        return;
    }

    const validData = dataset.filter(el => el['airline'] && el['airline']['name'] && el['airline']['name'] === airline)

    return validData.length > 0
    ? validData
    : console.log('No flights were found with this airline');
}

export function sortByDistance(dataset) {
    if (!Array.isArray(dataset)) {
        console.log("Invalid parameter type");
        return;
    }

    return dataset.sort((a,b) => a['direct_distance'] === b['direct_distance'] 
                                        ? 0 : a['direct_distance'] > b['direct_distance']
                                        ? 1 : -1);
}

export function sortByNumberOfAircrafts(dataset) {
    if (!Array.isArray(dataset)) {
        console.log("Invalid parameter type");
        return;
    }

    return dataset.sort((a,b) => a['aircraft'].length === b['aircraft'].length 
    ? 0 : a['aircraft'].length > b['aircraft'].length
    ? 1 : -1);
}

/**
 * Returns element with additional pair of airports property
 *
 * @param {object} flight The element to be modified.
 * @return {object} clone flight object with additional pair_of_airports property. 
 */
export function mapPairOfAirports(flight) {
    const airports = [flight['source_airport']['name'],  flight['destination_airport']['name']];
    
    const cloneFlight = Object.assign({}, flight);
    cloneFlight['pair_of_airports'] = airports;
    
    return cloneFlight; 
}

/**
 * Returns element with additional direct distance property
 *
 * @param {object} flight The element to be modified.
 * @return {object} clone flight object with additional direct_distance property. 
 */
export function mapDirectDistanceBetweenAirports(flight) {
    const haversineDistanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
        if ([lat1, lon1, lat2, lon2].some(el => typeof el !== 'number')) {
            console.log("Invalid parameter type");
            return;
        }
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

    const cloneFlight = Object.assign({}, flight)
    cloneFlight['direct_distance'] = directDist;
    
    return cloneFlight;
}

/**
 * Returns element with modified timezone property
 *
 * @param {object} airport The element to be modified.
 * @return {object} clone airport object with modified timezone property. 
 */
export function mapTimeZone(airport) {
    const cloneFlight = Object.assign({}, airport);

    cloneFlight['timezone'] = `UTC +${airport['timezone']}`;
    return cloneFlight;
}

/**
 * Returns array of elements with matching city property
 *
 * @param {object} dataset The data array.
 * @param {string} city The city to be filtered.
 * @return {object} filtered data array by city. 
 */
export function filterAirportsByCity(dataset, city) {
    if (!Array.isArray(dataset) || typeof city !== 'string') {
        console.log("Invalid parameter type");
        return;
    }

    const validData = dataset.filter(el => el['city'] && el['city'] === city);

    return validData.length > 0 
            ? validData
            : console.log('No airports were found matching this city');
}


/**
 * Returns array of elements with matching name property
 *
 * @param {object} dataset The data array.
 * @param {string} query The name to be filtered.
 * @return {object} filtered data array by name. 
 */
export function filterAirportsByName(dataset, query) {
    if (!Array.isArray(dataset) || typeof query !== 'string') {
        console.log("Invalid parameter type");
        return;
    }

    const validData = dataset.filter(el  => el['name'] && el['name'].toLowerCase().includes(query.toLowerCase()));
    return validData.length > 0
        ? validData
        : console.log('No airports were found matching this name');
}




