const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name : String,
    experience : Number,
    gender : String,    
    hobbies : String,
    salary  : Number

})

module.exports = mongoose.model('Employee',EmployeeSchema)