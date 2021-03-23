const { Schema, model } = require("mongoose");

const AnimalSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  tipo: {
    type: String,
    require: true,
  },
  raza: {
    type: String,
  },
  color: {
    type: String,
    require: true,
  },
  edad: {
    type: Number,
  },
  foto: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

AnimalSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Animal", AnimalSchema);
