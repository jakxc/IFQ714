import { 
  getAirportById, 
  getAirportByIata, 
  filterByOriginCity, 
  filterByDestinationCity, 
  filterByAirline, 
  filterByAircraft,
  sortByDistance,
  sortByNumberOfAircrafts
} from '../js/functions';


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

  test ('Input of data and non-exisiting id, output should return undefined', () => {
    expect(getAirportById(tempData, 987654321425345)).toBeUndefined();
  });

  test ('Input of data and invalid id, should console log error message', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    getAirportById(tempData, 'invalid ID')
    expect(logSpy).toHaveBeenCalledWith('Invalid parameter type');
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

  test ('Input of data and non-existing iata, output should return undefined', () => {
    expect(getAirportByIata(tempData, "Really, really, really, really long string")).toBeUndefined();
  });

  test ('Input of data and invalid iata, should console log error message', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    getAirportByIata(tempData, 12345)
    expect(logSpy).toHaveBeenCalledWith('Invalid parameter type');
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

  test ('Input of data and non-existing city, output should return undefined', () => {
    expect(filterByOriginCity(tempData, "Invalid city")).toBeUndefined();
  });

  test ('Input of data and invalid city, should console log error message', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    filterByOriginCity(tempData, 98765)
    expect(logSpy).toHaveBeenCalledWith('Invalid parameter type');
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

  test ('Input of data and non-existing city, output should return undefined', () => {
    expect(filterByDestinationCity(tempData, "Invalid city")).toBeUndefined();
  });

  test ('Input of data and invalid city, should console log error message', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    filterByDestinationCity(tempData, 12345)
    expect(logSpy).toHaveBeenCalledWith('Invalid parameter type');
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

  test ('Input of data and non existing airline, output should return undefined', () => {
    expect(filterByAirline(tempData, "Invalid airline")).toBeUndefined();
  });

  test ('Input of data and invalid airline, should console log error message', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    filterByAirline(tempData, 12345)
    expect(logSpy).toHaveBeenCalledWith('Invalid parameter type');
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

  test ('Input of data and non-existing aircraft, output should return undefined', () => {
    expect(filterByAircraft(tempData, "Invalid aircraft")).toBeUndefined();
  });

  test ('Input of data and invalid aircraft, should console log error message', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    filterByAircraft(tempData, 123456)
    expect(logSpy).toHaveBeenCalledWith('Invalid parameter type');
  });
});

//sortByDistance tests
describe('The sortByDistance() method', function () {
  const tempData = [
    {"direct_distance": 6}, 
    {"direct_distance": 1},
    {"no_property": null},
    {"direct_distance": 5},
  ]

  test ('Input of data, output should return elements in ascending order base on direct_distance value', () => {
    expect(sortByDistance(tempData)).toEqual([
      {"direct_distance": 1}, 
      {"direct_distance": 5},
      {"direct_distance": 6},
      {"no_property": null},
    ]);
  });

  test ('Input of data, output should return array of same length', () => {
    expect(sortByDistance(tempData)).toHaveLength(4);
  });

  test ('Input of invalid data, should console log error message', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    sortByDistance('invalid data')
    expect(logSpy).toHaveBeenCalledWith('Invalid parameter type');
  });
});

//sortByNumberOfAircrafts tests
describe('The sortByNumberOfAircrafts() method', function () {
  const tempData = [
    {"aircraft": ['a1', 'a2', 'a5']},
    {"aircraft": ['a1', 'a2', 'a3', 'a4', 'a5']}, 
    {"aircraft": ['a1']},
    {"aircraft": []},
    {"no_property": null}
  ]

  test ('Input of data, output should return elements in ascending order base on aircraft length', () => {
    expect(sortByNumberOfAircrafts(tempData)).toEqual([
      {"aircraft": []},
      {"aircraft": ['a1']},
      {"aircraft": ['a1', 'a2', 'a5']},
      {"aircraft": ['a1', 'a2', 'a3', 'a4', 'a5']}, 
      {"no_property": null},
    ]);
  });

  test ('Input of data, output should return array of same length', () => {
    expect(sortByNumberOfAircrafts(tempData)).toHaveLength(5);
  });

  test ('Input of invalid data, should console log error message', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    sortByNumberOfAircrafts('invalid data')
    expect(logSpy).toHaveBeenCalledWith('Invalid parameter type');
  });
});


