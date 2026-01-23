"use client";

import { memo } from "react";
import { DesktopSidebar } from "./components/desktop-sidebar";
import { MobileSidebar } from "./components/mobile-sidebar";
import { useSidebarCollapse } from "./hooks/use-sidebar-collapse";

const SidebarContent = memo(function SidebarContent() {
  useSidebarCollapse();

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
});

export const Sidebar = memo(function Sidebar() {
  return <SidebarContent />;
});
