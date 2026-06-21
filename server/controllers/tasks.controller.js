import Task from "../models/tasks.model.js";

export const createTask = async (req, res) => {
    try {
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
        const { status } = req.query;
        let status_tasks;
        if (status === "all") {
            status_tasks = await Task.find().sort({ createdAt: -1 });
        }
        else if (status === "completed") {
            status_tasks = await Task.find({ completed: true }).sort({ createdAt: -1 });
        }
        else {
            status_tasks = await Task.find({ completed: false }).sort({ createdAt: -1 });
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

export const markTaskAsComplete = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Cannot complete Task"
            })
        }
        const task = await Task.findByIdAndUpdate(id, {
            completed: true
        }, { new: true })
        console.log(task)
        return res.status(201).json({
            success: true,
            message: "Updated Task successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Cannot Delete Task"
            })
        }

        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            return res.json({
                success: false,
                message: "Task not Found"
            })
        }
        return res.status(201).json({
            success: true,
            message: "Deleted Task Successfully"
        })

    } catch (error) {
        console.log("Delete task Error: ", error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}


export const getTaskById = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Id Not Found to fetch tasks"
            })
        }
        const task = await Task.findById(id);
        if (!task) {
            return res.status(400).json({
                message: "Task Not Found",
                success: false
            })
        }
        return res.status(200).json({
            success: true,
            message: "Task Fetched Successfully",
            task
        })
    } catch (error) {
        console.log("Get Task By ID Controller Error: ", error);
        return req.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}


export const updateTask = async (req, res) => {
    try {
        const { id, title, description, priority, dueDate } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, {
            title: title,
            description: description,
            priority: priority,
            dueDate: dueDate
        }, {
            new: true
        })
        if (!updateTask) {
            return res.status(401).json({
                success: false,
                message: "Couldn't update task"
            })
        }

        return res.status(200).json({
            success: true,
            message: "updated task successfully",
            updatedTask
        });
    } catch (error) {
        console.log("Update Task Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const markTaskIncomplete = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Cannot mark task as incomplete"
            })
        }
        const task = await Task.findByIdAndUpdate(id, {
            completed: false
        }, { new: true })
        if (!task) {
            return res.status(401).json({
                success: false,
                message: "Cannot mark task as incomplete"
            })
        }
        return res.json({
            message: "Marked As Incomplete",
            success: true,
            task
        })
    } catch (error) {
        console.log("Mark incomplete: ", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}