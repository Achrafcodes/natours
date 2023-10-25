// Import the necessary modules and set up the Express application.
const express = require('express'); // Import the Express framework.
const fs = require('fs'); // Import the file system module for working with files.
const app = express(); // Create an Express application.

// Middleware to parse incoming JSON data.
app.use(express.json());

// Read the tour data from a JSON file and store it in the 'tours' array.
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Define a route to handle GET requests for tours.
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// Define a route to handle POST requests for creating a new tour.
app.post('/api/v1/tours', (req, res) => {
  // Generate a new ID for the tour by incrementing the last tour's ID.
  const newId = tours[tours.length - 1].id + 1;
  // Create a new tour by combining the new ID and the request body.
  const newTour = Object.assign({ id: newId }, req.body);
  // Add the new tour to the 'tours' array.

  // Write the updated 'tours' array back to the JSON file.
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        data: tours,
      });
    }
  );
});

// Set up the Express server to listen on port 3000.
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
