// ==========================
// Payroll Management System
// ==========================

const payrollForm = document.getElementById("payrollForm");
const salaryResult = document.getElementById("salaryResult");

payrollForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get Form Values
    const name = document.getElementById("empName").value;
    const id = document.getElementById("empId").value;
    const department = document.getElementById("department").value;

    const basic = Number(document.getElementById("basic").value);
    const hra = Number(document.getElementById("hra").value);
    const bonus = Number(document.getElementById("bonus").value);
    const overtime = Number(document.getElementById("overtime").value);
    const pf = Number(document.getElementById("pf").value);
    const esi = Number(document.getElementById("esi").value);

    // Calculate Salary
    const grossSalary = basic + hra + bonus + overtime;
    const totalDeduction = pf + esi;
    const netSalary = grossSalary - totalDeduction;

    // Display Result
    salaryResult.innerHTML = `
        <h2>Salary Summary</h2>
        <hr>

        <p><strong>Employee Name:</strong> ${name}</p>
        <p><strong>Employee ID:</strong> ${id}</p>
        <p><strong>Department:</strong> ${department}</p>

        <br>

        <table style="width:100%; border-collapse:collapse;">
            <tr>
                <td>Basic Salary</td>
                <td>₹${basic}</td>
            </tr>

            <tr>
                <td>HRA</td>
                <td>₹${hra}</td>
            </tr>

            <tr>
                <td>Bonus</td>
                <td>₹${bonus}</td>
            </tr>

            <tr>
                <td>Overtime</td>
                <td>₹${overtime}</td>
            </tr>

            <tr>
                <td>PF</td>
                <td>- ₹${pf}</td>
            </tr>

            <tr>
                <td>ESI</td>
                <td>- ₹${esi}</td>
            </tr>
        </table>

        <hr>

        <h3>Gross Salary : ₹${grossSalary}</h3>
        <h3>Total Deduction : ₹${totalDeduction}</h3>

        <h2 style="color:lime;">
            Net Salary : ₹${netSalary}
        </h2>

        <br>

        <button onclick="window.print()">
            🖨 Print Salary Slip
        </button>
    `;

});
