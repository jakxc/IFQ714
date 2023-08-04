// Step 1
const fs = require('fs');
const data = fs.readFileSync("NEOWISE_Dataset.json", "utf8");

function parseData(dataToBeParsed) {
    return JSON.parse(dataToBeParsed)
}

// Step 2
function getNeoByIndex(index) {   
    const parsedData = parseData(data);
    return parsedData[index];
}

function getNeoByClass(c) {   
    const parsedData = parseData(data);
    return parsedData.filter(neo => neo['orbit_class'] === c);
} 

function getNeoByPha(isPha) {   
    const parsedData = parseData(data);
    return parsedData.filter(neo => neo['pha'] === isPha);
}

function getNeoByMagnitude(magnitude) {
    const parsedData = JSON.parse(data);
    return parsedData.filter(neo => neo['h_mag'] >= magnitude);
}

// console.log(getNeoByMagnitude(20));

