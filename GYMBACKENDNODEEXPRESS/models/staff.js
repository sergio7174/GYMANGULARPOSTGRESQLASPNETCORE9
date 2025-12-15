"use strict";

const
mongoose = require("mongoose"),
// Create a new schema with mongoose.Schema.
staffSchema = new mongoose.Schema({
 // Add schema properties.

  name:    {type: String},
  email:   {type: String, require: true, unique: true  },
  age:     {type: Number, require: true },
  id_card: {type: String, require: true },
  phone:   {type: String, require: true },
  address: {type: String, require: true },
  gender:  {type: String, require: true },
  field:   {type: String, require: true },
  image:   {type: String, require: true },
  createdAt: {type: Date},
                                                                              
},{
  // The timestamps property lets Mongoose know to include the createdAt and updatedAt
  // values, which are useful for keeping records on how and when data changes
  timestamps: true
}
);

// schema is defined, you need to apply it to a model and export it
module.exports = mongoose.model("Staff", staffSchema);