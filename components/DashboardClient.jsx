"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { SideBar } from "./SideBar";
import { Dashboard } from "./DashboardContent";

export default function DashboardClient() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>You are not signed in.</div>;

  return (
    <div>
      <SideBar />   
    </div>
  );
}
