import React from 'react';
import LiveLayout from "./LiveLayout";

// Explicitly type the props for the component
interface LiveLayoutProps {
  children: React.ReactNode;
}

// Use the DashboardProps interface to type the component's props
export default function Dashboard({ children }: LiveLayoutProps) {
  return <LiveLayout>{children}</LiveLayout>;
}
