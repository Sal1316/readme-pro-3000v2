const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require('chalk');

const generateReadMeFile = ({
  title,
  description,
  installation,
  usage,
  license,
  contributors,
  test,
  questions,
  githubUrl,
  email
}) => {
  return `# ${title}
${renderLicenseBadge(license)}

## Description
${description}

## Table on Contents
- [Installation](#installation) 
- [Usage Information](#usage)
${renderLicenseLink(license)}
- [Contrubution Guidelines](#contribution)
- [Test Instructions](#test)
- [Questions](#questions) 

## Installation
${installation}

## Usage
${usage} 

${renderLicenseSection(license)}

## contribution
${contributors}

## Test
${test}

## Questions
${questions}
You can reach me at the following for questions or contributions: 
- GitHub: [${githubUrl}](https://github.com/${githubUrl})
- Email: ${email}

`;
};

const questions = [
  {
    type: "input",
    name: "title",
    message: chalk.green("What is your app title?"),
  },
  {
    type: "input",
    name: "description",
    message: chalk.blue("What is the description?"),
  },
  {
    type: "input",
    name: "installation",
    message: chalk.green("How do you install the app?"),
  },
  {
    type: "input",
    name: "usage",
    message: chalk.blue("How do you use the app?"),
  },
  {
    type: "list",
    message: chalk.green("What licences are you using?"),
    name: "license",
    choices: ["none", "GNU AGPLv3", "Mozilla Public", "License 2.0", "Apache License 2.0", "MIT License", "Boost Software License 1.0",
      "The Unlicense"],
  },
  {
    type: "input",
    name: "contributors",
    message: chalk.blue("Do you have any contrubutors?"),
  },
  {
    type: "input",
    name: "test",
    message: chalk.green("Do yo have any tests?"),
  },
  {
    type: "input",
    name: "questions",
    message: chalk.blue("Do yo have any questions?"),
  },
  {
    type: "input",
    name: "githubUrl",
    message: chalk.green("What is your gitHub user name?"),
  },
  {
    type: "input",
    name: "email",
    message: chalk.blue("What is your email?"),
  },
];


function init() {
  inquirer.prompt(questions).then((answers) => {
    console.log("Answers: ", answers);

    const readMeTemplate = generateReadMeFile(answers);

    const fileName = "README.md";
    fs.writeFile(fileName, readMeTemplate, (err) => {
      err ? console.log(err) : console.log(`Successfully created ${fileName}`);
    });
  });
}

function renderLicenseBadge(license) {
  if (license === "none") {
    return "";
  }
  else if (license === "MIT License") {
    return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  }
  else if (license === "Mozilla Public License 2.0") {
    return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
  }
  else if (license === "Apache License 2.0") {
    return "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
  }
  else {
    return '';
  }
}

function renderLicenseSection(license) {
  if (license === 'none') {
    return '';
  } else {
    return `## License
  Notice: this license is covered under, ${license}.`;
  }

}

function renderLicenseLink(license) {
  if (license === 'none') {
    return '';
  } else {
    return `- [License](#license)`;
  }
}


init();


 