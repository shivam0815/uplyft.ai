const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactFormDB');

// Define a schema and model for the contact form
const contactSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/contact', async (req, res) => {
    const newContact = new Contact({
        fullName: req.body.fullName,
        email: req.body.email,
        message: req.body.message
    });

    try {
        await newContact.save();
        res.send('Message received successfully.');
    } catch (err) {
        res.status(500).send('Error saving message.');
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
