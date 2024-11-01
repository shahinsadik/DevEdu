"use client";
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import useSmallScreen from '@/Hooks/useSmallScreen';
import { OrderContext } from '@/ContextAPIs/OrderProvider';
import useUser from '@/Security/useUser';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';

const NavbarTop = () => {
  const { open, setOpen, sidebarRef } = useContext(OrderContext);
  const [isSmallScreen] = useSmallScreen();
  const axiosSecure = useAxiosSecure();
  const router = useRouter(); 
  const [userData, , refetch] = useUser();
  const imgUrl = `https://littleaccount.com/uploads/userProfile/`;

  const handleLogout = async () => {
    try {
      const res = await axiosSecure('/api/logout');
      if (res.data) {
        localStorage.removeItem('token'); // Remove token before navigating
        toast.success('Logout Successfully', { position: "top-right" });
        refetch();
        router.push('/login'); // Navigate after other actions are completed
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred", { position: "top-right" });
    }
  };
  

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isSmallScreen) {
      if (open) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [open, isSmallScreen]);

  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen, setOpen]);

  return (
    <div className="bg-white py-pt_primary text-_white w-full shadow-md border-b-1 ">
      <ul className="flex gap-gap_primary justify-between px-pt_secondary ">
        <div className="flex items-center gap-gap_primary text-text_sm font-semibold lg:hidden">
          <MdMenu
            onClick={() => setOpen(!open)}
            className="text-text_xxl cursor-pointer text-black"
          />
        </div>
        <div className="hidden lg:block"></div>

        <div className="flex flex-col items-center justify-center text-text_sm font-semibold relative group">
          <div className="flex items-center gap-8">
            <h1 className="text-blue-500 text-xl font-medium">{userData?.userData?.name}</h1>
            {userData?.userData?.image ? (
              <Image
              height={500}
              width={500}
                className="w-[40px] h-[40px] rounded-full"
                src={`${imgUrl}${userData?.userData?.image}`}
                alt="User Profile"
              />
            ) : (
              <FaUserCircle className="w-[40px] h-[40px] rounded-full text-black" />
            )}
          </div>

          <div className="absolute top-10 right-3 bg-_white shadow-md rounded-sm overflow-hidden pt-2 w-48 z-10 group-hover:scale-100 transition-transform duration-300 transform origin-top-right scale-0">
            {userData && (
              <Link
                href="/profile"
                className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
              >
                Profile
              </Link>
            )}
            {userData ? (
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white w-full text-left"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default NavbarTop;
