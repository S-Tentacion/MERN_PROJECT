import express from "express";
import { getAllProducts, getProduct } from "../controller/product-controller.js";
import {
  getUserDetails,
  updateUserDetails,
  userLogin,
  userSignUp,
} from "../controller/user-controller.js";
const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin", userLogin);
router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);
router.get("/getuserdetails", getUserDetails);
router.patch("/updateUserDetails", updateUserDetails);

export default router;

// 1. Root level dir.
// 2. helpers folder third party api calls (etc. sms,s3, )
// 3. utils code for common functions
// 4. seed data - constant :: data :: seed-data.js