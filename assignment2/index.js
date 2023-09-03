import { filterByOriginCity, filterByDestinationCity,  filterByAirline, filterByAircraft } from './functions.js';

const sourceAirportFilter = document.querySelector("#filterSourceAirportSelect");
const destinationAirportFilter = document.querySelector("#filterDestinationAirportSelect");
const airlineFilter = document.querySelector("#filterAirlineSelect");
const aircraftFilter = document.querySelector('#filterAircraftSelect');
const cityFilter = document.querySelector("#filterCitySelect");
const flightsDisplayDiv = document.querySelector("#flightFilterDisplayDiv");

let flightsData = [];
let airportsData = [];

function mapData(dataset, callback) {
    return callback(dataset);
}

function displayFlightsData() {
    flightsDisplayDiv.innerHTML = '';
    if (!flightsData || flightsData.length === 0) {
        flightsDisplayDiv.innerHTML = "There are no flights that match this query, please try again.";
    }

    flightsData.forEach((el, i) => {
        flightsDisplayDiv.innerHTML += `<div>${i}. Source Airport: ${el['source_airport']}(${el["source_airport_id"]}) 
                                    Destination Airport: ${el['destination_airport']}(${el["destination_airport_id"]}) 
                                    Aircraft/s: ${el['aircraft'].join(', ')}
                                    Airline: ${el['airline_name']}
                                </div>`
    })
}


function appendOptionsToDropdown(dropdown, callback, dataset) {
    const mappedData = dataset.map(callback); 
    let result = [];
    mappedData.forEach((el) => {
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

async function setFlightsData() {
    try {
        const res = await fetch('./A2_Flights.json');
        let data = await res.json();
        flightsData = data;
        appendOptionsToDropdown(sourceAirportFilter, (el) => el['source_airport'] ? el['source_airport'] : '', flightsData);
        appendOptionsToDropdown(destinationAirportFilter, (el) => el['destination_airport'] ? el['destination_airport'] : '', flightsData);
        appendOptionsToDropdown(airlineFilter, (el) => el['airline'] ? el['airline'] : '', flightsData);
        appendOptionsToDropdown(aircraftFilter, (el) => el['aircraft'] ? el['aircraft'] : [], flightsData);
    } catch (error) {
        console.log(error);
    }
}

async function setAirportsData() {
    try {
        const res = await fetch('./A2_Airports.json');
        let data = await res.json();
        airportsData = data;
        appendOptionsToDropdown(cityFilter, (el) => el['city'] ? el['city'] : '', airportsData);
    } catch (error) {
        console.log(error);
    }
}

setFlightsData();
setAirportsData();

sourceAirportFilter.addEventListener('change', (event) => {
    if (event.target.value === 'any') { 
        displayFlightsData(flightsData);
        return;
    }

    flightsData = mapData(flightsData, (dataset) => dataset.filter(flight => flight['source_airport'] === event.target.value));
    displayFlightsData(flightsData);
    console.log(flightsData);
})

destinationAirportFilter.addEventListener('change', (event) => {
    if (event.target.value === 'any')  { 
        displayFlightsData(flightsData);
        return;
    }
    
    flightsData = mapData(flightsData, (dataset) => dataset.filter(flight => flight['destination_airport'] === event.target.value));
    displayFlightsData(flightsData);
    console.log(flightsData);
})





