# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A command-line CMS which is used to manage a company's employee database. Uses Express, MySQL and console.table to run both the front-end and back-end.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Testing](#testing)
- [Questions](#questions)

## Installation

Download the repository from Github, run 'npm i' in the project root folder, copy the commands found in 'schema.sql' and run them in your MySQL client. This should be enough to set up the local environment. If the user would like to seed the database with some example data, from the project root they should run 'node seeds/seed.js'. From that point, the user can run 'employee-tracker.js' to start the application.

## Usage

The user cycles through a list of possible options, some of which display tables from the database, some of which add new rows to those tables and some of which update existing table rows with new data. They may keep choosing options from this list until they are done, at which point they can select 'Quit' to end the program.

## Credits

None.

## License

  This software is covered under MIT License. To find out more, visit [MIT License](https://opensource.org/licenses/MIT)

## Testing

No tests provided at this time

## Questions

If you have any questions, direct them to https://github.com/aphexgil or gil.young.1994@gmail.com.
