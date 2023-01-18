const axios = require('axios');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT);
});


//VIEW EMPLOYEES
async function viewEmployees(){

  const employees = await axios.get('http://localhost:3001/api/employee/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });
  
  for(var i=0; i< employees.length; i++){

    employees[i].title = employees[i].role.title;
    employees[i].salary = employees[i].role.salary;

    const department = await axios.get('http://localhost:3001/api/department/'+employees[i].role.department_id)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.error(error);
      });
    
    employees[i].department = department.name;

    if(employees[i].manager){
      employees[i].manager = employees[i].manager.first_name + " " + employees[i].manager.last_name;
    }
    delete employees[i].manager_id;
    delete employees[i].role;
    delete employees[i].role_id;

  }

  console.log('');
  console.table(employees);
}


//ADD EMPLOYEE
async function addEmployee(){

  const roles = await axios.get('http://localhost:3001/api/role/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });

  const titles = roles.map( role => role.title);

  const employees = await axios.get('http://localhost:3001/api/employee/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });

  let managers = employees.map( employee => employee.first_name + " " + employee.last_name ); 

  managers.push('None');

  const resp = await inquirer.prompt([
    {
      type: 'input',
      message: `What is the employee's first name?`,
      name: 'first_name'
    },
    {
      type: 'input',
      message: `What is the employee's last name?`,
      name: 'last_name'
    },
    {
      type: 'list',
      message: `What is the employee's role?`,
      name: 'role',
      choices: titles
    },
    {
      type: 'list',
      message: `Who is the employee's manager?`,
      name: 'manager',
      choices: managers
    }
  ]);

  const role = roles.filter( obj => { return obj.title === resp.role})[0];

  const manager = employees.filter( obj => { return obj.first_name + " " + obj.last_name === resp.manager})[0];
  
  const employee = await axios.post('http://localhost:3001/api/employee/',
    {
      id: employees.length + 1,
      first_name: resp.first_name,
      last_name: resp.last_name,
      role_id: role.id,
      manager_id: manager.id
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
}


//UPDATE EMPLOYEE ROLE
async function updateEmployeeRole(){

  const employees = await axios.get('http://localhost:3001/api/employee/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });

  const employee_names = employees.map( employee => employee.first_name + " " + employee.last_name );

  const roles = await axios.get('http://localhost:3001/api/role/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });

  const titles = roles.map( role => role.title );

  const resp = await inquirer.prompt([
    {
      type: 'list',
      message: `Which employee would you like to update?`,
      name: 'employee',
      choices: employee_names
    },
    {
      type: 'list',
      message: `What is the employee's new role?`,
      name: 'role',
      choices: titles
    }
  ]);

  const employee = employees.filter( employee => { return  employee.first_name + " " + employee.last_name === resp.employee})[0];
  const role = roles.filter( role => { return role.title === resp.role })[0];

  const employeeData = await axios.put('http://localhost:3001/api/employee/'+employee.id,
  {
    first_name: employee.first_name,
    last_name: employee.last_name,
    manager_id: employee.manager_id,
    role_id: role.id
  });
  
}

//UPDATE EMPLOYEE MANAGER
async function updateEmployeeManager(){

  const employees = await axios.get('http://localhost:3001/api/employee/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });

  const employee_names = employees.map( employee => employee.first_name + " " + employee.last_name );

  const managers = await axios.get('http://localhost:3001/api/employee/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });

  const  manager_names = managers.map( manager => manager.first_name + " " + manager.last_name );

  const resp = await inquirer.prompt([
    {
      type: 'list',
      message: `Which employee would you like to update?`,
      name: 'employee',
      choices: employee_names
    }
  ]);


  manager_names.splice(manager_names.indexOf(resp.employee), 1);

  manager_names.push('None');

  const resp2 = await inquirer.prompt([
    {
      type: 'list',
      message: `Who is the employee's new manager?`,
      name: 'manager',
      choices: manager_names
    }
  ]);

  const employee = employees.filter( employee => { return  employee.first_name + " " + employee.last_name === resp.employee})[0];

  let newManager = null;
  if(resp2.manager != 'None'){
    const manager = managers.filter( manager => { return manager.first_name + " " + manager.last_name === resp2.manager })[0];
    newManager = manager.id;
  }


  const employeeData = await axios.put('http://localhost:3001/api/employee/'+employee.id,
  {
    first_name: employee.first_name,
    last_name: employee.last_name,
    manager_id: newManager,
    role_id: employee.role_id
  });
  
}

//VIEW ROLES
async function viewRoles(){

  const roles = await axios.get('http://localhost:3001/api/role/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });
  
  for(var i=0; i<roles.length; i++){
    roles[i].department = roles[i].department.name;
  }

  console.log('');
  console.table(roles);
  

}

//ADD ROLE
async function addRole(){

  const departments = await axios.get('http://localhost:3001/api/department/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });
  
  const depts = departments.map( dept => dept.name );
  
  const roles = await axios.get('http://localhost:3001/api/role/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });
  
  const resp = await inquirer.prompt([
    {
      type: 'input',
      message: `What is the title of the role?`,
      name: 'title'
    },
    {
      type: 'input',
      message: `What is the role's salary?`,
      name: 'salary'
    },
    {
      type: 'list',
      message: `What department does the role belong to?`,
      name: 'department',
      choices: depts
    }
  ]);

  const dept = departments.filter( obj => {return obj.name === resp.department})[0];



  const role = await axios.post('http://localhost:3001/api/role/',
    {
      id: roles.length + 1,
      title: resp.title,
      salary: parseInt(resp.salary),
      department_id: dept.id
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  
}

//VIEW DEPARTMENTS
async function viewDepartments(){

  const departments = await axios.get('http://localhost:3001/api/department/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });

  console.table(departments);

}

//ADD DEPARTMENT
async function addDepartment(){

  const departments = await axios.get('http://localhost:3001/api/department/')
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });
  
  const resp = await inquirer.prompt([
    {
      type: 'input',
      message: `What is the department's name?`,
      name: 'name'
    }
  ]);

  const department = await axios.post('http://localhost:3001/api/department/',
    {
      id: departments.length + 1,
      name: resp.name
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

}


//INIT
async function init(){

  let quit = false;

  while(!quit){
    const nextMove = await inquirer
      .prompt([
        {
          type: 'list',
          message: 'What would you like to do next?',
          name: 'nextMove',
          choices:
            [
              'View All Employees',
              'Add Employee',
              'Update Employee Role',
              'Update Employee Manager',
              'View All Roles',
              'Add Role',
              'View All Departments',
              'Add Department',
              'Quit'
            ]
        }
      ])
      .then((response) => {
        return response.nextMove;
      });



    switch (nextMove) {
      case 'View All Employees':
        await viewEmployees();
        break;
      case 'Add Employee':
        await addEmployee();
        break;
      case 'Update Employee Role':
        await updateEmployeeRole();
        break;
      case 'Update Employee Manager':
        await updateEmployeeManager();
        break;
      case 'View All Roles':
        await viewRoles();
        break;
      case 'Add Role':
        await addRole();
        break;
      case 'View All Departments':
        await viewDepartments();
        break;
      case'Add Department':
        await addDepartment();
        break;
      case 'Quit':
        quit = true;
    }
  }
  
  process.exit(0);

}

init();