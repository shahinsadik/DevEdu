"use client";

import MenuBar from "@/components/Shared/Navbar/MenuBar";
import { useContext } from "react";
import { OrderContext } from "@/ContextAPIs/OrderProvider"; // Import context
import useSmallScreen from "@/Hooks/useSmallScreen";

import Copyright from "@/components/Shared/Footer/Copyright";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/react-query-client";
import NavbarTop from "@/components/Shared/Navbar/NavbarTop";

const Wrapper = ({ children }) => {
  const { open, sidebarRef } = useContext(OrderContext); // Access the context
  const [isSmallScreen] = useSmallScreen(); // Custom hook to detect screen size

  return (
    <QueryClientProvider client={queryClient}>
    <div className="bg-primary overflow-hidden">
      <div className="w-full h-screen justify-between mx-auto overflow-y-auto overflow-hidden flex ">
        <div className=" flex items-start w-full">
          <div
            ref={sidebarRef}
            className={`lg:relative fixed top-0 lg:top-0 ${
              open ? "left-0" : "-left-[100%]"
            } duration-300 w-[308px] z-50 h-[calc(100vh)] overflow-y-auto`}
          >
            <MenuBar></MenuBar>
          </div>
          <div className="w-full">
            {isSmallScreen && open && (
              <div className="absolute top-0 left-0 w-full inset-0 bg-black opacity-50 z-20"></div>
            )}
            <NavbarTop />
            <div className="overflow-y-auto h-[calc(100vh-52px)]">
              <div className="min-h-[calc(100vh-140px)]">
              {children}
              </div>
              <Copyright />
            </div>
          </div>
        </div>
      </div>
    </div>
    </QueryClientProvider>
  );
};

export default Wrapper;
