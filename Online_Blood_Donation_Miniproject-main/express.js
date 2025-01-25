// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Dummy database for storing blood donation requests
let donationRequests = [];

// Route to create a new blood donation request
app.post('/donation-request', (req, res) => {
    const { name, bloodType, contactInfo } = req.body;
    
    // Generate a unique ID for the request
    const requestId = uuidv4();
    
    // Create a new donation request object
    const newRequest = {
        id: requestId,
        name: name,
        bloodType: bloodType,
        contactInfo: contactInfo
    };
    
    // Add the request to the database
    donationRequests.push(newRequest);
    
    // Send a response
    res.status(201).json({ message: 'Donation request created successfully', requestId: requestId });
});

// Route to get all donation requests
app.get('/donation-requests', (req, res) => {
    res.status(200).json(donationRequests);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
