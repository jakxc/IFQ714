const functions = require('./functions');
const getNeoByIndex = functions.getNeoByIndex;
const getNeoByDesignation = functions.getNeoByDesignation;
const getNeoByMagnitude = functions.getNeoByMagnitude;
const getNeoByPha = functions.getNeoByPha;
const getMinOrbitValue = functions.getMinOrbitValue;
const getMaxOrbitValue = functions.getMaxOrbitValue;
const getAverageOrbitValue = functions.getAverageOrbitValue;

// NEO Data constructor
function NeoData(data) {
    this.data = data;
    this.getNeoByIndex = function(index) {
        return getNeoByIndex(this.data, index);
    }
    this.getNeoByDes = function(designation) {
        return getNeoByDesignation(data, designation);
    }
    this.getNeoByMag = function(magnitude) {
        return getNeoByMagnitude(this.data, magnitude);
    }
    this.getNeoByPha = function(isPha) {
        return getNeoByPha(this.data, isPha);
    }
    this.getMinOrbitValue = function(orbitProp) {
        return getMinOrbitValue(this.data, orbitProp);
    } 
    this.getMaxOrbitValue = function(orbitProp) {
        return getMaxOrbitValue(this.data, orbitProp);
    } 
    this.getAverageOrbitValue = function(orbitProp) {
        return getAverageOrbitValue(this.data, orbitProp);
    }
}

module.exports = NeoData




