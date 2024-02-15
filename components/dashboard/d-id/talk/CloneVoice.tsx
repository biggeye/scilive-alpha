import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { audioFileState, voiceIdState } from '@/state/d-id/d_id_talk-atoms';
import AudioPlayer from '@/components/AudioPlayer';

interface CloneVoiceProps {
  onCompleted: () => void;
}

const CloneVoice: React.FC<CloneVoiceProps> = ({ onCompleted }) => {
  const [audioFile, setAudioFile] = useRecoilState(audioFileState);
  const setVoiceId = useSetRecoilState(voiceIdState);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

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
