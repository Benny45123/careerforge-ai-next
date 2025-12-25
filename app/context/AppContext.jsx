"use client";
import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
    // const [user, setUser] = useState({name:"Hari",email:"hari@gmail.com"});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState(null);
  
    return (
      <AppContext.Provider
        value={{
          user,
          setUser,
          loading,
          setLoading,
          isOpen,
          setIsOpen,
          selectedDesign,
          setSelectedDesign,
        }}
      >
        {children}
      </AppContext.Provider>
    );
}
  
