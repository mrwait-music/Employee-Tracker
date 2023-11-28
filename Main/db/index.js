const inquirer = require('inquirer')

let menuOptions = [
    {
        type: 'list',
        name: 'tasks',
        message: "What would you like to do?",
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'Veiw All Roles', 'Add Role', 'Veiw All Departments', 'Add Department']
    },
]

function init() {
    inquirer.prompt(menuOptions)
}

init();