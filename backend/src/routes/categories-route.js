import express from "express";
import categoriesControllers from "../controllers/categories-controllers.js";

const router = express.Router();

router.route("/").get(categoriesControllers.getCategories);

router.route("/subcategories").get(categoriesControllers.getAllSubcategories);

router
  .route("/:categoryid/subcategories")
  .get(categoriesControllers.getSubcategories);

export default router;
