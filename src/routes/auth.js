const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  loginUser,
  renewToken,
  updateUser,
  getUsers,
  deleteUser,
} = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");

const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get("/", getUsers);

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

router.put(
  "/:id",
  [
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  updateUser
);

router.delete("/:id", deleteUser);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
