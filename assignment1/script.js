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
    
    const phaNeoData = new NeoData(phaArr);
    console.table(phaNeoData.getMaxOrbitValue('h_mag'));

    // Determine minimum/maximum/average q_au_1 values of all PHA is dataset
    const minPhaQ1 = phaNeoData.getMinOrbitValue("q_au_1") ? phaNeoData.getMinOrbitValue("q_au_1")[0]["q_au_1"] : null;
    const maxPhaQ1 = phaNeoData.getMaxOrbitValue("q_au_1") ? phaNeoData.getMaxOrbitValue("q_au_1")[0]["q_au_1"] : null;
    const avgPhaQ1 = +phaNeoData.getAverageOrbitValue("q_au_1").toFixed(3);

    // Determine minimum/maximum/average q_au_2 values of all PHA is dataset
    const minPhaQ2 = phaNeoData.getMinOrbitValue("q_au_2") ? phaNeoData.getMinOrbitValue("q_au_2")[0]["q_au_2"] : null;
    const maxPhaQ2 = phaNeoData.getMaxOrbitValue("q_au_2") ? phaNeoData.getMaxOrbitValue("q_au_1")[0]["q_au_2"] : null;
    const avgPhaQ2 = +phaNeoData.getAverageOrbitValue("q_au_2").toFixed(3);
    
    // Determine minimum/maximum/average Minimum Orbit Intersection Distance (MOID) of all PHA is dataset
    const minPhaMoid = phaNeoData.getMinOrbitValue("moid_au") ? phaNeoData.getMinOrbitValue("moid_au")[0]["moid_au"] : null;
    const maxPhaMoid = phaNeoData.getMaxOrbitValue("moid_au") ? phaNeoData.getMaxOrbitValue("moid_au")[0]["moid_au"] : null;
    const avgPhaMoid = +phaNeoData.getAverageOrbitValue("moid_au").toFixed(3);

    // Determine minimum/maximum/average observed magnitude (or brightness) (h_mag) of all PHA is dataset
    const minPhaMag = phaNeoData.getMinOrbitValue("h_mag") ? phaNeoData.getMinOrbitValue("h_mag")[0]["h_mag"] : null;
    const maxPhaMag = phaNeoData.getMaxOrbitValue("h_mag") ? phaNeoData.getMaxOrbitValue("h_mag")[0]["h_mag"] : null;
    const avgPhaMag = +phaNeoData.getAverageOrbitValue("h_mag").toFixed(3);

    const phaDataObj = {} 
    phaDataObj["min q1"] = minPhaQ1;
    phaDataObj["max q1"] = maxPhaQ1;
    phaDataObj["avg q1"] = avgPhaQ1;
    phaDataObj["min q2"] = minPhaQ2;
    phaDataObj["max q2"] = maxPhaQ2;
    phaDataObj["avg q2"] = avgPhaQ2;
    phaDataObj["min moid"] = minPhaMoid;
    phaDataObj["max moid"] = maxPhaMoid;
    phaDataObj["avg moid"] = avgPhaMoid;
    phaDataObj["min mag"] = minPhaMag;
    phaDataObj["max mag"] = maxPhaMag;
    phaDataObj["avg mag"] = avgPhaMag;

    console.table(phaDataObj);
    
    // Determine minimum/maximum/average of all orbit values and of all NEO classes in dataset
    const newDataObj = {};
    for (const key in sortedDataByClass) {
      const tempDataObj = {};
      const neoClassArr = sortedDataByClass[key];
      const neoDataObj = new NeoData(neoClassArr);
     
      const minQ1 = neoDataObj.getMinOrbitValue("q_au_1") ? neoDataObj.getMinOrbitValue("q_au_1")[0]["q_au_1"] : null;
      const minQ2 = neoDataObj.getMinOrbitValue("q_au_2") ? neoDataObj.getMinOrbitValue("q_au_2")[0]["q_au_2"] : null;
      const minMoid = neoDataObj.getMinOrbitValue("moid_au") ? neoDataObj.getMinOrbitValue("moid_au")[0]["moid_au"] : null;
      const minMag = neoDataObj.getMinOrbitValue("h_mag") ? neoDataObj.getMinOrbitValue("h_mag")[0]["h_mag"] : null;
      const minPeriodYr = neoDataObj.getMinOrbitValue("period_yr") ? neoDataObj.getMinOrbitValue("period_yr")[0]["period_yr"] : null;

      const maxQ1 = neoDataObj.getMaxOrbitValue("q_au_1") ? neoDataObj.getMaxOrbitValue("q_au_1")[0]["q_au_1"] : null;
      const maxQ2 = neoDataObj.getMaxOrbitValue("q_au_2") ? neoDataObj.getMaxOrbitValue("q_au_2")[0]["q_au_2"] : null;
      const maxMoid = neoDataObj.getMaxOrbitValue("moid_au") ? neoDataObj.getMaxOrbitValue("moid_au")[0]["moid_au"] : null;
      const maxMag = neoDataObj.getMaxOrbitValue("h_mag") ? neoDataObj.getMaxOrbitValue("h_mag")[0]["h_mag"] : null;
      const maxPeriodYr = neoDataObj.getMaxOrbitValue("period_yr") ? neoDataObj.getMaxOrbitValue("period_yr")[0]["period_yr"] : null;

      const avgQ1 = neoDataObj.getAverageOrbitValue("q_au_1") ? +neoDataObj.getAverageOrbitValue("q_au_1").toFixed(3) : null;
      const avgQ2 = neoDataObj.getAverageOrbitValue("q_au_2") ? +neoDataObj.getAverageOrbitValue("q_au_2").toFixed(3) : null;
      const avgMoid = neoDataObj.getAverageOrbitValue("moid_au") ? +neoDataObj.getAverageOrbitValue("moid_au").toFixed(3) : null;
      const avgMag = neoDataObj.getAverageOrbitValue("h_mag") ? +neoDataObj.getAverageOrbitValue("h_mag").toFixed(3) : null;
      const avgPeriodYr = neoDataObj.getAverageOrbitValue("period_yr") ? +neoDataObj.getAverageOrbitValue("period_yr").toFixed(3) : null;
      
      // q_au_1 values
      tempDataObj["min q1"] = minQ1;
      tempDataObj["max q1"] = maxQ1;
      tempDataObj["avg q1"] = avgQ1;

      // q_au_2 values
      tempDataObj["min q2"] = minQ2;
      tempDataObj["max q2"] = maxQ2;
      tempDataObj["avg q2"] = avgQ2;

      // moid values
      tempDataObj["min moid"] = minMoid;
      tempDataObj["max moid"] = maxMoid;
      tempDataObj["avg moid"] = avgMoid;

      // period_yr values
      tempDataObj["min period"] = minPeriodYr;
      tempDataObj["max period"] = maxPeriodYr;
      tempDataObj["avg period"] = avgPeriodYr;

      newDataObj[key] = tempDataObj;    
    }

    console.table(newDataObj);

    // // Determine minimum and maximum perihelion distance (q_au_1) of all Amors in dataset
    // const amorArr = sortedDataByClass["Amor"];
    // const amorDataObj = new NeoData(amorArr);
    // const minQ1AmorArr = new NeoData(amorDataObj.getMinOrbitValue("q_au_1"));
    // const maxQ1AmorArr = new NeoData(amorDataObj.getMaxOrbitValue("q_au_1"));
    // minQ1AmorArr.displayAllNeoInfo(); 
    // maxQ1AmorArr.displayAllNeoInfo(); 

    // // Determine the maximum perihelion distance (q_au_1) of all Apollos in dataset
    // const apolloArr = sortedDataByClass["Apollo"];
    // const apolloDataObj = new NeoData(apolloArr);
    // const maxQ1ApolloArr = new NeoData(apolloDataObj.getMaxOrbitValue("q_au_1"));
    // maxQ1ApolloArr.displayAllNeoInfo();
}

main();