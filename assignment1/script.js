// Step 1
const fs = require('fs');
const data = fs.readFileSync("NEOWISE_Dataset.json", "utf8");

function parseData(dataSet) {
    return JSON.parse(dataSet);
}

// Step 2

function getNeoByIndex(dataSet, index) {   
    return dataSet[index] ? dataSet[index] : null;
}

function getNeoByDesignation(dataSet, designation) {
    return dataSet.filter(neo => neo['designation'] === designation).length > 0 
            ? dataSet.filter(neo => neo['designation'])
            : null;
}

function getNeoByClass(dataSet, orbitClass) {   
    return dataSet.filter(neo => neo["orbit_class"].includes(orbitClass)).length > 0
            ? dataSet.filter(neo => neo["orbit_class"].includes(orbitClass))
            : null;
} 

function getNeoByPha(dataSet, isPha) {   
    return dataSet.filter(neo => neo['pha'] === isPha).length > 0
            ? dataSet.filter(neo => neo['pha'] === isPha)
            : null;
}

function getNeoByMagnitude(dataSet, magnitude) {
    return dataSet.filter(neo => neo['h_mag'] >= magnitude).length > 0
            ? dataSet.filter(neo => neo['h_mag'] >= magnitude)
            : null;
}

function getMinOrbitValue(dataSet, orbitValue) {
    const orbitalValues = dataSet.map(el => el[orbitValue]).filter(el => typeof el === 'number');
    if (orbitalValues.length === 0) return null;
    const minOrbitalValue = Math.min(...orbitalValues);
    // console.log(minOrbitalPeriod);
    return dataSet.filter(neo => neo[orbitValue] === minOrbitalValue);
} 

function getMaxOrbitValue(dataSet, orbitValue) {
    const orbitalValues = dataSet.map(el => el[orbitValue]).filter(el => typeof el === 'number');
    if (orbitalValues.length === 0) return null;
    const maxOrbitalValue = Math.max(...orbitalValues);
    // console.log(minOrbitalPeriod);
    return dataSet.filter(neo => neo[orbitValue] === maxOrbitalValue);
} 

function getAverageOrbitValue(dataSet, orbitValue) {
    const totalSize = dataSet.length;
    const totalSum = dataSet
                        .map(neo => neo[orbitValue])
                        .reduce((acc, curr) => acc + curr, 0);

    return totalSum / totalSize;
}

function displayNeoInfo(neo) {    
    if (neo) {
        console.table(neo);
        console.log(`Designation: ${neo.designation}
        Discovery date: ${neo.discovery_date}
        H_Mag: ${neo.h_mag}
        MOID(AU): ${neo.moid_au}
        Perihelion distance: ${neo.q_au_1}
        Aphelion distance: ${neo.q_au_2}
        Orbital period: ${neo.period_yr}
        Orbital inclination: ${neo.i_deg}
        PHA: ${neo.pha}
        Orbit class: ${neo.orbit_class}`);
    } else {
        console.log(`There is no NEO found at index ${index}`); 
    }
}

console.log(getNeoByClass(parseData(data), "Apollo"));

// Step 4
function arrangeDataByClass(dataSet) {
    let classObj = {};

    for (const neo of dataSet) {
        const orbitClass = neo['orbit_class']
        classObj[orbitClass] = getNeoByClass(dataSet, orbitClass); 
    } 

    return classObj;
}

console.log(arrangeDataByClass(parseData(data)));

// NEO List constructor
function NeoData(data) {
    this.data = data;
    this.getNeoByIndex = function(index) {
        getNeoByIndex(this.data, index);
    }
    this.getNeoByDes = function(designation) {
        getNeoByDesignation(this.data, designation);
    }
    this.getNeoByMag = function(magnitude) {
        getNeoByMagnitude(this.data, magnitude);
    }
    this.getNeoByPha = function(isPha) {
        getNeoByPha(this.data, isPha);
    }
    this.getMinOValue = function(orbitValue) {
        getMinOrbitValue(this.data, orbitValue);
    } 
    this.getMaxOValue = function(orbitValue) {
        getMaxOrbitValue(this.data, orbitValue);
    } 
}

