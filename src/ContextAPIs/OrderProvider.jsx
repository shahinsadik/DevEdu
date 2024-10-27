"use client";
import { createContext, useRef, useState } from "react";

// Exporting the context so other components can import and use it
export const OrderContext = createContext(null);

const OrderProvider = ({ children }) => {
  const [examID, setExamID] = useState(null);
  const [open, setOpen] = useState(true); // State to control the sidebar visibility
  const sidebarRef = useRef(null); // Reference to the sidebar

  const info = {
    examID,
    setExamID,
    open,
    setOpen,
    sidebarRef,
  };

  return (
    <OrderContext.Provider value={info}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
