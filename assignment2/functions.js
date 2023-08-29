// Step 1
function parseData(dataSet) {
    return JSON.parse(dataSet);
}

function getAirportById(dataset, id) {
    const filteredData = dataset.filter((el) => el["id"] === id)
    
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
    dataset.forEach(el => {
        clonedData.push(el);
    })

    return callback(clonedData);
}

// Step 3
function displayAllFlights(dataset) {
    return dataset.map(el => console.table(el))
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

function mapPairOfAirports(dataset) {
    return dataset.map(el => {
        const airports = [el['source_airport']['name'],  el['destination_airport']['name']];
        return {
            ...el,
            airportPair: airports
        }
    })
}

function mapDirectDistanceBetweenAirports(dataset) {
    return dataset.map(el => {
        const [originX, originY] = [el['source_airport']['latitude'], el['source_airport']['longitude']];
        const [destX, destY] = [el['destination_airport']['latitude'], el['destination_airport']['longitude']];
        const directDist = Math.sqrt((destX - originX)**2 + (destY - originY)**2);
        return {
            ...el,
            direct_distance: directDist
        }
    })  
}

module.exports = {
    parseData: parseData,
    getAirportById: getAirportById,
    getAirportByIata: getAirportByIata,
    mapData: mapData,

    // Analysis functions
    displayAllFlights: displayAllFlights,

    filterByOriginCity: filterByOriginCity,
    filterByDestinationCity: filterByDestinationCity,
    filterByAircraft: filterByAircraft,

    sortByNumberOfAircrafts: sortByNumberOfAircrafts,

    mapDirectDistanceBetweenAirports: mapDirectDistanceBetweenAirports,
    mapPairOfAirports: mapPairOfAirports
}


