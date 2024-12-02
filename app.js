const express = require('express');
const app = express();
const path = require('path');

// Middleware to check working hours
function workingHoursMiddleware(req, res, next) {
    const currentTime = new Date();
    const day = currentTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = currentTime.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send(`<h1>Sorry, the site is only accessible Monday to Friday, from 9 to 17.</h1>`);
    }
}

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Apply the middleware globally
app.use(workingHoursMiddleware);

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
