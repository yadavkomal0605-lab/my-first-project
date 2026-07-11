// ============================
// Employee Management System
// Section 1
// ============================

// Get Elements
const employeeForm = document.getElementById("employeeForm");
const employeeTable = document.getElementById("employeeTable");
const search = document.getElementById("search");
const filterDept = document.getElementById("filterDept");

const totalEmployees = document.getElementById("totalEmployees");
const totalDepartments = document.getElementById("totalDepartments");
const totalSalary = document.getElementById("totalSalary");

let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editIndex = -1;

// ============================
// Save Data
// ============================

function saveEmployees() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

// ============================
// Form Submit
// ============================

employeeForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const salary = Number(document.getElementById("salary").value);
    const department = document.getElementById("department").value;
    const designation = document.getElementById("designation").value.trim();

    const photoInput = document.getElementById("photo");

    if (!name || !email || !salary || !department) {
        alert("Please fill all required fields.");
        return;
    }

    // Photo Upload
    const file = photoInput.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function () {

            saveEmployee(reader.result);

        };

        reader.readAsDataURL(file);

    } else {

        saveEmployee("https://via.placeholder.com/60");

    }

    function saveEmployee(photo) {

        const employee = {

            name,
            email,
            salary,
            department,
            designation,
            photo

        };

        if (editIndex === -1) {

            employees.push(employee);

        } else {

            employees[editIndex] = employee;
            editIndex = -1;

            employeeForm.querySelector("button").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Employee';

        }

        saveEmployees();

        displayEmployees();

        employeeForm.reset();

    }

});

// ============================
// Initial Load
// ============================

// ============================
// Initial Load
// ============================

displayEmployees();
// ============================
// Display Employees
// ============================


// ============================
// Dashboard
// ============================

function updateDashboard() {

