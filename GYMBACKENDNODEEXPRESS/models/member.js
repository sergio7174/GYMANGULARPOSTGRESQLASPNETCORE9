"use strict";

const
mongoose = require("mongoose"),
// Create a new schema with mongoose.Schema.
memberSchema = new mongoose.Schema({
 // Add schema properties.

  namemember:        {type: String},
  client_CI:         {type: String, require: true, unique: true  },
  email:             {type: String, require: true, unique: true  },
  phone:             {type: String, require: true },
  nameplan:          {type: String, require: true },
  timedays:          {type: Number, require: true },
  cost:              {type: Number, require: true },
  code:              {type: String, require: true, unique: true },
  status:            {type: Boolean, require: true },
  leftdays:          {type: Number, require: true },
  createdAt:         {type: Date},
  image:             {type: String, require: true },
  finishAt:          {type: Date}
 
                                                                             
},{
  // The timestamps property lets Mongoose know to include the createdAt and updatedAt
  // values, which are useful for keeping records on how and when data changes
  timestamps: true
}
);

// schema is defined, you need to apply it to a model and export it
module.exports = mongoose.model("Member", memberSchema);