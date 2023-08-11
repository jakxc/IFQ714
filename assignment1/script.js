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
    // exportDataToFile('NEOCLASSES_Dataset.json', classData);

    const sortedDataByClass = JSON.parse(fs.readFileSync("NEOCLASSES_Dataset.json", "utf8"));

    // Display information on all NEOs in the dataset (based all class);
    // for (const key in sortedDataByClass) {
    //   const neoClassArr = sortedDataByClass[key];
    //   const neoDataObj = new NeoData(neoClassArr);
    //   for (let i=0; i<neoClassArr.length; i++) {
    //     neoDataObj.displayNeoInfo(neoClassArr[i]);
    //   }
    // }


    // Display all NEOs that are a PHA and store them in array for analysis
    const phaArr = [];
    for (const key in sortedDataByClass) {
      const neoClassArr = sortedDataByClass[key];
      const neoDataObj = new NeoData(neoClassArr);
      for (let i=0; i<neoClassArr.length; i++) {
        // If the NEO class has any NEOs that are classified as PHA, display them in console
        if (neoDataObj.getNeoByPha(true)) {
          console.log(neoDataObj.getNeoByPha(true));
          phaArr.push(...neoDataObj.getNeoByPha(true));
        }
      }
    }
}

main();