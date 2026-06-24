import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/mongoConnect.js";
import taskRouter from "./routes/tasks.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.get("/api/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Task Tracker API is healthy",
  });
});

app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Task Tracker API Running",
  });
});

app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

try {
  await connectDB();
} catch (error) {
  console.log("MongoDB Connect Error", error);
}

app.listen(PORT, () => {
  console.log(`Server Listening On localhost:${PORT}`);
});
