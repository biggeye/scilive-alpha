// Corrected /app/dashboard/DashboardLayout.tsx
'use client'
import React from "react"
import { HMSRoomProvider } from "@100mslive/react-sdk"

interface LiveLayoutProps {
  children: any
}

const LiveLayout: React.FC<LiveLayoutProps> = ({ children }) => {



  return (
   <HMSRoomProvider>
  {children}
  </HMSRoomProvider>
  )
};

export default LiveLayout;
