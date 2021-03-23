const { response } = require("express");
const Animal = require("../models/Animal");

const getAnimals = async (req, res = response) => {
  const idusuario = req.uid;
  console.log(idusuario);
  const animals = await Animal.find({ user: idusuario }).populate(
    "user",
    "name"
  );
  console.log(animals);

  try {
    res.status(200).json({
      ok: true,
      animals,
    });
  } catch (error) {
    console.log(error);
  }
};

const crearAnimal = async (req, res = response) => {
  const animal = new Animal(req.body);

  try {
    animal.user = req.uid;

    const animalGuardado = await animal.save();

    res.status(201).json({
      ok: true,
      animal: animalGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

const actualizarAnimal = async (req, res = response) => {
  const animalId = req.params.id;
  const uid = req.uid;

  try {
    const animal = await Animal.findById(animalId);

    if (!animal) {
      return res.status(404).json({
        ok: false,
        msg: "El Animal no existe",
      });
    }

    const nuevoAnimal = {
      ...req.body,
      user: uid,
    };

    const animalActualizado = await Animal.findByIdAndUpdate(
      animalId,
      nuevoAnimal,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      animal: animalActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

const eliminarAnimal = async (req, res = response) => {
  const animalId = req.params.id;
  const uid = req.uid;

  try {
    const animal = await Animal.findById(animalId);

    if (!animal) {
      return res.status(404).json({
        ok: false,
        msg: "El Animal no Existe",
      });
    }

    await Animal.findByIdAndDelete(animalId);

    res.json({ ok: true, msg: "Animal Eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

module.exports = {
  getAnimals,
  crearAnimal,
  actualizarAnimal,
  eliminarAnimal,
};
