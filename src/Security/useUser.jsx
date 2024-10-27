
"use client"
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useUser = () => {
    const axiosPublic = useAxiosSecure();
  
    const {data:userData = null, isLoading, refetch} = useQuery({
      queryKey : ['profile'],
      queryFn : async () => {
        const res = await axiosPublic("/api/profile");
        return res.data
      }
    })
    
    return [userData, isLoading, refetch]
    
};

export default useUser;