// server.js
const express = require('express');
const mongoose = require('mongoose');
const loanRoutes = require('./routes/loanRoutes');  

const app = express();


const mongoURI = 'mongodb+srv://shivpratikhande2017:vxgCsfWIRu4qZKtJ@cluster0.b5k5y.mongodb.net/'; 
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));


app.use(express.json());  


app.use('/api', loanRoutes);  


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
