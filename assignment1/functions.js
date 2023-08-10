// Step 2
function getNeoByIndex(dataSet, index) {   
    return dataSet[index] ? dataSet[index] : null;
}

function getNeoByDesignation(dataSet, designation) {
    return dataSet.filter(neo => neo['designation'] === designation).length > 0 
            ? dataSet.filter(neo => neo['designation'])
            : null;
}

function getNeoByMagnitude(dataSet, magnitude) {
    return dataSet.filter(neo => neo['h_mag'] >= magnitude).length > 0
            ? dataSet.filter(neo => neo['h_mag'] >= magnitude)
            : null;
}

function getNeoByPha(dataSet, isPha) {   
    return dataSet.filter(neo => neo['pha'] === isPha).length > 0
            ? dataSet.filter(neo => neo['pha'] === isPha)
            : null;
}

function getNeoByClass(dataSet, orbitClass) {   
    return dataSet.filter(neo => neo["orbit_class"].replace("*", "") === orbitClass).length > 0
            ? dataSet.filter(neo => neo["orbit_class"].replace("*", "") === orbitClass)
            : null;
} 

function getMinOrbitValue(dataSet, orbitProp) {
    const orbitalValues = dataSet.map(el => el[orbitProp]).filter(el => typeof el === 'number');
    if (orbitalValues.length === 0) return null;
    const minOrbitalValue = Math.min(...orbitalValues);
    // console.log(minOrbitalPeriod);
    return dataSet.filter(neo => neo[orbitProp] === minOrbitalValue);
} 

function getMaxOrbitValue(dataSet, orbitProp) {
    const orbitalValues = dataSet.map(el => el[orbitProp]).filter(el => typeof el === 'number');
    if (orbitalValues.length === 0) return null;
    const maxOrbitalValue = Math.max(...orbitalValues);
    // console.log(minOrbitalPeriod);
    return dataSet.filter(neo => neo[orbitProp] === maxOrbitalValue);
} 

function getAverageOrbitValue(dataSet, orbitProp) {
    const validData = dataSet.filter(el => typeof el[orbitProp] === 'number')
    const totalSize = validData.length;
    const totalSum = validData
                        .map(neo => neo[orbitProp])
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
        console.log(`${neo} cannot be found in the data set`); 
    }
}

// Step 4
function arrangeNeoByClass(dataSet) {
    let classObj = {};

    for (const neo of dataSet) {
        const orbitClass = neo['orbit_class'].replace("*", "");
        classObj[orbitClass] = getNeoByClass(dataSet, orbitClass); 
    } 

    return classObj;
}

module.exports = {
    getNeoByIndex: getNeoByIndex,
    getNeoByDesignation: getNeoByDesignation,
    getNeoByMagnitude: getNeoByMagnitude,
    getNeoByPha: getNeoByPha,
    getNeoByClass: getNeoByClass,
    getMinOrbitValue: getMinOrbitValue,
    getMaxOrbitValue: getMaxOrbitValue,
    getAverageOrbitValue: getAverageOrbitValue,
    displayNeoInfo: displayNeoInfo,
    arrangeNeoByClass: arrangeNeoByClass,
}

