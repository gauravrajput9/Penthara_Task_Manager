import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/user",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export const getUser = async() =>{
    try {
        const res = await axiosInstance.get("/getMe");
        return res.data
    } catch (error) {
        console.log("Get User Error: ",error )
        throw error
    }
}
export const loginUser = async(data) =>{
    try {
        const res = await axiosInstance.post("/login", data);
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log("Login User Error: ",error )
        throw error
    }
}

export const registerUser = async(data) =>{
    try {
        const res = await axiosInstance.post("/register", data);
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log("Register User Error: ",error )
        throw error
    }
}

export const logoutUser = async() =>{
    try {
        const res = await axiosInstance.get("/logout");
        return res.data
    } catch (error) {
        console.log("Logout User: ", error)
        throw error
    }
}