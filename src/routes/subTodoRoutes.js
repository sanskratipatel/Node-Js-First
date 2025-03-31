const express = require("express");
const { createSubTodo, getSubTodos, updateSubTodo, deleteSubTodo } = require("../controllers/subTodoController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.route("/").post(protect, createSubTodo);
router.route("/:todoId").get(protect, getSubTodos);
router.route("/:id").put(protect, updateSubTodo).delete(protect, deleteSubTodo);

module.exports = router;
