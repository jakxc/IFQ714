// Step One
const employeeOne = {
                        "id": 1,
                        "firstName": "John", 
                        "lastName": "Smith", 
                        "gender": "Male", 
                        "age": 23, 
                        "position": "Manager"
                    }

const saleOne = {
                    "staffId": 1, 
                    "item": "Wi-Fi Adapter", 
                    "price": 40.00, 
                    "date": "01-09-2022"
                }     

// Step Two
function outputEmployeeDetails(employee) {
    console.log(`id: ${employee.id}\n 
                firstName: ${employee.firstName} lastname: ${employee.lastName}\n
                gender: ${employee.gender}\n
                age: ${employee.age}\n
                position: ${employee.position}`)
}

function outputSaleDetails(sale) {
    console.log(`staffId: ${sale.staffId}\n 
                item: ${sale.item}\n
                price: ${sale.price}\n
                date: ${sale.date}`)
}

// Step Three
function Employee(id, firstName, lastName, gender, age, position) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.position = position;
    this.displayInfo = function() {
        outputEmployeeDetails(this);
    }
    this.toString = function() {
        return `Id: ${this.id}, Full Name: ${this.firstName} ${this.lastName}, Gender: ${this.gender}, Age: ${this.age}, Position: ${this.position}`
    }
}


function Sale(staffId, item, price, date) {
    this.staffId = staffId;
    this.item = item;
    this.price = price;
    this.date = date;
    this.displayInfo = function() {
        outputSaleDetails(this);
    }
    this.toString = function() {
        return `Staff member with Id ${this.staffId} sold ${this.item} for $${this.price} on ${this.date}`
    }
    this.getDayOfSale = function() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(this.date);

        return days[date.getDay()];
    }
}

const employeeTwo = new Employee(2, "Mary", "Sue", "female", 32, "salesperson");
const saleTwo = new Sale(2, "Wi-Fi Adapter", 40.00, "03-09-2022");

// Step Four
const employers =  [employeeOne, employeeTwo];
const sales = [saleOne, saleTwo];

// Bonus Tasks
console.log(employeeTwo.displayInfo());
console.log(employeeTwo.toString());
console.log(saleTwo.getDayOfSale());
