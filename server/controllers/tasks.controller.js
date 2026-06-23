import Task from "../models/tasks.model.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, priority, status, dueDate } = req.body;
        const user = req.user

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
            dueDate,
            user: user._id
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
        const { status = "all" } = req.query;

        const query = {
            user: req.user._id,
        };

        if (status === "completed") {
            query.completed = true;
        }

        if (status === "pending") {
            query.completed = false;
        }

        const status_tasks = await Task.find(query).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            status_tasks,
        });
    } catch (error) {
        console.log("Get Tasks Error", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const markTaskAsComplete = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Cannot complete Task"
            })
        }
        const task = await Task.findOneAndUpdate({
            _id: id,
            user: req.user._id
        }, {
            completed: true
        }, { returnDocument: 'after' })

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Updated Task successfully",
            task
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Cannot Delete Task"
            })
        }

        const task = await Task.findOneAndDelete({
            _id: id,
            user: req.user._id
        })
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Deleted Task Successfully",
            task
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
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id Not Found to fetch tasks"
            })
        }
        const task = await Task.findOne({
            _id: id,
            user: req.user._id
        });
        if (!task) {
            return res.status(404).json({
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
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const {  title, description, priority, dueDate } = req.body;
        const {id} = req.params
        const updatedTask = await Task.findOneAndUpdate({
            _id: id,
            user: req.user._id
        }, {
            title: title,
            description: description,
            priority: priority,
            dueDate: dueDate
        }, { returnDocument: 'after', runValidators: true })
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
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
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required"
            });
        }

        const task = await Task.findOneAndUpdate(
            {
                _id: id,
                user: req.user._id
            },
            {
                completed: false
            },
            { returnDocument: 'after' }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.json({
            message: "Marked As Incomplete",
            success: true,
            task
        });

    } catch (error) {
        console.log("Mark incomplete: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
