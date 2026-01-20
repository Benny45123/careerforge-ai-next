"use client";

import { useContext, useEffect } from "react";
import { AppContext } from "@/app/context/AppContext";
import HomeDesign from "@/app/components/HomePage";
import {  useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { user, loading } = useContext(AppContext);
  const router=useRouter();
  useEffect(()=>{
    if(!loading && !user){
      router.replace("/");
    }
  },[loading,user,router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <HomeDesign>{children}</HomeDesign>;
}
