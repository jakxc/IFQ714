import { 
    mapData, 
    filterByOriginAirport, 
    filterByDestinationAirport,  
    filterByAirline, 
    filterByAircraft, 
    mapDirectDistanceBetweenAirports, 
    mapPairOfAirports,
    filterAirportsByCity,
    filterAirportsByName,
    mapTimeZone
 } from './functions.js';

// Filters and search
const sourceAirportFilter = document.querySelector("#filterSourceAirportSelect");
const destinationAirportFilter = document.querySelector("#filterDestinationAirportSelect");
const airlineFilter = document.querySelector("#filterAirlineSelect");
const aircraftFilter = document.querySelector('#filterAircraftSelect');
const cityFilter = document.querySelector("#filterCitySelect");
const airportSearch = document.querySelector("#filterSearchTermInput");

// Display divs
const flightsDisplayDiv = document.querySelector("#flightFilterDisplayDiv");
const airportsDisplayDiv = document.querySelector("#airportFilterDisplayDiv")

let flightsData = [];
let airportsData = [];

/**
 * Returns object of elements with pair_of_airports as keys
 *
 * @param {object} dataset The data array.
 * @return {object} object with pair_of_airports as keys and related data object as values (airline_aircraftand distance properties)
 */
function groupDataBySourceDest(dataset) {
    const obj = {};

    dataset.forEach(el => {
        const key = el['pair_of_airports'].join('-');
        if (!obj[key]) {
            obj[key] = { 
                airline_aircraft: { [el['airline']['name']]: el['aircraft'] },
                distance: el['direct_distance']
             }
        } else {
            obj[key]['airline_aircraft'][el['airline']['name']] = el['aircraft'];
        }
    })

    return obj;
}

/**
 * Displays data in flight display div
 *
 * @param {object} dataset The data array.
 */
function displayFlights(dataset) {
    // Clear flights div content
    flightsDisplayDiv.innerHTML = '';
    if (!dataset || dataset.length === 0) {
        flightsDisplayDiv.innerHTML = "There are no flights that match this query, please try again.";
        return;
    }

    const dataObj = groupDataBySourceDest(dataset);

    Object.keys(dataObj).sort().forEach((key, i) => {
        let airlineWithAircrafts = []
        for (const k in dataObj[key]['airline_aircraft']) {
            airlineWithAircrafts.push(`${k} (<span class='fs-italic'>${dataObj[key]['airline_aircraft'][k].join(', ')}</span>)`)
        }

        flightsDisplayDiv.innerHTML += `<div class='list-item'>
        ${i + 1}.
        <span class='fw-bold'>Source Airport:</span> ${key.split('-')[0] || 'Not Specified'} | 
        <span class='fw-bold'>Destination Airport:</span> ${key.split('-')[1] || 'Not Specified'} |
        <span class='fw-bold'>Airline(s):</span> ${airlineWithAircrafts.join(', ') || 'Not Specified'} |
        <span class='fw-bold'>Distance:</span> ${dataObj[key]['distance'].toFixed(2) + 'km' || 'Not Specified'} 
        </div>`
    })
}

/**
 * Displays data in airports  display div
 *
 * @param {object} dataset The data array.
 * 
 */
function displayAirports(dataset) {
    // Clear airports div content
    airportsDisplayDiv.innerHTML = '';
    if (!dataset || dataset.length === 0) {
        airportsDisplayDiv.innerHTML = "There are no airports that match this query, please try again.";
        return;
    }

    dataset.forEach((el, i) => {
        airportsDisplayDiv.innerHTML += `<div class='list-item'>
                                    ${i + 1}. 
                                    <span class='fw-bold'>ID:</span> ${el['id'] || 'Not Specified'} | 
                                    <span class='fw-bold'>Name:</span> ${el['name'] || 'Not Specified'} |
                                    <span class='fw-bold'>City:</span> ${el['city'] || 'Not Specified'} |
                                    <span class='fw-bold'>IATA:</span> ${el['iata'] || 'Not Specified'} |
                                    <span class='fw-bold'>Latitude:</span> ${el['latitude'] || 'Not Specified'} |
                                    <span class='fw-bold'>Longitude:</span> ${el['longitude'] || 'Not Specified'} |
                                    <span class='fw-bold'>Altitude:</span> ${el['altitude'] || 'Not Specified'} |
                                    <span class='fw-bold'>Timezone:</span> ${el['timezone'] || 'Not Specified'} 
                                </div>`
    })
}

/**
 * Appends data to dropdown element in DOM
 *
 * @param {object} dropdown The dropdown DOM element.
 * @param {object} dataset The data array.
 * @param {object} propOne The first relevant property of object in data array.
 * @param {object} propTwo The second relevant property of object in data array.
 * 
 */
function appendOptionsToDropdown(dropdown, dataset, propOne="", propTwo="") {
    let result = [];
    dataset.forEach(el => {
        const val = propTwo ? el[propOne][propTwo] : el[propOne];
        if (Array.isArray(val)) {
            val.forEach(e => {
                if (!result.includes(e) && e) result.push(e);
            })
        } else {
            if (!result.includes(val) && val) result.push(val);
        }
    })

    result.sort().forEach(el => {
        let opt = document.createElement("option");
        opt.value = el;
        opt.text = el;
        dropdown.add(opt, null);
    })
}


/**
 * Returns filtered flights data based on dropdown values
 *
 * @param {object} dataset The data array.
 *
 * @return {object} filtered dataset based on dropdown values
 */
function filterFlights(dataset) {
    const sourceAirportValue = sourceAirportFilter.value;
    const destinationAirportValue = destinationAirportFilter.value;
    const airlineValue = airlineFilter.value;
    const aircraftValue = aircraftFilter.value;

    let cloneData = Array.from(dataset);

    if (sourceAirportValue !== "any")  {
        cloneData = filterByOriginAirport(cloneData, sourceAirportValue) || [];
    } 
    
    if (destinationAirportValue !== "any") {
        cloneData = filterByDestinationAirport(cloneData, destinationAirportValue) || [];
    }

    if (airlineValue !== 'any') {
        cloneData = filterByAirline(cloneData, airlineValue) || [];
    }

    if (aircraftValue !== 'any') { 
        cloneData = filterByAircraft(cloneData, aircraftValue) || [];
    }

    return cloneData;
}

/**
 * Returns filtered airports data based on dropdown values
 *
 * @param {object} dataset The data array.
 *
 * @return {object} filtered dataset based on dropdown values
 */
function filterAirports(dataset) {
    const cityValue = cityFilter.value;
    const searchQuery = airportSearch.value;
    
    let cloneData = Array.from(dataset);

    if (cityValue !== "any")  {
        cloneData = filterAirportsByCity(cloneData, cityValue);
    } 

    if (searchQuery) {
        cloneData = filterAirportsByName(cloneData, searchQuery);
    }

    return cloneData;
}

async function getFlightsData() {
    try {
        const res = await fetch('./data/Combined_Data.json');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        flightsDisplayDiv.innerHTML = `<div class="text-error fw-bold">Unable to retrieve flights data. Error: ${error.message}</div>`
    }
}

async function getAirportsData() {
    try {
        const res = await fetch('./data/A2_Airports.json');
        let data = await res.json();
        return data;
    } catch(error) {
        console.log(error);
        airportsDisplayDiv.innerHTML = `<div class="text-error fw-bold">Unable to retrieve airports data. Error: ${error.message}</div>`
    }
}

getFlightsData()
.then(data => flightsData = mapData(mapData(data, mapDirectDistanceBetweenAirports)['data'], mapPairOfAirports)['data'])
.then(() => {
    displayFlights(flightsData);
    appendOptionsToDropdown(sourceAirportFilter, flightsData, 'source_airport', 'name');
    appendOptionsToDropdown(destinationAirportFilter, flightsData, 'destination_airport', 'name');
    appendOptionsToDropdown(airlineFilter, flightsData, 'airline', 'name');
    appendOptionsToDropdown(aircraftFilter, flightsData, 'aircraft');
})
.catch(error => console.log(error.message));

getAirportsData()
.then(data => airportsData = mapData(data, mapTimeZone)['data'])
.then(() => {
    displayAirports(airportsData);
    appendOptionsToDropdown(cityFilter, airportsData, 'city');
})
.catch(error => console.log(error.message));

sourceAirportFilter.addEventListener('change', (event) => {
    displayFlights(filterFlights(flightsData));
})

destinationAirportFilter.addEventListener('change', (event) => {
    displayFlights(filterFlights(flightsData));
}) 

airlineFilter.addEventListener('change', (event) => {
    displayFlights(filterFlights(flightsData));
}) 

aircraftFilter.addEventListener('change', (event) => {
    displayFlights(filterFlights(flightsData));
}) 

cityFilter.addEventListener('change', (event) => {
    displayAirports(filterAirports(airportsData));
})

airportSearch.addEventListener('input', (event) => {
    displayAirports(filterAirports(airportsData));
})









