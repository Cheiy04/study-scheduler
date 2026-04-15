const express = require('express');
const bodyParser = require('body-parser');
const subjectsRoutes = require('./routes/subjects');
const scheduleRoutes = require('./routes/schedule');
const tasksRoutes = require('./routes/tasks');
const progressRoutes = require('./routes/progress');
const pdfRoutes = require('./routes/pdf');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/subjects', subjectsRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/pdf', pdfRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
