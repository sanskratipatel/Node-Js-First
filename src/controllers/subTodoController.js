const SubTodo = require("../models/SubTodos");
const Todo = require("../models/Todo");

const createSubTodo = async (req, res) => {
  try {
    const { title, notes, todo } = req.body;
    const todos = await Todo.findById(todo);

    if (!todos || todos.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Todo not found" });
    } 
    console.log("We are here ")
    console.log(" title====", title)
    console.log("notes",notes)
    console.log("todo=====",todo)
    const subTodo = await SubTodo.create({ title, notes, todo }); 
    console.log("subTodo",subTodo)
    if (!todos.subTodos) {
        todos.subTodos = [];  // ✅ Ensure it's an array
    }
    todos.subTodos.push(subTodo._id);
    await todos.save();

    res.status(201).json(subTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubTodos = async (req, res) => {
  try {
    const subTodos = await SubTodo.find({ todo: req.params.todoId });
    res.json(subTodos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSubTodo = async (req, res) => {
  try {
    const subTodo = await SubTodo.findById(req.params.id);
    if (!subTodo) return res.status(404).json({ message: "SubTodo not found" });

    subTodo.title = req.body.title || subTodo.title;
    if (req.body.notes) subTodo.notes.push({ text: req.body.notes });

    const updatedSubTodo = await subTodo.save();
    res.json(updatedSubTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubTodo = async (req, res) => {
  try {
    const subTodo = await SubTodo.findById(req.params.id);
    if (!subTodo) return res.status(404).json({ message: "SubTodo not found" });

    await subTodo.deleteOne();
    res.json({ message: "SubTodo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSubTodo, getSubTodos, updateSubTodo, deleteSubTodo };
