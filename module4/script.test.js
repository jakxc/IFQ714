// Import the function from the base file.
const functions = require('./script');
const sum = functions.sum;
const parseThenSquare = functions.parseThenSquare;

// Test with an input of 1 and 2
test ('Input of 1 and 2, output of 3', () => {
    expect(sum(1,2)).toBe(3);
});

// Test with an input of 'five' and 6
test ('Input of "five" and 6, output of 3', () => {
    expect(sum('five',6)).toBe(null);
});

// Test with an input of "10".
test('Input of "10", output of 100.', () => {
    expect(parseThenSquare("10")).toBe(100);
});

// Test with an input of 10.
test('Input of 10, output of 100.', () => {
    expect(parseThenSquare(10)).toBe(100);
});
 
// Test with an input of "ten".
test('Input of "five", output of null.', () => {
    expect(parseThenSquare("five")).toBe(null);
});

// Test with an input of undefined.
test('Input of undefined, output of undefined.', () => {
    expect(parseThenSquare(undefined)).toBe(undefined);
});