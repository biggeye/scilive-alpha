import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { voiceIdState } from '@/state/d-id/d_id_talk-atoms'; // Ensure this path is correct
import { randomUUID } from 'crypto';
import generateUUID from '@/lib/generateUUID';

interface CloneVoiceProps {
  onCompleted: () => void;
}

const CloneVoice: React.FC<CloneVoiceProps> = ({ onCompleted }) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [voiceId, setVoiceId] = useRecoilState(voiceIdState);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      let audioChunks: BlobPart[] = [];

      newRecorder.ondataavailable = (event: BlobEvent) => {
        audioChunks.push(event.data);
      };

      newRecorder.start();

      const stopRecording = (): Promise<Blob> => {
        return new Promise((resolve) => {
          newRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
            resolve(audioBlob);
          };

          newRecorder.stop();
        });
      };

      setRecorder(newRecorder);
      return { stopRecording };
    } catch (error) {
      console.error('Error starting recording:', error);
      return null;
    }
  };

  const handleRecordClick = async () => {
    if (!isRecording) {
      const recording = await startRecording();
      if (recording) {
        setIsRecording(true);
      }
    } else if (recorder) {
      recorder.onstop = async () => {
        // Handle the recording stop logic
      };
      recorder.stop();
      setIsRecording(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setAudioFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!audioFile) return;

    const formData = new FormData();
    const uniqueName = generateUUID();
    formData.append('name', uniqueName);
    formData.append('file', audioFile);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/did/voice/clone`, {
        method: 'POST',
        headers: {
          // Ensure correct headers are set, if needed
        },
        body: formData,
      });
      const data = await response.json();

      if (data.voiceId) {
        setVoiceId(data.voiceId);
        onCompleted();
      }
    } catch (error) {
      console.error('Error submitting audio data:', error);
    }
  };

  return (
    <div>
      <button onClick={handleRecordClick}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <input type="file" accept="audio/*" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      {voiceId && <div>Response Voice ID: {voiceId}</div>}
    </div>
  );
};

export default CloneVoice;
