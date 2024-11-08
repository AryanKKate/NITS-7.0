const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const loanRoutes = require('./routes/loanRoutes');
require('./corn');
const cors = require('cors');

const app = express();

// Update CORS options to include your frontend's origin
const corsOptions = {
    origin: ['http://localhost:5173'], // Add more origins as needed
};

app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://shivpratikhande2017:vxgCsfWIRu4qZKtJ@cluster0.b5k5y.mongodb.net/')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

app.use(bodyParser.json());

app.use('/api', loanRoutes);

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
