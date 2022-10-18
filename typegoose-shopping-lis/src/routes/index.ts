import express from "express";
import itemsRoutes from "./items/routes";
import listsRoutes from "./lists/routes";

const router = express.Router();

router.use("/items", itemsRoutes);
router.use("/lists", listsRoutes);

export default router;
