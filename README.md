# BootcampRishon

## Overview

This project follows the MVC (Model-View-Controller) architectural pattern with a few modifications to enhance organization and maintainability.

## Directory Structure

- **routes/**: Contains the route definitions. Routes are responsible for defining the endpoints and delegating the request handling to the appropriate controllers.
- **controllers/**: Contains the controllers which hold the business logic. Controllers process the incoming requests, interact with the models, and send responses back to the client.
- **views/**: Contains the view templates. This directory includes a `partials/` subdirectory that holds reusable parts of web pages, such as headers, footers, and navigation bars.
- **public/**: Contains static assets like CSS, JavaScript, and images. These files are accessible to the client and are used for client-side functionality and styling.
- **models/**: Contains the MongoDB schemas. Models define the structure of the data and interact with the database.
- **.env**: Contains global parameters and environment variables. This file is used to store configuration settings like database connection strings, API keys, and other sensitive information.

## Key Concepts

### Routes and Controllers

In this project, routes and controllers are separated to improve code organization:

- **Routes**: Define the URL endpoints and map them to the corresponding controller functions.
- **Controllers**: Contain the logic for handling requests, interacting with models, and returning responses.

### API Versioning

The project uses versioning for the API to manage changes and updates without breaking existing clients:

- **/api/v1/**: This directory contains the routes and controllers for version 1 of the API. By separating the API into versions, we can introduce new features or changes in future versions (e.g., `/api/v2/`) without affecting the existing functionality of version 1.

## Getting Started

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Set up the environment variables in the `.env` file.
4. Connect to MongoDB by ensuring your MongoDB server is running and the connection string in the `.env` file is correct.
5. Start the server using `node app.js`.
6. Open your browser and navigate to `http://localhost:8080` to view the application.

## Conclusion

This project structure follows the MVC pattern with a clear separation of concerns, making the codebase organized and maintainable. By separating routes and controllers, using partials in views, and organizing static assets in the public directory, we ensure a clean and efficient development process.