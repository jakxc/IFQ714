// Step 1
const fs = require('fs');
const data = fs.readFileSync("NEOWISE_Dataset.json", "utf8");

function parseData(dataSet) {
    return JSON.parse(dataSet)
}

// Step 2
function getNeoByIndex(index) {   
    const parsedData = parseData(data);
    return parsedData[index] ? parsedData[index] : `No NEO found at index ${index}`;
}

function getNeoByDesignation(designation) {
    const parsedData = parseData(data);
    return parsedData.filter(neo => neo['designation'] === designation).length > 0 
            ? parsedData.filter(neo => neo['designation'])
            : `No NEO found with designation ${designation}`;
}

function getNeoByClass(orbitClass) {   
    const parsedData = parseData(data);
    return parsedData.filter(neo => neo['orbit_class'] === orbitClass) > 0
            ? parsedData.filter(neo => neo['orbit_class'] === orbitClass)
            : `No NEO found with orbit class ${orbitClass}`;
} 

function getNeoByPha(isPha) {   
    const parsedData = parseData(data);
    return parsedData.filter(neo => neo['pha'] === isPha).length > 0
            ? parsedData.filter(neo => neo['pha'] === isPha)
            : isPha ? 'No NEO found that is potentially hazardous asteroid (PHA)' : 'No NEO found that is non-potentially hazardous asteroid (PHA)';
}

function getNeoByMagnitude(magnitude) {
    const parsedData = JSON.parse(data);
    return parsedData.filter(neo => neo['h_mag'] >= magnitude).length > 0
            ? parsedData.filter(neo => neo['h_mag'] >= magnitude)
            : `No NEO found that has magnitude equal or greater than ${magnitude}`;
}

function displayNeoInfo(index) {
    const neo = getNeoByIndex(index);
    
    if (typeof neo === "object") {
        console.table(neo);
        console.log(`Designation: ${neo.designation}\nDiscovery date: ${neo.discovery_date}\nH_Mag: ${neo.h_mag}\nMOID(AU): ${neo.moid_au}\nPerihelion distance: ${neo.q_au_1}\nAphelion distance: ${neo.q_au_2}\nOrbital period: ${neo.period_yr}\nOrbital inclination: ${neo.i_deg}\nPHA: ${neo.pha}\nOrbit class: ${neo.orbit_class}`);
    } else {
        console.log(neo); // Log the unable to find NEO at index error message
    }
}

displayNeoInfo(-1);

