const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB =require("./config/db");

dotenv.config();
connectDB();

const userRoutes = require("./routes/authRoutes"); 
const todoRoutes = require("./routes/todoRoutes");
const subTodoRoutes = require("./routes/subTodoRoutes"); 

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users",userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/subtodos", subTodoRoutes);

const PORT =process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
