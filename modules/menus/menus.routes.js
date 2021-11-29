const express = require("express");
const menu = require("./menus.controller");
const verifyToken = require("../../middleware/ProtectedRoute");

const router = express.Router();

router.use(verifyToken);

// router.post("/get-all", menu.getAll);
// router.post("/get", menu.get);
// router.post("/create", menu.create);
// router.put("/order", menu.changeOrder);
// router.put("/access", menu.changeAccess);
// router.get("/impact-analysis/:id", menu.getImpactAnalysis);
// router.delete("/:id", menu.delete);

module.exports = router;
