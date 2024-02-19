# WeatherView

Welcome to WeatherView, an interactive web application designed to deliver personalized weather information at your fingertips. Utilizing Angular for the client-side, and Node.js, Express.js, and MongoDB for the server-side, WeatherView offers a seamless experience for users seeking real-time weather updates and forecasts.

# Project setup

## Prerequisites

- Angular CLI
- Node.js
- Express.js
- MongoDB

# Features
<img width="963" alt="Screenshot 2024-02-12 at 2 40 21 PM" src="https://github.com/MeghaSudhakaranNair/WeatherView/assets/152733482/9531749d-3bb2-46f4-9717-1549528f4a1a">

## Login/Signup Page
Secure user authentication to access personalized weather dashboards.
<img width="1440" alt="Screenshot 2024-02-19 at 2 26 51 PM" src="https://github.com/MeghaSudhakaranNair/WeatherView/assets/152733482/5b9e47db-b700-4ba4-93cc-5e8e47947206">



## Weather Dashboard
Displays weather details for the user's current location and any searched location, leveraging the OpenWeather API for real-time data.

<img width="938" alt="Screenshot 2024-02-12 at 1 23 22 PM" src="https://github.com/MeghaSudhakaranNair/WeatherView/assets/152733482/64b8f27c-b15c-4b21-ad08-88a8ca36cd15">


## Forecast Graphs
Visual representations of forecast data including temperature, humidity, and pressure trends over time.

<img width="971" alt="Screenshot 2024-02-12 at 2 39 57 PM" src="https://github.com/MeghaSudhakaranNair/WeatherView/assets/152733482/3d745a06-9c91-4cf1-88f7-005ed73fed0b">


## Profile Page
A dedicated page for users to view and update their personal details

# Architecture
WeatherView follows a model-controller architecture, ensuring a clean separation of concerns and enhancing maintainability. The application is divided into two main parts:

## Client-Side (Angular): 
Handles the user interface and user experience, providing dynamic content rendering and interactive functionalities.

## Server-Side (Node.js, Express.js, MongoDB): 
Manages API requests, user authentication, data retrieval, and server logic. The weather data is fetched from the OpenWeather API, and the user's current location is determined using http://ip-api.com/json/

# Client-Server Flow

## User Authentication: 
Users start by logging in or signing up through the Angular-based front end, which communicates with the Node.js server for authentication (handled by Express.js and MongoDB).

## Data Retrieval: 
Upon successful authentication, the client requests weather data from the server, which in turn fetches this data from the OpenWeather API and the current location using http://ip-api.com/json/.

## Data Presentation: 
The server sends back the weather and location data to the client, where Angular processes and displays it on the dashboard and other relevant sections of the application.

## User Interaction: 
Users can update their profile and search for weather forecasts in different locations, with all interactions managed by Angular on the client-side, and data processing handled on the server-side.

# Setup Requirements
Before you begin, ensure you have the following tools installed:

Node.js: Runtime environment for running the server-side JavaScript code.
MongoDB: NoSQL database to store user data and weather information.
Angular CLI: Command-line interface tool for initializing, developing, scaffolding, and maintaining Angular applications.
Additionally, you will need:

An API key from OpenWeather for accessing weather data.
A stable internet connection for fetching real-time data and accessing the MongoDB database (if hosted remotely).





