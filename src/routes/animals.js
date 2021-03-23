const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");
const {
  getAnimals,
  crearAnimal,
  actualizarAnimal,
  eliminarAnimal,
} = require("../controllers/animals");

const router = Router();

router.use(validateJWT);

// router.get("/", getAnimals);
router.get("/", getAnimals);

router.post(
  "/",
  [
    check("name", "El Nombre es obligatorio").not().isEmpty(),
    check("tipo", "El Tipo es obligatorio").not().isEmpty(),
    check("color", "El Color es obligatoria").not().isEmpty(),
    validateFields,
  ],
  crearAnimal
);

router.put(
  "/:id",
  [
    check("name", "El Nombre es obligatorio").not().isEmpty(),
    check("tipo", "El Tipo es obligatorio").not().isEmpty(),
    check("color", "El Color es obligatoria").not().isEmpty(),
    validateFields,
  ],
  actualizarAnimal
);

router.delete("/:id", eliminarAnimal);

module.exports = router;
