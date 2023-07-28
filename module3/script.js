const data = require('./data.json');

// Step 1
const employees = data.employees;
const sales = data.sales;

// Step 2
function displayEmployees() {
    for (let i=0; i<employees.length; i++) {
        let employee = employees[i];
        console.log(`id: ${employee.id}\nfirstName: ${employee.firstName} lastname: ${employee.lastName}\ngender: ${employee.gender}\nage: ${employee.age}\nposition: ${employee.position}`)
    }
}

function displaySales() {
    for (let i=0; i<sales.length; i++) {
        let sale = sales[i];
        console.log(`staffId: ${sale.staffId}\n item: ${sale.item}\nprice: ${sale.price}\ndate: ${sale.date}`)
    }
}

// displayEmployees();
// displaySales();

// Step 3
function findEmployeeById(id) {
    return employees.filter(el => el.id === id).length > 0 
            ? employees.filter(el => el.id === id)[0]
            : 'No employee with this ID was found.';
}

// console.log(findEmployeeById(2));

// Step 4
function filterEmployeebyPosition(position) {
    return employees.filter(el => el.position === position).length > 0
            ? employees.filter(el => el.position === position)
            : 'No employees were found matching this position';
}

function filterSalesByPrice(price) {
    return sales.filter(sale => Number(sale.price) >= price).length > 0
            ? sales.filter(sale => Number(sale.price) >= price)
            : 'No sales were found to be this price or higher.';
}

// console.log(filterEmployeebyPosition('Salesperson'));
// console.log(filterSalesByPrice(10));

// Bonus Task
const salesByEmployees = employees.map(employee => {
    let totalSales = sales.filter(sale => sale.staffId === employee.id).map(el => `${el.item}: $${el.price}`);
    return {
        ...employee,
        sales: totalSales,
        displaySales: function() {
            if (totalSales.length === 0) return `${employee.firstName} ${employee.lastName} made no sales`;
            return `${employee.firstName} ${employee.lastName} made ${totalSales.length} ${totalSales.length > 1 ? 'sales' : 'sale'}: ${totalSales}`;
        }
    }
})

console.log(salesByEmployees[0].displaySales());