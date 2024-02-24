import React from 'react';
import DashboardLayout from "./DashboardLayout";

// Explicitly type the props for the component
interface DashboardProps {
  children: React.ReactNode;
}

// Use the DashboardProps interface to type the component's props
export default function Dashboard({ children }: DashboardProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
