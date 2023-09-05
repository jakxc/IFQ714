import { 
  getAirportById, 
  getAirportByIata, 
  filterByOriginCity, 
  filterByDestinationCity, 
  filterByOriginAirport,
  filterByDestinationAirport,
  filterByAirline, 
  filterByAircraft 
} from './functions';


// getAirportById tests
describe('The getAirportById() method', function () {
  const tempData = [
    {"id": 3317, "name": "A1", "city": "Brisbane", "country": "Australia"}, 
    {"id": 1245, "name": "A2", "city": "Melbourne", "country": "Australia"},
    {"id": 6545, "name": "A3", "city": "Sydney", "country": "Australia"}
  ]

  test ('Input of data and existing id, output should return element with target id', () => {
    expect(getAirportById(tempData, 3317)).toEqual({
      "id": 3317,
      "name": "A1",
      "city": "Brisbane",
      "country": "Australia",
    });
  });

  test ('Input of data and non-exisiting id, output should return null', () => {
    expect(getAirportById(tempData, 987654321)).toBeNull();
  });

  test ('Input of data and invalid id, should throw TypeError', () => {
    expect(() => getAirportById(tempData, 'invalid id')).toThrow(TypeError);
  });
});

// getAirportByIata tests
describe('The getAirportByIata() method', function () {
  const tempData = [
    {"iata": "ABC", "name": "A1", "city": "Brisbane", "country": "Australia"}, 
    {"iata": "DFG", "name": "A2", "city": "Melbourne", "country": "Australia"},
    {"iata": "HIJ", "name": "A3", "city": "Sydney", "country": "Australia"}
  ]

  test ('Input of data and existing iata, output should return element with target iata', () => {
    expect(getAirportByIata(tempData, "DFG")).toEqual({
      "iata": "DFG", 
      "name": "A2", 
      "city": "Melbourne", 
      "country": "Australia"
    });
  });

  test ('Input of data and non-existing iata, output should return null', () => {
    expect(getAirportByIata(tempData, "Really, really, really, really long string")).toBeNull();
  });

  test ('Input of data and invalid iata, should throw TypeError', () => {
    expect(() => getAirportByIata(tempData, 12345)).toThrow(TypeError);
  });
});

// filterByOriginCity tests
describe('The filterByOriginCity() method', function () {
  const tempData = [
    {"source_airport":{"city":"Adelaide","country":"Australia"},"destination_airport":{"city":"Argyle","country":"Australia"}}, 
    {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Melbourne","country":"Australia"}},
    {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Sydney","country":"Australia"}}
  ]

  test ('Input of data and existing city, output should return elements with target origin city', () => {
    expect(filterByOriginCity(tempData, "Brisbane")).toEqual([ 
      {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Melbourne","country":"Australia"}},
      {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Sydney","country":"Australia"}}
    ]);
  });

  test ('Input of data and existing city, output should return array with length of number of elements with target origin city', () => {
    expect(filterByOriginCity(tempData, "Brisbane")).toHaveLength(2);
  });

  test ('Input of data and non-existing city, output should return null', () => {
    expect(filterByOriginCity(tempData, "Invalid city")).toBeNull();
  });

  test ('Input of data and invalid city, should throw TypeError', () => {
    expect(() => filterByOriginCity(tempData, 987654)).toThrow(TypeError);
  });
});

// filterByDestinationCity tests
describe('The filterByDestinationCity() method', function () {
  const tempData = [
    {"source_airport":{"city":"Adelaide","country":"Australia"},"destination_airport":{"city":"Argyle","country":"Australia"}}, 
    {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Melbourne","country":"Australia"}},
    {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Sydney","country":"Australia"}}
  ]

  test ('Input of data and existing city, output should return elements with target destination city', () => {
    expect(filterByDestinationCity(tempData, "Melbourne")).toEqual([ 
      {"source_airport":{"city":"Brisbane","country":"Australia"},"destination_airport":{"city":"Melbourne","country":"Australia"}},
    ]);
  });

  test ('Input of data and existing city, output should return array with length of number of elements with target destination city', () => {
    expect(filterByDestinationCity(tempData, "Melbourne")).toHaveLength(1);
  });

  test ('Input of data and non-existing city, output should return null', () => {
    expect(filterByDestinationCity(tempData, "Invalid city")).toBeNull();
  });

  test ('Input of data and invalid city, should throw TypeError', () => {
    expect(() => filterByDestinationCity(tempData, 987654)).toThrow(TypeError);
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

  test ('Input of data and existing airline, output should return elements with target airline', () => {
    expect(filterByAirline(tempData, "Airline1")).toEqual([ 
      {"airline":{"code":"AB","name":"Airline1","country":"Australia"}}, 
      {"airline":{"code":"GH","name":"Airline1","country":"Australia"}}
    ]);
  });

  test ('Input of data and existing airline, output should return array with length of number of elements with target airline', () => {
    expect(filterByAirline(tempData, "Airline3")).toHaveLength(1);
  });

  test ('Input of data and non existing airline, output should return null', () => {
    expect(filterByAirline(tempData, "Invalid airline")).toBeNull();
  });

  test ('Input of data and invalid airline, should throw TypeError', () => {
    expect(() => filterByAirline(tempData, 123456)).toThrow(TypeError);
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

  test ('Input of data and existing aircraft, output should return elements with target aircraft', () => {
    expect(filterByAircraft(tempData, "A1")).toEqual([ 
      {"aircraft":["A1", "A2"]}, 
      {"aircraft":["A1"]}
    ]);
  });

  test ('Input of data and existing aircraft, output should return array with length of number of elements with target aircraft', () => {
    expect(filterByAircraft(tempData, "A3")).toHaveLength(1);
  });

  test ('Input of data and non-existing aircraft, output should return null', () => {
    expect(filterByAircraft(tempData, "Invalid aircraft")).toBeNull();
  });

  test ('Input of data and invalid aircraft, should throw TypeError', () => {
    expect(() => filterByAircraft(tempData, [1, 2, 3])).toThrow(TypeError);
  });
});

