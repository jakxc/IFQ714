const functions = require('./functions');
const tempData = [
{ designation: "123", orbit_class: "Apollo", period_yr: 4.06, pha: true},
{ designation: "345", orbit_class: "Apollo", period_yr: 4.06, pha: true},
{ designation: "567", orbit_class: "Aten", period_yr: 4.06, pha: true},
{ designation: "789", orbit_class: "Amor", period_yr: 4.06, pha: true},
{ designation: "012", orbit_class: "Amor", period_yr: 4.06, pha: true},]

const getNeoByIndex = functions.getNeoByIndex;
const getNeoByDesignation = functions.getNeoByDesignation;
const getNeoByClass = functions.getNeoByClass;

// Test with an input of 0 for getNeoByIndex
test ('Input of data and index, output should return element at that index in data', () => {
    expect(getNeoByIndex(tempData, 0)).toEqual({ designation: "123", orbit_class: "Apollo", period_yr: 4.06, pha: true});
});

// Test with an input of 0 for getNeoByIndex
test ('Input of data and invalid index, output should return null', () => {
  expect(getNeoByIndex(tempData, -1)).toBeNull();
});

test ('Input of data and designation value, output of element with matching designation', () => {
  expect(getNeoByDesignation(tempData, "567")).toEqual([
    { designation: "567", orbit_class: "Aten", period_yr: 4.06, pha: true}
  ])
})

test ('Input of data and invalid designation value, output should be null', () => {
  expect(getNeoByDesignation(tempData, "abc")).toBeNull();
})

test ('Input of data and orbit_class, output of element with matching orbit_class in data', () => {
  expect(getNeoByClass(tempData, "Amor")).toEqual([
    { designation: "789", orbit_class: "Amor", period_yr: 4.06, pha: true},
    { designation: "012", orbit_class: "Amor", period_yr: 4.06, pha: true}
  ])
})

test ('Input of data and orbit_class, output should have length equal to number of elements with matching class', () => {
  expect(getNeoByClass(tempData, "Apollo")).toHaveLength(2);
})