"use client";

import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";
import HomeDesign from "@/app/components/HomeDesign";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  const { user} = useContext(AppContext);



  if (!user) {
    redirect("/auth");
  }
  

    return <HomeDesign>{children}</HomeDesign>;
}
