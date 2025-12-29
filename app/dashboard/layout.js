"use client";

import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";
import HomeDesign from "@/app/components/HomePage";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (user==null) {
    redirect("/")
  }

  return <HomeDesign>{children}</HomeDesign>;
}
