// Step One
const employeeOne = JSON.parse('{"id":1,"firstName":"John","lastName":"Smith","gender":"Male","age":23,"position":"Manager"}') 
const saleOne = JSON.parse('{"staffId":1,"item":"Wi-Fi Adapter","price":40,"date":"01-09-2022"}');

// Step Two
function outputEmployeeDetails(employee) {
    console.log(`id: ${employee.id}\nfirstName: ${employee.firstName} lastname: ${employee.lastName}\ngender: ${employee.gender}\nage: ${employee.age}\nposition: ${employee.position}`)}

function outputSaleDetails(sale) {
    console.log(`staffId: ${sale.staffId}\n item: ${sale.item}\nprice: ${sale.price}\ndate: ${sale.date}`)
}

// Step Three
function Employee(id, firstName, lastName, gender, age, position) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.position = position;
    // this.displayInfo = function() {
    //     outputEmployeeDetails(this);
    // }
    // this.toString = function() {
    //     return `Id: ${this.id}, Full Name: ${this.firstName} ${this.lastName}, Gender: ${this.gender}, Age: ${this.age}, Position: ${this.position}`
    // }
}


function Sale(staffId, item, price, date) {
    this.staffId = staffId;
    this.item = item;
    this.price = price;
    this.date = date;
    // this.displayInfo = function() {
    //     outputSaleDetails(this);
    // }
    // this.toString = function() {
    //     return `Staff member with Id ${this.staffId} sold ${this.item} for $${this.price} on ${this.date}`
    // }
    // this.getDayOfSale = function() {
    //     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //     const arr = this.date.split('-');
    //     const newDate = `${arr[1]}-${arr[0]}-${arr[2]}`;
    //     const date = new Date(newDate);
    //     return days[date.getDay()];
    // }
}

const employeeTwo = new Employee(2, "Mary", "Sue", "female", 32, "salesperson");
const saleTwo = new Sale(2, "Wi-Fi Adapter", 40.00, "03-09-2022"); 

// Step Four
const employers = [employeeOne, employeeTwo];
const sales = [saleOne, saleTwo];

// Bonus Tasks
// console.log(employeeTwo.displayInfo());
// console.log(employeeTwo.toString());
// console.log(saleTwo.getDayOfSale());

module.exports = {
    Employee: Employee,
    Sale: Sale,
    outputEmployeeDetails: outputEmployeeDetails,
    outputSaleDetails: outputSaleDetails
}
