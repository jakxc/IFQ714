const fs = require('fs');
const functions = require('./functions');
const data = fs.readFileSync("NEOWISE_Dataset.json", "utf8");

const getNeoByIndex = functions.getNeoByIndex;
const getNeoByDesignation = functions.getNeoByDesignation;
const getNeoByMagnitude = functions.getNeoByMagnitude;
const getNeoByPha = functions.getNeoByPha;