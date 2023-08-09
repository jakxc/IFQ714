const sum = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') return null;
    return a + b;
}

// Function for squaring numbers from a string, if it can be parsed.
const parseThenSquare = (input) => {
    if (!input) return input;
    
    let num = Number.parseInt(input);
    if (!Number.isNaN(num)) {
        return num * num;
    } else {
        return null;
    }
}

module.exports = {parseThenSquare: parseThenSquare, sum: sum};
