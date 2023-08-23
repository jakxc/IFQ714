// Step 4
const findGreatestCommonDivisor = (a,b) => {
    const min = Math.min(a,b);
    const max = Math.max(a,b);
    if (max % min === 0) {
        return min;
    } else {
        return findGreatestCommonDivisor(min, max % min);
    }
} 

console.log(findGreatestCommonDivisor(48, 64));