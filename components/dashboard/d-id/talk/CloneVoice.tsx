import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { voiceIdState, audioFileState, avatarNameState } from '@/state/createTalk-atoms';
import AudioPlayer from '@/components/utils/AudioPlayer';
import { Box, Button, Card, FormControl, FormLabel, Heading, Input, Switch, useToast, VStack } from '@chakra-ui/react';

interface CloneVoiceProps {
  onCompleted: () => void;
}


const CloneVoice: React.FC<CloneVoiceProps> = ({ onCompleted }) => {
  const [audioFile, setAudioFile] = useRecoilState<File | null>(audioFileState);
  const [voiceId, setVoiceId] = useRecoilState<string | null>(voiceIdState);
  const [avatarName, setAvatarName] = useRecoilState<string | null>(avatarNameState);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [useMicrophone, setUseMicrophone] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const toast = useToast();

  useEffect(() => {
    return () => {
      if (audioSrc) {
        URL.revokeObjectURL(audioSrc);
      }
    };
  }, [audioSrc]);

  const toggleMicrophoneUse = () => {
    setUseMicrophone((prev) => !prev);
    if (recorder && isRecording) {
      recorder.stop();
      setIsRecording(false);
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
      // Explicitly declare audioChunks as an array of BlobPart
      let audioChunks: BlobPart[] = [];
  
      newRecorder.ondataavailable = e => {
        audioChunks.push(e.data);
      };
  
      newRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
        const audioFile = new File([audioBlob], "recording.mp3", { type: 'audio/mpeg' });
        setAudioFile(audioFile);
        const audioUrl = URL.createObjectURL(audioFile);
        setAudioSrc(audioUrl);
        setIsRecording(false);
  
        toast({
          title: 'Recording Complete',
          description: 'Your recording is ready for playback.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
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
    if (!audioFile || !avatarName) {
      toast({
        title: 'Missing Information',
        description: 'Please provide an avatar name and an audio file before submitting.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('voice', audioFile);
    formData.append('name', avatarName);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/did/voice/clone`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setVoiceId(data.id);
        onCompleted();
      } else {
        const error = await response.json();
        toast({
          title: 'Submission Error',
          description: error.message || 'Failed to upload audio file. Please try again.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
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
            <FormLabel htmlFor="use-microphone" mb="0">Use Microphone</FormLabel>
            <Switch id="use-microphone" isChecked={useMicrophone} onChange={toggleMicrophoneUse} />
          </FormControl>
          <FormControl>
            <FormLabel>Avatar Name</FormLabel>
          <Input type="text" value={avatarName || ''} onChange={(e) => setAvatarName(e.target.value)} placeholder="Enter avatar name" />
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