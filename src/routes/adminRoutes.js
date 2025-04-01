const express = require("express") ;
const {protect,authorize} = require("../middleware/authMiddleware");
const { 
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser,
} = require("../controllers/adminControllers");

const router = express.Router();
router.use(protect,authorize(["admin"]));
router.get("/",getUsers);
router.get("/:id",getUserById);
router.post("/",createUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser); 

module.exports =router; 

