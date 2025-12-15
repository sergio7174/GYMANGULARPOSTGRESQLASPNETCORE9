const mongoose = require('mongoose'),
{ Schema } = require('mongoose');

const categorySchema = new Schema({

    name:{type:String, required: true },
    description: {type:String, required: true },
    image:{type:String, required: true },
    date: { type: Date, default: Date.now },


});
const Category = mongoose.model('Category', categorySchema)

module.exports = Category;