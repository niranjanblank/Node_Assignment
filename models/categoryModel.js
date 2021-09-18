const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        min: 1,
        max: 99999999999,
        unique: true,
        required: [true, 'ID is necessary']
    },
    title: {
        type: String,
        maxlength: 255,
        required: [true, 'Title is necessary'],
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category