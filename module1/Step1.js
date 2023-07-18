// Function for adding a greeting to a message.
function addGreeting(message) {
    const greeting = "Hello! The message is: ";
    // Add "Hello! The message is: " to the string.
    return `${greeting} ${message}`;
}
 
const unitCode = 'IFQ714';
// Send a message informing someone of this unit's code.
newMessage = addGreeting(unitCode);
 
// Show the message in the console.
console.log(newMessage);