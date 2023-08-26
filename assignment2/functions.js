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

    return clonedData.map(el => callback(el));
}

// Step 3
function getOriginCity(flight) {
    return flight['source_airport']['city'];
}

function getDestinationCity(flight) {
    return flight['destination_airport']['city'];
}

function getAircrafts(flight) {
    return flight['aircraft'];
}

function getSourceDesinationAirport(flight) {
    const source = flight['source_airport']['name'];
    const dest = flight['destinaton_airport']['name'];

    return [source, dest];
}

module.exports = {
    parseData: parseData,
    getAirportById: getAirportById,
    getAirportByIata: getAirportByIata,
    mapData: mapData,

    // Analysis functions
    getAircrafts: getAircrafts,
    getSourceDesinationAirport: getSourceDesinationAirport
}


