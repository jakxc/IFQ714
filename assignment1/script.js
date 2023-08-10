// Step 1
const fs = require('fs');
const functions = require('./functions');
const NeoData = require('./neodataconstructor');
const arrangeNeoByClass = functions.arrangeNeoByClass;

const data = fs.readFileSync("NEOWISE_Dataset.json", "utf8");

function parseData(dataSet) {
    return JSON.parse(dataSet);
}

function exportDataToFile(filename, dataSet) {
    const stringifiedData = JSON.stringify(dataSet);
    fs.writeFile(filename, stringifiedData, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        //   console.log("The written file has the following contents:");
        //   console.log(fs.readFileSync(filename, "utf8"));
        }
    });
}

function main() {
    // Step 3 and 4
    // const neoData = parseData(data);
    // const classData = arrangeNeoByClass(neoData);
    // exportDataToFile('NEOCLASSES_Dataset.txt', classData);

    const sortedData = JSON.parse(fs.readFileSync("NEOCLASSES_Dataset.txt", "utf8"));
    const amor = new NeoData(sortedData['Amor']);
    console.log(amor.getAverageOrbitValue('period_yr'));
}

main();