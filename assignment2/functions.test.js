const functions = require('./functions');
const getAirportById = functions.getAirportById;
const getAirportByIata = functions.getAirportByIata;
const filterByOriginCity = functions.filterByOriginCity;
const filterByDestinationCity = functions.filterByDestinationCity;
const filterByAirline = functions.filterByAirline;
const filterByAircraft = functions.filterByAircraft;
const mapDirectDistanceBetweenAirports = functions.mapDirectDistanceBetweenAirports;
const mapPairOfAirports = functions.mapPairOfAirports;


// getAirportById tests
describe('The getAirportById() method', function () {
  const tempData = [
    {"id": 3317, "name": "A1", "city": "Brisbane", "country": "Australia"}, 
    {"id": 1245, "name": "A2", "city": "Melbourne", "country": "Australia"},
    {"id": 6545, "name": "A3", "city": "Sydney", "country": "Australia"}
  ]

  test ('Input of data and id, output should return element with target id', () => {
    expect(getAirportById(tempData, 3317)).toEqual({
      "id": 3317,
      "name": "A1",
      "city": "Brisbane",
      "country": "Australia",
    });
  });

  test ('Input of data and invalid id, output should return null', () => {
    expect(getAirportById(tempData, 1111)).toBeNull();
  });
});

// getAirportByIata tests
describe('The getAirportByIata() method', function () {
  const tempData = [
    {"iata": "ABC", "name": "A1", "city": "Brisbane", "country": "Australia"}, 
    {"iata": "DFG", "name": "A2", "city": "Melbourne", "country": "Australia"},
    {"iata": "HIJ", "name": "A3", "city": "Sydney", "country": "Australia"}
  ]

  test ('Input of data and iata, output should return element with target iata', () => {
    expect(getAirportByIata(tempData, "DFG")).toEqual({
      "iata": "DFG", 
      "name": "A2", 
      "city": "Melbourne", 
      "country": "Australia"
    });
  });

  test ('Input of data and invalid id, output should return null', () => {
    expect(getAirportByIata(tempData, "Invalid iata")).toBeNull();
  });
});

// filterByOriginCity tests
describe('The filterByOriginCity() method', function () {
  const tempData = [
    {"source_airport":{"city":"Adelaide","country":"Australia"},"destination_airport":{"city":"Argyle","country":"Australia"}}, 
    {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Melbourne","country":"Australia"}},
    {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Sydney","country":"Australia"}}
  ]

// Test with an input of data and city will return flights with target origin city
  test ('Input of data and city, output should return elements with target origin city', () => {
    expect(filterByOriginCity(tempData, "Brisbane")).toEqual([ 
      {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Melbourne","country":"Australia"}},
      {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Sydney","country":"Australia"}}
    ]);
  });

  test ('Input of data and city, output should return array with length of number of elements with target origin city', () => {
    expect(filterByOriginCity(tempData, "Brisbane")).toHaveLength(2);
  });

  test ('Input of data and invalid city, output should return null', () => {
    expect(filterByOriginCity(tempData, "Invalid city")).toBeNull();
  });
});

// filterByDestinationCity tests
describe('The filterByDestinationCity() method', function () {
  const tempData = [
    {"source_airport":{"city":"Adelaide","country":"Australia"},"destination_airport":{"city":"Argyle","country":"Australia"}}, 
    {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Melbourne","country":"Australia"}},
    {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Sydney","country":"Australia"}}
  ]

  test ('Input of data and city, output should return elements with target destination city', () => {
    expect(filterByDestinationCity(tempData, "Melbourne")).toEqual([ 
      {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Melbourne","country":"Australia"}},
    ]);
  });

  test ('Input of data and city, output should return array with length of number of elements with target destination city', () => {
    expect(filterByDestinationCity(tempData, "Melbourne")).toHaveLength(1);
  });

  test ('Input of data and invalid city, output should return null', () => {
    expect(filterByDestinationCity(tempData, "Invalid city")).toBeNull();
  });
});

//filterByAirline tests
describe('The filterByAirline() method', function () {
  const tempData = [
    {"airline":{"code":"AB","name":"Airline1","country":"Australia"}}, 
    {"airline":{"code":"CD","name":"Airline2","country":"Australia"}},
    {"airline":{"code":"EF","name":"Airline3","country":"Australia"}},
    {"airline":{"code":"GH","name":"Airline1","country":"Australia"}},
    {"airline":{"code":"IJ","country":"Australia"}},
    {"no_property": null}
  ]

  test ('Input of data and airline, output should return elements with target airline', () => {
    expect(filterByAirline(tempData, "Airline1")).toEqual([ 
      {"airline":{"code":"AB","name":"Airline1","country":"Australia"}}, 
      {"airline":{"code":"GH","name":"Airline1","country":"Australia"}}
    ]);
  });

  test ('Input of data and airline, output should return array with length of number of elements with target airline', () => {
    expect(filterByAirline(tempData, "Airline3")).toHaveLength(1);
  });

  test ('Input of data and invalid airline, output should return null', () => {
    expect(filterByAirline(tempData, "Invalid airline")).toBeNull();
  });
});

//filterByAircraft tests
describe('The filterByAircraft() method', function () {
  const tempData = [
    {"aircraft":["A1", "A2"]}, 
    {"aircraft":["A3"]},
    {"aircraft":["A1"]},
    {"aircraft":["A2"]},
    {"no_property": null}
  ]

  test ('Input of data and aircraft, output should return elements with target aircraft', () => {
    expect(filterByAircraft(tempData, "A1")).toEqual([ 
      {"aircraft":["A1", "A2"]}, 
      {"aircraft":["A1"]}
    ]);
  });

  test ('Input of data and aircrafte, output should return array with length of number of elements with target aircraft', () => {
    expect(filterByAircraft(tempData, "A3")).toHaveLength(1);
  });

  test ('Input of data and invalid aircraft, output should return null', () => {
    expect(filterByAircraft(tempData, "Invalid aircraft")).toBeNull();
  });
});

