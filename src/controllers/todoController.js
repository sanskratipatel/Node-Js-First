const Todo = require("../models/Todo");
const SubTodo = require("../models/SubTodos");

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description, user: req.user._id });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).populate("subTodos");
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.title = req.body.title || todo.title;
    todo.description = req.body.description || todo.description;
    todo.status = req.body.status || todo.status;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await SubTodo.deleteMany({ todo: todo._id });
    await todo.deleteOne();
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
