import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { audioFileState, voiceIdState } from '@/state/d-id/d_id_talk-atoms';
import AudioPlayer from '@/components/AudioPlayer';

interface CloneVoiceProps {
  onCompleted: () => void;
}

const CloneVoice: React.FC<CloneVoiceProps> = ({ onCompleted }) => {
  const [audioFile, setAudioFile] = useRecoilState(audioFileState);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
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
      recorder.stop();
      setIsRecording(false);
    }
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioSrc(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!audioFile) {
      alert('Please upload an audio file before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('voice', audioFile);
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/did/voice/clone`, {
      method: "POST",
      body: formData
    })
    if (response.ok) {
      const newVoiceId = await response.json();
      setVoiceId(newVoiceId.id);
      onCompleted(); // Signal that the component task is completed and proceed to the next step
    } else {
      alert('Failed to upload audio file. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      {audioSrc && <AudioPlayer src={audioSrc} />}
    </div>
  );
};

export default CloneVoice;
