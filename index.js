const inquirer = require('inquirer')
const db = require('./db/connection.js')

let menuOptions = [
    {
        type: 'list',
        name: 'tasks',
        message: "What would you like to do?",
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    },
]


async function init() {
    const { tasks } = await inquirer.prompt(menuOptions)
    switch (tasks) {
        case "View All Employees":
            viewEmployees()
            break
        case "View All Roles":
            viewRoles()
            break
        case "View All Departments":
            viewDepartments()
            break
        case "Update Employee Role":
            updateEmployee()
            break
        case "Add Employee":
            addEmployee()
            break
        case "Add Role":
            addRole()
            break
        case "Add Department":
            addDepartment()
    }
}
async function viewEmployees() {
    const [data] = await db.promise().query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, concat (manager.first_name,  ' ', manager.last_name) as manager_name FROM employee JOIN role ON role.id=employee.role_id JOIN department ON department.id=department_id JOIN employee manager ON employee.manager_id=manager.id")
    console.table(data)
    init()
}

async function viewRoles() {
    const [data] = await db.promise().query("SELECT * FROM role")
    console.table(data)
    init()
}
async function viewDepartments() {
    const [data] = await db.promise().query("SELECT * FROM department")
    console.table(data)
    init()
}

async function addDepartment() {
    const response = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department you would like to add?',
            },
        ])
    const [data] = await db.promise().query("INSERT INTO department SET ?", response)
    console.log('Department added!')
    init()
}
async function addRole() {
    const [departments] = await db.promise().query('SELECT id AS value, name AS name FROM department')
    const response = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'What role would you like to add?',
                choices: departments
            },
            {
                type: 'number',
                name: 'salary',
                message: 'How much will this role pay/year?'
            },
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of this position?'
            }
        ])
    const [data] = await db.promise().query("INSERT INTO role SET ?", response)
    console.log('Role added!')
    init()
}
async function addEmployee() {
    const [roles] = await db.promise().query('SELECT id AS value, title AS name FROM role')
    const [managers] = await db.promise().query('SELECT id AS value, concat (first_name, " ", last_name) AS name FROM employee')
    const response = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employeee you would like to add?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employeee you would like to add?'
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'What is the role id of the employeee you would like to add?',
                choices: roles
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "Who is this employee's manager?",
                choices: managers
            },
        ]
        )
    const [data] = await db.promise().query("INSERT INTO employee SET ?", response)
    console.log('Employee added!')
    init()
}

async function updateEmployee() {
    const [employees] = await db.promise().query('SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee');
    const [roles] = await db.promise().query('SELECT id AS value, title AS name FROM role');

    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee you want to update:',
            choices: employees,
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the new role for the employee:',
            choices: roles,
        },
    ]);

    const [data] = await db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [response.role_id, response.employee_id]);
    console.log('Employee role updated!');
    init();
}




init();