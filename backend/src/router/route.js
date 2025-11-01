import express from "express"
import { adminsignin, adminsignup } from "../controller/admin.js";
import { deleteUser, getalluser, getSingleUser, updateUserData, userdata } from "../controller/user.js";

const router = express.Router() ;

// -------admin-----
router.post("/admin-signup",adminsignup);
router.post("/admin-signin",adminsignin);


// -------userdata-----
router.post("/user-data",userdata)
router.post("/delete-user",deleteUser)
router.get("/get-single-data/:user_id",getSingleUser)
router.get("/get-all-user",getalluser)
router.post("/update-user-data/:user_id",updateUserData)

export default router;