import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/mongoConnect.js";
dotenv.config();
import taskRouter from "./routes/tasks.routes.js"
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser"

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api/user", userRouter)
app.use("/api/tasks", taskRouter)
app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Task Tracker API Running",
    });
});

try {
    await connectDB();
} catch (error) {
    console.log("MongoDB Connect Error");
}

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Listening On localhost:${process.env.PORT}`);
})