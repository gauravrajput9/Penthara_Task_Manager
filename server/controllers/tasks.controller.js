import Task from "../models/tasks.model.js";

export const createTask = async (req, res) => {
    try {
        console.log(req.body)
        const { title, description, priority, status, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title for the task not found",
            });
        }

        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Description for the task not found",
            });
        }

        if (!priority) {
            return res.status(400).json({
                success: false,
                message: "Priority for the task not found",
            });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            status,
            dueDate
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        console.error("Create Task Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const getTasks = async (req, res) => {
    try {
        const { status } = req.body;
        let status_tasks;
        if (status === "all") {
            status_tasks = await Task.find();
        }
        else if (status === "completed") {
            status_tasks = await Task.find({ completed: true });
        }
        else {
            status_tasks = await Task.find({ completed: false })
        }
        
        return res.status(200).json({
            status: true,
            message: "Tasks fetched successfully",
            status_tasks
        })
    } catch (error) {
        console.log("Get Tasks Error", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}