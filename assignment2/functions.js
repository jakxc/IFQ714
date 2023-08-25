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

module.exports = {
    parseData: parseData,
    getAirportById: getAirportById,
    getAirportByIata: getAirportByIata
}


