import "./UI/100ms.css";
import JoinForm from "../../app/100ms/JoinForm";
import { useEffect } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

export default function VideoStream() {
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      hmsActions.leave();
    };
  }, [hmsActions]);

  return (
    <div className="App">
      <JoinForm />
    </div>
  );
}
