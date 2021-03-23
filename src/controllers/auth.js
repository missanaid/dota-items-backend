const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generarJWT } = require("../helpers/jwt");

const getUsers = async (req, res = response) => {
  const users = await User.find().populate("user", "name");

  try {
    res.status(200).json({
      ok: true,
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe!",
      });
    }
    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    const token = await generarJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor contáctese con el administrador",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    const token = await generarJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor contáctese con el administrador",
    });
  }
};

const updateUser = async (req, res = response) => {
  const userId = req.params.id;
  const uid = req.params.id;
  // const password = req.body.password;

  try {
    const updated = await User.findById(userId);
    if (!updated) {
      return res.status(400).json({
        ok: false,
        msg: "El Usuario no existe",
      });
    }

    const newUser = {
      ...req.body,
      user: uid,
    };

    const userUpdated = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
    });

    res.json({
      ok: true,
      updated: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const userId = req.params.id;

  try {
    const deleted = await User.findById(userId);
    if (!deleted) {
      return res.status(400).json({
        ok: false,
        msg: "El Usuario no existe",
      });
    }

    await User.findByIdAndDelete(userId);
    res.json({ ok: true, msg: "Usuario Eliminado" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
  updateUser,
  getUsers,
  deleteUser,
};
