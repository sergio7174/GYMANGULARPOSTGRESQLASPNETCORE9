"use strict";

const
mongoose = require("mongoose"),
// Create a new schema with mongoose.Schema.
packageSchema = new mongoose.Schema({
 // Add schema properties.

  nameplan:          {type: String},
  trialdaysFeatures: {type: Number, require: true },
  description:       {type: String, require: true },
  features:          {type: String, require: true },
  timedays:          {type: Number, require: true },
  image:             {type: String, require: true },
  cost:              {type: Number, require: true },
  code:              {type: String, require: true },
  status:            {type: String, require: true },
  createdAt:         {type: Date},
  //finishAt:          {type: Date}
                                                                             
},{
  // The timestamps property lets Mongoose know to include the createdAt and updatedAt
  // values, which are useful for keeping records on how and when data changes
  timestamps: true
}
);

// schema is defined, you need to apply it to a model and export it
module.exports = mongoose.model("Package", packageSchema);
