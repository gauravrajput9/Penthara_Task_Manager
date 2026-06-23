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
        return res.data;
    } catch (error) {
        console.log("Get Tasks Error: ", error)
        throw error
    }
}

export const deleteTask = async (id) => {
    try {
        const res = await axiosInstance.delete(`/tasks/deleteTask/${id}`);
        return res.data;
    } catch (error) {
        console.log("delete task axios error: ");
        throw error
    }
}

export const completeTask = async (id) => {
    try {
        const res = await axiosInstance.patch(`/tasks/${id}/complete`);;
        return res.data;
    } catch (error) {
        console.log("complete task axios error: ");
        throw error
    }
}

export const getTaskById = async (id) => {
    try {
        const res = await axiosInstance.get("/tasks/getTaskById", {
            params: { id }
        })
        return res.data?.task
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateTask = async (taskData) => {
  try {
    console.log(taskData)

    const res = await axiosInstance.post(
      "/tasks/updateTask",
      taskData
    );

    return res.data;
  } catch (error) {
    console.log("Update Task Axios Error: ", error);
    throw error;
  }
};


export const markTaskIncomplete = async (id) =>{
    try {
        const res = await axiosInstance.patch(`/tasks/${id}/incomplete`)
        return res.data
    } catch (error) {
        console.log("Mark Task incomplete axios: ", error)
        throw error
    }
}
