'use client'
import JoinForm from "./JoinForm";
import Conference from "./Conference";
import Footer from "./Footer";
import { useEffect } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore
} from "@100mslive/react-sdk";

export default function HundredMS() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <div className="App">

      {isConnected ? (
        <>
        <Conference />
        <Footer />
        </>
      ) : (
        <JoinForm />
      )}
    </div>
  );
}

