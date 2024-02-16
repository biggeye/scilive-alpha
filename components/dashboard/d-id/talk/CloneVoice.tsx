import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { voiceIdState, audioFileState } from '@/state/createTalk-atoms';
import AudioPlayer from '@/components/AudioPlayer';
import { Box, Button, Card, FormControl, FormLabel, Heading, Input, Switch, useToast, VStack } from '@chakra-ui/react';

interface CloneVoiceProps {
  onCompleted: () => void;
}

const CloneVoice: React.FC<CloneVoiceProps> = ({ onCompleted }) => {
  const [audioFile, setAudioFile] = useRecoilState<File | null>(audioFileState); // Ensure this state can handle File | null
  const [voiceId, setVoiceId] = useRecoilState(voiceIdState);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [useMicrophone, setUseMicrophone] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const toast = useToast();

  useEffect(() => {
    if (audioSrc) {
      return () => {
        URL.revokeObjectURL(audioSrc);
      };
    }
  }, [audioSrc]);

  const toggleMicrophoneUse = () => {
    setUseMicrophone(!useMicrophone);
    setIsRecording(false);
    if (recorder && isRecording) {
      recorder.stop();
    }
  };


  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      toast({
        title: 'Error',
        description: 'Recording is not supported in this browser.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      let audioChunks: BlobPart[] = []; // Explicitly type audioChunks

      newRecorder.ondataavailable = e => {
        audioChunks.push(e.data);
      };

      newRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
        const audioFile = new File([audioBlob], "recording.mp3", { type: 'audio/mpeg' }); // Create a File object
        setAudioFile(audioFile); // Set the File object
        const audioUrl = URL.createObjectURL(audioFile);
        setAudioSrc(audioUrl);
      };

      newRecorder.start();
      setIsRecording(true);
      setRecorder(newRecorder);
    } catch (error) {
      toast({
        title: 'Recording Error',
        description: 'Failed to start recording. Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "audio/mp3" || file.type === "audio/wav")) {
      setAudioFile(file);
      const urlObject = URL.createObjectURL(file);
      setAudioSrc(urlObject);
    } else {
      toast({
        title: 'Invalid File',
        description: 'Please upload a valid audio file (MP3 or WAV).',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async () => {
    if (!audioFile) {
      toast({
        title: 'No Audio File',
        description: 'Please upload an audio file before submitting.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('voice', audioFile);
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/did/voice/clone`, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const newVoiceId = await response.json();
        setVoiceId(newVoiceId.id);
        onCompleted(); // Signal completion
      } else {
        throw new Error('Failed to upload audio file.');
      }
    } catch (error) {
      toast({
        title: 'Submission Error',
        description: 'Failed to upload audio file. Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={5}>
      <Card>
        <VStack spacing={4} as="form" onSubmit={(e) => e.preventDefault()} p={5} boxShadow="xl" rounded="md" bg="white">
          <Heading>Clone Voice</Heading>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="use-microphone" mb="0">
              Use Microphone
            </FormLabel>
            <Switch id="use-microphone" isChecked={useMicrophone} onChange={toggleMicrophoneUse} />
          </FormControl>
          {useMicrophone ? (
            <Button colorScheme="blue" onClick={startRecording}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
          ) : (
            <FormControl isRequired>
              <Input type="file" accept="audio/*" onChange={handleChange} p={1.5} />
            </FormControl>
          )}
          
          <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
          {audioSrc && <AudioPlayer src={audioSrc} />}
        </VStack>
      </Card>
    </Box>
  );
};

export default CloneVoice;