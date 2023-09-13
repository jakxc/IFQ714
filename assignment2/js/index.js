import { 
    mapData, 
    filterByOriginAirport, 
    filterByDestinationAirport,  
    filterByAirline, 
    filterByAircraft, 
    mapDirectDistanceBetweenAirports, 
    filterAirportsByCity,
    filterAirportsByName,
    mapPairOfAirports
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

function groupDataByAirportPairs(dataset) {
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

function displayFlights(dataset) {
    // Clear flights div content
    flightsDisplayDiv.innerHTML = '';
    if (!dataset || dataset.length === 0) {
        flightsDisplayDiv.innerHTML = "There are no flights that match this query, please try again.";
        return;
    }

    const dataObj = groupDataByAirportPairs(dataset);

    Object.keys(dataObj).forEach((key, i) => {
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

function appendOptionsToDropdown(dropdown, callback, dataset) {
    const mappedData = dataset.map(callback); 
    let result = [];
    mappedData.forEach(el => {
        if (Array.isArray(el)) {
            el.forEach(e => {
                if (!result.includes(e) && e) result.push(e);
            })
        } else {
            if (!result.includes(el) && el) result.push(el);
        }
    })

    result.sort().forEach((el, i) => {
        let opt = document.createElement("option");
        opt.value = el;
        opt.text = el;
        dropdown.add(opt, null);
    })
}

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
        const res = await fetch('./Combined_Data.json');
        let data = await res.json();
        return data.map(mapDirectDistanceBetweenAirports).map(mapPairOfAirports);
    } catch (error) {
        console.log(error);
    }
}

async function getAirportsData() {
    try {
        const res = await fetch('./A2_Airports.json');
        let data = await res.json();
        return mapData(data, mapDirectDistanceBetweenAirports)['data'];
    } catch(error) {
        console.log(error);
    }
}

getFlightsData()
.then(data => flightsData = data)
.then(() => {
    displayFlights(flightsData);
    appendOptionsToDropdown(sourceAirportFilter, (el) => el['source_airport']['name'], flightsData);
    appendOptionsToDropdown(destinationAirportFilter, (el) => el['destination_airport']['name'], flightsData);
    appendOptionsToDropdown(airlineFilter, (el) => el['airline']['name'], flightsData);
    appendOptionsToDropdown(aircraftFilter, (el) => el['aircraft'], flightsData);
})
.catch(error => console.log(error));

getAirportsData()
.then(data => airportsData = data)
.then(() => {
    displayAirports(airportsData);
    appendOptionsToDropdown(cityFilter, (el) => el['city'], airportsData);
})
.catch(error => console.log(error));

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









