import React from "react";
import { FaPlay, FaPause } from 'react-icons/fa';
import { LuMic, LuMicOff } from "react-icons/lu";

export const MicIcon = LuMic;
export const MicOffIcon = LuMicOff;
export const PlayIcon = FaPlay;
export const PauseIcon = FaPause;
export const AccountIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <style>
      {`.cls-1 { fill:none; stroke:#020202; stroke-miterlimit:10; stroke-width:1.91px; }`}
    </style>
    <circle className="cls-1" cx="12" cy="7.25" r="5.73"/>
    <path className="cls-1" d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"/>
  </svg>
);

export const DashboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"/>
  </svg>
);

export const GalleryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M8,6c0,1.1-0.9,2-2,2S4,7.1,4,6s0.9-2,2-2S8,4.9,8,6z"/>
      <path d="M0,0v19h20V0H0z M18,2v10.8L13.99,8L10,13l-3-3l-5,5.83V2H18z"/>
      <path d="M24,23H5v-2h17V5h2V23z"/>
    </g>
  </svg>
);


