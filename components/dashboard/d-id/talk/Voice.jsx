import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { voiceIdState } from "@/state/d_id_talk";
// Import necessary components and icons from lucide-react if needed

// Utility function to start recording audio from the microphone
const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  let audioChunks = [];

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.start();

  const stopRecording = () => {
    return new Promise((resolve) => {
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
        resolve(audioBlob);
      };

      mediaRecorder.stop();
    });
  };

  return { stopRecording };
};

const AudioUploader = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [voiceId, setVoiceId] = useRecoilState(voiceIdState);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  const handleRecordClick = async () => {
    if (!isRecording) {
      const recorder = await startRecording();
      setIsRecording(true);
      setRecorder(recorder);
    } else {
      recorder.stopRecording().then((audioBlob) => {
        setAudioFile(new File([audioBlob], "recording.mp3", { type: "audio/mpeg" }));
        setIsRecording(false);
      });
    }
  };

  const handleChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!audioFile) return;
    const response = await submitAudioData("User's Name", audioFile);
    if (response && response.voiceId) {
      setVoiceId(response.voiceId);
      // Now voiceId is available in the state and can be passed along or used as needed
    }
  };

  return (
    <div>
      <button onClick={handleRecordClick}>{isRecording ? "Stop Recording" : "Start Recording"}</button>
      <input type="file" accept="audio/*" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      {voiceId && <div>Response Voice ID: {voiceId}</div>}
    </div>
  );
};

export default AudioUploader;

async function submitAudioData(name, file) {
  const form = new FormData();
  form.append('name', name);
  form.append('file', file);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      // Include authorization token and other headers as necessary
    },
    body: form
  };

  // Note: Replace 'YOUR_API_ENDPOINT' with the actual endpoint
  try {
    const response = await fetch('https://api.d-id.com/tts/voices', options);
    const data = await response.json();
    console.log(data); // For debugging purposes
    return data; // Return the full response object
  } catch (err) {
    console.error(err);
    return null; // In case of error, return null to handle it gracefully
  }
}
