"use client";
import { createContext, useState ,useEffect} from "react";
import { checkLogin } from "../services/BackendHandler";

export const AppContext = createContext();

export function AppProvider({ children }) {
    // const [user, setUser] = useState({name:"Hari",email:"hari@gmail.com"});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState(null);
    useEffect(() => {
      const fetchUser = async () => {
        setLoading(true);
        const loggedInUser = await checkLogin();
        if (loggedInUser) {
          setUser(loggedInUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      };
      fetchUser();
    }, []);
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
  
