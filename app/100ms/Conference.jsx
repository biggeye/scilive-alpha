'use client'
import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "./Peer";

function Conference() {
  const peers = useHMSStore(selectPeers);
  return (
    <div className="conference-section">
      <h2>Conference</h2>
      <div>Invitee: vmr-kokb-srb</div>
      <div>Viewer: duj-klus-stx</div>
      <div>Stage: ssy-tuqm-lbg</div>
      <div>Backstage: ken-rwky-cqh</div>
      <div className="peers-container">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
    </div>
  );
}

export default Conference;
