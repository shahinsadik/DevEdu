"use client"
import useUser from "@/Security/useUser";
import { useEffect, useState } from "react";



const useHasAccess = () => {
    const [hasAccess, setHasAccess] = useState()
    const [userData, isLoading] = useUser()

    useEffect(() => {
      if(userData){
        setHasAccess(userData.userPermissionData)
        }
    }, [userData])

    return [hasAccess, isLoading];
};

export default useHasAccess;