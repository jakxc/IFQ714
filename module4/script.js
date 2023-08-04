const sum = (a, b) => {
    return a  + b;
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

module.exports = parseThenSquare;
