const storeFunctions = require('./script');

// Test creating an employee.
test("Create Mary Sue as an employee.", () => {
    let test = new storeFunctions.Employee(1, "Mary", "Sue", "Female", 32, "Salesperson");
    expect(test).toEqual({id:1, firstName:"Mary", lastName:"Sue", gender:"Female", age:32, position:"Salesperson"});
});
 
// Test creating an employee with no parameters.
test("Create an empty employee.", () => {
    let test = new storeFunctions.Employee();
    expect(test).toEqual({id:undefined, firstName:undefined, lastName:undefined, gender:undefined, age:undefined, position:undefined});
});

// Test creating a sale 
test('Create a Wi-Fi Adapter sale', () => {
    let test = new storeFunctions.Sale(2, "Wi-Fi Adapter", 40.00, "03-09-2022"); 
    expect(test).toEqual({staffId:2, item:"Wi-Fi Adapter", price:40.00, date:"03-09-2022"});
})

// Test creating an sale with no parameters.
test('Create an empty sale', () => {
    let test = new storeFunctions.Sale(); 
    expect(test).toEqual({staffId:undefined, item:undefined, price:undefined, date:undefined});
})
