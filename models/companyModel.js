const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    id: {
        type: Number,
        min: 1,
        max: 99999999999,
        unique: true,
        required: [true, 'ID is necessary']
    },
    category_id : { 
        type: Number,
        min: 1,
        max: 99999999999
    },
    title: {
        type: String,
        maxlength: 255,
        required: [true, 'Title is necessary'],
    },
    image: {
        type: String,
        maxlength: 255,
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        required: [true, 'Status must be set']
    } 
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    
})


const Company = mongoose.model('Company', companySchema)

module.exports = Company