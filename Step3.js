// Program to compute Fibonacci sequence to N terms.
 

// Three constant variables for example uses of the function.
const varOne = 5;
const varTwo = 10;
const varThree = 15;

// A function to compute the Fibonacci sequence.
// Parameter indicates how many terms to progress to.
function Fibonacci(terms = 0) {
    // Variables for the two terms to add together, starting with 0 and 1.
    let s0 = 0, s1 = 1;

    // Variable for storing the next term.
    let s2;

    // Loop through until we have computed the specified number of terms.
    for (let i = 1; i <= terms; i++) {
        // Print the current value of the first term to the console.
        console.log(s0);                            

        // Compute the next term and store it.
        s2 = s0 + s1;

        // Set the values of the values to add together for the next term.
        s0 = s1; 
        s1 = s2;
    }
}
 
// Call the function above with each of the constant variables.
Fibonacci(varOne);
Fibonacci(varTwo);
Fibonacci(varThree);