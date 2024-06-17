const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    form_type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country_code: {
        type: String,
        required: true  
    },
    phone_number: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Form', formSchema);