'use client'
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Input, FormControl, FormLabel, Box, Alert } from '@chakra-ui/react';
import { talkVideoPendingUrlState, talkVideoStatusState, talkVideoUrlState } from '@/state/d_id_talk';
import { createClient } from '@/utils/supabase/client';
import { uploadFileToBucket } from '@/lib/d-id/uploadAvatar'; // Ensure this is correctly imported
import { dataUriToBlob } from '@/lib/dataUriToBlob';

interface TalkResponse {
  id: string;
  status: string;
  // Add other properties as needed
}

const CreateVideoTalkForm = () => {
  const [avatarScript, setAvatarScript] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [userInFile, setUserInFile] = useState<File | null>(null);
  const [userInBlob, setUserInBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [talkResponse, setTalkResponse] = useState<TalkResponse | null>(null);
  const [talkVideoUrl, setTalkVideoUrl] = useRecoilState(talkVideoUrlState);
  const [talkVideoPendingUrl, setTalkVideoPendingUrl] = useRecoilState(talkVideoPendingUrlState);
  const [talkVideoStatus, setTalkVideoStatus] = useRecoilState(talkVideoStatusState);

  const supabase = createClient();

  useEffect(() => {
    let intervalId: NodeJS.Timeout; // Use `number` if you're in a non-Node.js environment
  
    const pollStatus = async () => {
      console.log("Polling for status with ID:", talkResponse?.id); // Before fetching status
      if (!talkResponse || talkResponse.status === 'complete' || talkVideoPendingUrl) return;
  
      try {
        const response = await fetch(`https://api.d-id.com/talks/${talkResponse.id}`);
        if (!response.ok) throw new Error('Failed to fetch talk status');
  
        const responseData = await response.json();
        console.log("Polling response:", responseData); // Log polling response
  
        setTalkVideoStatus(responseData.status);
  
        if (responseData.status === 'complete') {
          setTalkVideoPendingUrl(null);
          setTalkVideoUrl(responseData.result_url);
          setLoading(false);
        } else if (responseData.status === 'error' && responseData.pending_url) {
          setTalkVideoPendingUrl(responseData.pending_url);
          setLoading(false);
        } else {
          setTimeout(pollStatus, 1000); // Poll every 1 second
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error("Polling error:", errorMessage); // Log polling error
        setError(errorMessage);
      }
    };
  
    intervalId = setTimeout(pollStatus, 1000);
    return () => clearTimeout(intervalId);
  }, [talkResponse, talkVideoPendingUrl]);
  

const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];

    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // reader.result contains the contents of the file as a Data URL
        console.log("Data URI:", reader.result);
        setUserInFile(file); // Keep the file in state if you need it later
        // Optionally convert Data URI to blob here if needed for upload
        // Then you can set this blob or Data URI to a state or directly use it for upload
      };
  
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        setError("Failed to read file");
      };
  
      reader.readAsDataURL(file); // Converts the file to Data URI
    }
  };
  

  const handleAvatarUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      let uploadedFileUrl: string | undefined = sourceUrl;
      if (userInFile) {
        console.log("Uploading file...");
        uploadedFileUrl = await uploadFileToBucket(userInFile);
        if (typeof uploadedFileUrl === 'undefined') {
          throw new Error('File upload failed, URL is undefined.');
        }
        console.log("File uploaded to:", uploadedFileUrl);
      }
  
      // Ensure you have a valid URL before proceeding
      if (!uploadedFileUrl) {
        throw new Error('No source URL provided.');
      }
  
      console.log("Sending create avatar request with:", { avatar_script: avatarScript, source_url: uploadedFileUrl });
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/did/talk/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar_script: avatarScript,
          source_url: uploadedFileUrl,
        }),
      });
  
      if (!response.ok) throw new Error('Failed to create avatar');
      const responseData = await response.json();
      console.log("Create avatar response:", responseData);
      setTalkResponse(responseData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error("Create avatar error:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box>
      
      <form onSubmit={handleAvatarUpload}>
        <FormLabel>Avatar Script:</FormLabel>
        <Input type="text" value={avatarScript} onChange={(e) => setAvatarScript(e.target.value)} disabled={loading} />
        <FormLabel mt={4}>Source URL (optional if uploading):</FormLabel>
        <Input type="text" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} disabled={loading} />
        <FormLabel mt={4}>Or Upload Avatar:</FormLabel>
        <Input type="file" accept="image/*" onChange={onImageChange} disabled={loading} />
        <Button mt={4} type="submit" isLoading={loading} loadingText="Processing...">
          {userInFile ? "Upload and Create" : "Create Avatar"}
        </Button>
      </form>

      {error && <Alert status="error" mt={4}>{error}</Alert>}
      {!error && talkVideoUrl && <Alert status="success" mt={4}>Avatar created successfully: {talkVideoUrl}</Alert>}
    </Box>
  );
};

export default CreateVideoTalkForm;
