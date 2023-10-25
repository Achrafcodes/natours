// Import the necessary modules and set up the Express application.
const express = require('express'); // Import the Express framework.
const fs = require('fs'); // Import the file system module for working with files.
const app = express(); // Create an Express application.

// Middleware to parse incoming JSON data.
app.use(express.json());
app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});
// Read the tour data from a JSON file and store it in the 'tours' array.
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Define a route to handle GET requests for tours.
const GetallTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length) {
    return res.status(404).json({
      status: 'error',
      message: '404 invalid Id boiee',
    });
  }
  res.status(200).json({
    status: 'success',
    tour,
  });
};
const CreateTour = (req, res) => {
  // Generate a new ID for the tour by incrementing the last tour's ID.
  const NewId = tours[tours.length - 1].id + 1;
  // Create a new tour by combining the new ID and the request body.
  const NewTour = Object.assign({ id: NewId }, req.body);

  // Add the new tour to the 'tours' array.
  tours.push(NewTour);

  // Write the updated 'tours' array back to the JSON file.
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'sucess',
        data: tours,
      });
    }
  );
};
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length) {
    return res.status(404).json({
      status: 'enon',
      message: '404 invalid Id boiee',
    });
  }
  res.status(200).json({
    status: 'success',
    tour: '<updated tour />',
  });
};
const Deletetour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length) {
    return res.status(404).json({
      status: 'enon',
      message: '404 invalid Id boiee',
    });
  }
  res.status(204).json({
    status: 'success',
    tour: null,
  });
};
app.route('/api/v1/tours').get(GetallTour).post(CreateTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(Deletetour);

// Set up the Express server to listen on port 3000.
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
