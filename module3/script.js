const data = require('./data.json');

// Step 1
const employees = data.employees;
const sales = data.sales;

// Step 2
function displayEmployees() {
    employees.forEach((employee, i) => {
        console.log(`id: ${employee.id}\nfirstName: ${employee.firstName} lastname: ${employee.lastName}\ngender: ${employee.gender}\nage: ${employee.age}\nposition: ${employee.position}`)
    })
}

function displaySales() {
    sales.forEach((sale, i) => console.log(`staffId: ${sale.staffId}\n item: ${sale.item}\nprice: ${sale.price}\ndate: ${sale.date}`))
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
    const cloneSales = Object.assign({}, sales);
    let salesInfo = cloneSales.filter(sale => sale.staffId === employee.id).map(el => [el.item, el.price]);
    const cloneEmployee = Object.assign({}, employee);
    return {
        ...clone,
        sales: salesInfo,
        displaySales: function() {
            if (salesInfo.length === 0) return `${cloneEmployee.firstName} ${cloneEmployee.lastName} made no sales`;
            return `${cloneEmployee.firstName} ${cloneEmployee.lastName} made ${salesInfo.length} ${salesInfo.length > 1 ? 'sales' : 'sale'}: ${salesInfo}`;
        }
    }
})

const setEmployeesCommission = () => {
    return salesByEmployees.map(employee => {
        const totalSales = employee.sales.reduce((acc, curr) => acc + curr[1], 0);
        return {
            ...employee,
            commission: +(totalSales * 0.1).toFixed(2)
        }
    })
}

const commissionData = setEmployeesCommission();

commissionData.forEach((el, i) => {
    try {
        if (el.sales.length) {
            console.log(`${el.firstName} ${el.lastName} made $${el.commission} of commission`)
        } else {
            throw new Error(`${el.firstName} ${el.lastName} made no sales`);
        }
    } catch (err) {
        console.log(err.message);
    }
})

// console.log(salesByEmployees[0].displaySales());