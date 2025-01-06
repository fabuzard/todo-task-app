const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");  // Import cors
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js")
const taskRoutes = require("./routes/taskRoutes.js")
const User = require("./models/userSchema.js");
const Task = require("./models/taskSchema.js")
const app = express();

// Allow all origins
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow all common HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
}));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', taskRoutes);
app.use('/api', authRoutes);


mongoose
  .connect(
    "mongodb+srv://fabuzard123:Password123@cluster1.as9u6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(3000, () => {
  console.log("Node API app is running on port 3000");
});
