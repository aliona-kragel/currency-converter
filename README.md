# Currency-converter Test application

This project is a currency converter with both frontend and backend, utilizing React for the frontend, Express.js for the backend, and Firebase for the database.

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Demo](#demo)


## Installation

1. Clone this repository to your local machine:

git clone https://github.com/aliona-kragel/currency-converter.git

2. Navigate to the project directory:

cd currency-converter

3. Install the necessary dependencies for the frontend and backend:

/frontend/ 
 
cd client
npm install

/backend/ 

cd server
npm install


## Running the Application

To run the project, follow these steps:

1. Start the backend server to fetch currency exchange rates from the NBRB API:

cd server
npm run dev

2. Start the React frontend:

cd client
npm start

The Currency Converter should now be running locally. You can access it in your web browser by navigating to `http://localhost:3000`.


## Features

- The application consists of 2 pages:
  1. **Currency Conversion Page**: On this page, users can convert currencies and add new conversion fields.
  2. **Currency Rates Page**: This page displays a table with up-to-date currency exchange rates. The data is retrieved from the [NBRB API](https://api.nbrb.by/exrates/rates?periodicity=0) and is stored in Firebase. The rates are refreshed every 2 hours.

The Currency Converter offers a user-friendly interface for currency conversion and provides real-time exchange rate data for accurate conversions.

## Demo

You can access a live demo of the Currency Converter at [Demo Link](https://converter-client-29f77d8bee43.herokuapp.com).


