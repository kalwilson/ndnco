import express from "express";
import businessesController from "../controllers/businesses-controllers.js";
import { isAdmin } from "../middleware/is-admin.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.route("/search").get(businessesController.searchBusinesses);
router
  .route("/pending")
  .get(authenticate, isAdmin, businessesController.pendingBusinesses);

router
  .route("/")
  .get(businessesController.approvedBusinesses)
  .post(businessesController.registerBusiness);

router
  .route("/:id")
  .get(businessesController.findBusiness)
  .put(authenticate, isAdmin, businessesController.editBusiness)
  .delete(authenticate, isAdmin, businessesController.deleteBusiness);

router
  .route("/pending/:id")
  .put(authenticate, isAdmin, businessesController.updateApproval);

export default router;
