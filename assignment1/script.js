// Step 1
const fs = require('fs');
const functions = require('./functions');
const NeoData = require('./neodataconstructor');
const parseData = functions.parseData;
const displayNeoInfo = functions.displayNeoInfo;
const arrangeNeoByClass = functions.arrangeNeoByClass;

const data = fs.readFileSync("NEOWISE_Dataset.json", "utf8");

function exportDataToFile(filename, dataSet) {
    const stringifiedData = JSON.stringify(dataSet);
    fs.writeFile(filename, stringifiedData, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully");
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
      if (neoDataObj.getNeoByPha(true)) {
        phaArr.push(...neoDataObj.getNeoByPha(true));
      }
    }

    const phaDataObj = new NeoData(phaArr);
    // Determine maximum Minimum Orbit Intersection Distance (MOID) of all PHA is dataset
    const maxMoidPhaObj = new NeoData(phaDataObj.getMaxOrbitValue("moid_au"));
    // maxMoidPhaObj.displayAllNeoInfo();

    // Determine minimum observed magnitude or brightness (h_mag) of all PHA is dataset
    const minMagPhaObj = new NeoData(phaDataObj.getMaxOrbitValue("h_mag"));
    // minMagPhaObj.displayAllNeoInfo();

    // Determine minimum and maximum perihelion distance (q_au_1) of all Amors in dataset
    const amorArr = sortedDataByClass["Amor"];
    const amorDataObj = new NeoData(amorArr);
    const minQ1AmorArr = new NeoData(amorDataObj.getMinOrbitValue("q_au_1"));
    const maxQ1AmorArr = new NeoData(amorDataObj.getMaxOrbitValue("q_au_1"));
    // minQ1AmorArr.displayAllNeoInfo(); 
    // maxQ1AmorArr.displayAllNeoInfo(); 

    // Determine the maximum perihelion distance (q_au_1) of all Apollos in dataset
    // const apolloArr = sortedDataByClass["Apollo"];
    // const apolloDataObj = new NeoData(apolloArr);
    // const maxQ1ApolloArr = new NeoData(apolloDataObj.getMaxOrbitValue("q_au_1"));
    // maxQ1ApolloArr.displayAllNeoInfo();

    console.log(functions.getNeoByClass(parseData(data), "Parabolic Comet"))
}

main();