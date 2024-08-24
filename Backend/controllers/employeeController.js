const Employee = require('../models/employee');

// Create
exports.createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        console.log(employee)
        await employee.save();
        res.status(201).send(employee);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Read
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).send(employee);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).send({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
};
