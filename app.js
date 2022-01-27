const inquirer = require('inquirer');
//const fs = require('fs');
//const generatePage = require('./src/page-template.js');


//const pageHTML = generatePage(name, github);


//fs.writeFile('index.html', generatePage(name, github), err => {
  //if (err) throw err;

  //console.log('Portfolio complete! Checkout index.html to see the output!')
//});

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username'
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Woudl you like to provide info about yourself?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({confirmAbout}) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

const promptProject = portfolioData => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
  ================
  Add a new project
  ================
  `);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: proName => {
        if (proName) {
          return true;
        } else {
          console.log('Please enter your project name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Add a description of your project (Required)',
      validate: desInput => {
        if (desInput) {
          return true;
        } else {
          console.log('Please enter a description for the project!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you buidlt his project with? (Check all that apply)',
      choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'Jquery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter GitHub link to your project',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log('Please enter a project link!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name:'feature',
      message: 'Would you link to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });

};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });