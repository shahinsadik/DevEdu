"use client"
import axios from "axios";


const axiosInstance = axios.create({
  baseURL: 'https://itder.com'
})

const useAxiosPublic = () => {
  return axiosInstance;
}

export default useAxiosPublic;