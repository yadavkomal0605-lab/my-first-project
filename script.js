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

// Save LocalStorage
function saveEmployees() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

// Dashboard
function updateDashboard() {

    totalEmployees.textContent = employees.length;

    const departments = [...new Set(employees.map(e => e.department))];
    totalDepartments.textContent = departments.length;

    let salary = 0;

    employees.forEach(emp => {
        salary += Number(emp.salary);
    });

    totalSalary.textContent = "₹" + salary;
}

// Display Employees
function displayEmployees() {

    employeeTable.innerHTML = "";

    const keyword = search.value.toLowerCase();
    const dept = filterDept.value;

    employees.forEach((emp,index)=>{

        if(
            (emp.name.toLowerCase().includes(keyword) ||
             emp.email.toLowerCase().includes(keyword))
            &&
            (dept==="" || emp.department===dept)
        ){

            employeeTable.innerHTML += `
            <tr>

            <td>
            <img src="${emp.photo}" width="50" height="50" style="border-radius:50%;">
            </td>

            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>${emp.designation}</td>
            <td>₹${emp.salary}</td>

            <td>

            <button onclick="editEmployee(${index})">
            Edit
            </button>

            <button onclick="deleteEmployee(${index})">
            Delete
            </button>

            </td>

            </tr>
            `;

        }

    });

    updateDashboard();

}

// Add Employee
employeeForm.addEventListener("submit",function(e){

    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const email=document.getElementById("email").value.trim();
    const salary=document.getElementById("salary").value;
    const department=document.getElementById("department").value;
    const designation=document.getElementById("designation").value.trim();

    const photoInput=document.getElementById("photo");
    const file=photoInput.files[0];

    function save(photo){

        const employee={
            name,
            email,
            salary,
            department,
            designation,
            photo
        };

        if(editIndex==-1){

            employees.push(employee);

        }else{

            employees[editIndex]=employee;
            editIndex=-1;

        }

        saveEmployees();
        displayEmployees();
        employeeForm.reset();

    }

    if(file){

        const reader=new FileReader();

        reader.onload=function(){

            save(reader.result);

        };

        reader.readAsDataURL(file);

    }else{

        save("https://via.placeholder.com/60");

    }

});

// Delete
function deleteEmployee(index){

    if(confirm("Delete Employee?")){

        employees.splice(index,1);

        saveEmployees();

        displayEmployees();

    }

}

// Edit
function editEmployee(index){

    const emp=employees[index];

    document.getElementById("name").value=emp.name;
    document.getElementById("email").value=emp.email;
    document.getElementById("salary").value=emp.salary;
    document.getElementById("department").value=emp.department;
    document.getElementById("designation").value=emp.designation;

    editIndex=index;

}

// Search
search.addEventListener("keyup",displayEmployees);

// Filter
filterDept.addEventListener("change",displayEmployees);

// Initial Load
displayEmployees();
