const sourceAirportFilter = document.querySelector("#filterSourceAirportSelect");
const destinationAirportFilter = document.querySelector("#filterDestinationAirportSelect")
const displayDiv = document.querySelector("#flightFilterDisplayDiv");

let dataset = [];

function appendOptionsToDropdown(dropdown, prop) {
    const sourceAiportNames = [...new Set(dataset.map(el => el[prop]['name'] || '').filter(el => el.length > 0))]; 
    sourceAiportNames.sort().forEach((el, i) => {
        let opt = document.createElement("option");
        opt.value = i;
        opt.text = el;
        dropdown.add(opt, null);
    })
}

fetch('./Combined_Data.json')
    .then(res => res.json())
    .then(data => {
        dataset = data;
        appendOptionsToDropdown(sourceAirportFilter, 'source_airport');
        appendOptionsToDropdown(destinationAirportFilter, 'destination_airport')
    });





