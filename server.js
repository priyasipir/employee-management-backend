const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employee = require('./models/Employee');

const app = express();

app.use(cors());
app.use(express.json());

/*mongoose.connect('mongodb://127.0.0.1:27017/employeesDB').then(
    () => console.log('MongoDB Connected')).catch((err) => console.log(err));*/

mongoose.connect("mongodb+srv://admin:Admin12345@cluster0.6p0gyye.mongodb.net/employeesDB?retryWrites=true&w=majority");



app.get('/', (req, res) => {
    res.send("Priya Backend Running");
});

app.post('/addEmployee', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json(error);
    }
});


app.delete('/employee/:id', async (req, res) => {
    try {
        await
            Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Employee Deleted'
        });
    } catch (error) {
        res.status(500).json(error);
    }

});

app.put('/employee/:id', async (req, res) => {
    console.log('update SPI hit');
    console.log(req.params.id);
    console.log(req.body);
    try {
        const employee = await
            Employee.findByIdAndUpdate(req.params.id,
                req.body, { new: true }
            );
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json(error);
    }
});

const PORT= process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('server running on port ${PORT}');
});