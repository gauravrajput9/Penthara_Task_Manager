import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const createTask = async (taskData) => {
    try {
        const response = await axiosInstance.post(
            "/tasks/createTask",
            taskData
        );

        return response.data;
    } catch (error) {
        console.log("create task axios error", error);
        throw error;
    }
};

export const getTasks = async (status) => {
    try {
        const res = await axiosInstance.get("/tasks/getTasks", {
            params: { status }
        })
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log("Get Tasks Error: ", error)
        throw error
    }
}

export const deleteTask = async (id) => {
    try {
        console.log(id)
        const res = await axiosInstance.delete(`/tasks/deleteTask/${id}`);
        return res.data;
    } catch (error) {
        console.log("delete task axios error: ");
        throw error
    }
}


export const completeTask = async (id) => {
    console.log(id)
    try {
        const res = await axiosInstance.patch(`/tasks/${id}/complete`);;
        return res.data;
    } catch (error) {
        console.log("complete task axios error: ");
        throw error
    }
}

