'use client'
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Input, FormControl, FormLabel, Box, Alert } from '@chakra-ui/react';
import { talkVideoPendingUrlState, talkVideoStatusState, talkVideoUrlState } from '@/state/d_id_talk';
import { createClient } from '@/utils/supabase/client';
import { uploadFileToBucket } from '@/lib/d-id/uploadAvatar'; // Ensure this is correctly imported
import AudioUploader from './Voice';
import { dataUriToBlob } from '@/lib/dataUriToBlob';
import { voiceIdState } from '@/state/d_id_talk';
import { useRecoilValue } from 'recoil';

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
  const voiceId = useRecoilValue(voiceIdState);

  const supabase = createClient();

  useEffect(() => {
    // This should be `number` in a browser environment, not `NodeJS.Timeout`
    let intervalId: number;

    const pollStatus = async () => {
      console.log("Polling for status with ID:", talkResponse?.id);
      // Exit polling if no talkResponse, or if the status is already 'done', or if there's a pending URL.
      if (!talkResponse || talkResponse.status === 'done') return;

      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wcm9kdWN0X2lkIjoicHJvZF9PTlNVUW5VcWZ3MUpPQSIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2N1c3RvbWVyX2lkIjoiY3VzX09FNUhIRUs5amRlS21iIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9uYW1lIjoibGF1bmNoIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfc3Vic2NyaXB0aW9uX2lkIjoic3ViXzFOUmQ2bUp4RUtaMnpBeW5SejBqaVlLYiIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2JpbGxpbmdfaW50ZXJ2YWwiOiJtb250aCIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3BsYW5fZ3JvdXAiOiJkZWlkLWFwaS1sYXVuY2giLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wcmljZV9pZCI6InByaWNlXzFOZXZOYUp4RUtaMnpBeW5JeFQ0SVlXciIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3ByaWNlX2NyZWRpdHMiOiIyMDAiLCJodHRwczovL2QtaWQuY29tL2NoYXRfc3RyaXBlX3N1YnNjcmlwdGlvbl9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vY2hhdF9zdHJpcGVfcHJpY2VfY3JlZGl0cyI6IiIsImh0dHBzOi8vZC1pZC5jb20vY2hhdF9zdHJpcGVfcHJpY2VfaWQiOiIiLCJodHRwczovL2QtaWQuY29tL3Byb3ZpZGVyIjoiYXV0aDAiLCJodHRwczovL2QtaWQuY29tL2lzX25ldyI6ZmFsc2UsImh0dHBzOi8vZC1pZC5jb20vYXBpX2tleV9tb2RpZmllZF9hdCI6IjIwMjQtMDEtMjdUMjA6MzE6MjIuMzA4WiIsImh0dHBzOi8vZC1pZC5jb20vb3JnX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9hcHBzX3Zpc2l0ZWQiOlsiU3R1ZGlvIiwiU3R1ZGlvIE1vYmlsZSBBcHAiXSwiaHR0cHM6Ly9kLWlkLmNvbS9jeF9sb2dpY19pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vY3JlYXRpb25fdGltZXN0YW1wIjoiMjAyMy0wNC0wMVQyMjo1NjowMi44MDhaIiwiaHR0cHM6Ly9kLWlkLmNvbS9hcGlfZ2F0ZXdheV9rZXlfaWQiOiIyMDF2enNiN3A1IiwiaHR0cHM6Ly9kLWlkLmNvbS91c2FnZV9pZGVudGlmaWVyX2tleSI6InVzZ19xMVZIb3p6X0l6TWxlVHRkZzFMNEMiLCJodHRwczovL2QtaWQuY29tL2hhc2hfa2V5IjoicWZyRlhZMTkyUWI3cjdfWTJnbHZ4IiwiaHR0cHM6Ly9kLWlkLmNvbS9wcmltYXJ5IjoiY3VzX09FNUhIRUs5amRlS21iIiwiaHR0cHM6Ly9kLWlkLmNvbS9lbWFpbCI6Im93ZW5Ac2NpZmljdGlvbi5jb20iLCJpc3MiOiJodHRwczovL2F1dGguZC1pZC5jb20vIiwic3ViIjoiYXV0aDB8NjQyOGI2ODIxZTYwMDZiNjU3ZWFlM2Y5IiwiYXVkIjpbImh0dHBzOi8vZC1pZC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vZC1pZC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA3NDcyMzE3LCJleHAiOjE3MDc1NTg3MTcsImF6cCI6Ikd6ck5JMU9yZTlGTTNFZURSZjNtM3ozVFN3MEpsUllxIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCByZWFkOmN1cnJlbnRfdXNlciB1cGRhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIG9mZmxpbmVfYWNjZXNzIn0.JFxKZe3QhJLS0ijBzUY5S9P_FQ0CdORRFlc6BcQm-e3gMrnGcHkSPDjsXSgr6PcBmkXgSUyH27H9NzSJALGXyZyrpQQciR-3WrHzVpsRc8rv4ks_JO4WoEF9eS99LdBKLBBIEwyGppUKxc169NSctKebaS-kNOkTpHZuko1WVSzA5-r84PSUJmRAP-1F-RhWFs-BaNhe5m0g2Dq1_ZnrG0nndToMB3b-62GVLqAEkHlVSwtsYgQ4Xfv0ycF67Ssv0aabMRR8mMEG6nEt5y0HX3xbL3rO1Kt6oj7_3trVdhHwvqliY5st5qkGpgVHHL4rZ_XQLYWD-q7VyaWs5bPV1Q'
          }
        };

        const response = await fetch(`https://api.d-id.com/talks/${talkResponse.id}`, options);
        if (!response.ok) {
          throw new Error(`Failed to fetch talk status: ${response.statusText}`);
        }
        const responseData = await response.json();

        // Assuming the response includes a status field indicating the processing status.
        console.log("Polling response:", responseData);

        // Check for 'done' status instead of 'complete'.
        if (responseData.status === 'done') {
          setTalkVideoPendingUrl(null); // Clear any pending URL since the process is done.
          setTalkVideoUrl(responseData.result_url); // Set the final video URL.
          setLoading(false);
          return;
        } else if (responseData.status === 'error' && responseData.pending_url) {
          // Handle any specific logic for 'error' status, if necessary.
          setTalkVideoPendingUrl(responseData.pending_url);
           setLoading(false);
          return;
        } else {
          // If the status is neither 'done' nor 'error', continue polling.
          // No need to manually set a timeout here as setInterval is being used outside this function.
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error("Polling error:", errorMessage);
        setError(errorMessage);
        setLoading(false);
        return;
      }
    };


    // Use setInterval for continuous polling
    intervalId = window.setInterval(pollStatus, 1000);

    // Cleanup interval on component unmount
    return () => window.clearInterval(intervalId);
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

  const handleReset = () => {
    setAvatarScript("");
    setTalkVideoUrl(null);
    setTalkVideoStatus(null);

  }
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

      const response = await fetch(`https://api.d-id.com/talks`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wcm9kdWN0X2lkIjoicHJvZF9PTlNVUW5VcWZ3MUpPQSIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2N1c3RvbWVyX2lkIjoiY3VzX09FNUhIRUs5amRlS21iIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9uYW1lIjoibGF1bmNoIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfc3Vic2NyaXB0aW9uX2lkIjoic3ViXzFOUmQ2bUp4RUtaMnpBeW5SejBqaVlLYiIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2JpbGxpbmdfaW50ZXJ2YWwiOiJtb250aCIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3BsYW5fZ3JvdXAiOiJkZWlkLWFwaS1sYXVuY2giLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wcmljZV9pZCI6InByaWNlXzFOZXZOYUp4RUtaMnpBeW5JeFQ0SVlXciIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3ByaWNlX2NyZWRpdHMiOiIyMDAiLCJodHRwczovL2QtaWQuY29tL2NoYXRfc3RyaXBlX3N1YnNjcmlwdGlvbl9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vY2hhdF9zdHJpcGVfcHJpY2VfY3JlZGl0cyI6IiIsImh0dHBzOi8vZC1pZC5jb20vY2hhdF9zdHJpcGVfcHJpY2VfaWQiOiIiLCJodHRwczovL2QtaWQuY29tL3Byb3ZpZGVyIjoiYXV0aDAiLCJodHRwczovL2QtaWQuY29tL2lzX25ldyI6ZmFsc2UsImh0dHBzOi8vZC1pZC5jb20vYXBpX2tleV9tb2RpZmllZF9hdCI6IjIwMjQtMDEtMjdUMjA6MzE6MjIuMzA4WiIsImh0dHBzOi8vZC1pZC5jb20vb3JnX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9hcHBzX3Zpc2l0ZWQiOlsiU3R1ZGlvIiwiU3R1ZGlvIE1vYmlsZSBBcHAiXSwiaHR0cHM6Ly9kLWlkLmNvbS9jeF9sb2dpY19pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vY3JlYXRpb25fdGltZXN0YW1wIjoiMjAyMy0wNC0wMVQyMjo1NjowMi44MDhaIiwiaHR0cHM6Ly9kLWlkLmNvbS9hcGlfZ2F0ZXdheV9rZXlfaWQiOiIyMDF2enNiN3A1IiwiaHR0cHM6Ly9kLWlkLmNvbS91c2FnZV9pZGVudGlmaWVyX2tleSI6InVzZ19xMVZIb3p6X0l6TWxlVHRkZzFMNEMiLCJodHRwczovL2QtaWQuY29tL2hhc2hfa2V5IjoicWZyRlhZMTkyUWI3cjdfWTJnbHZ4IiwiaHR0cHM6Ly9kLWlkLmNvbS9wcmltYXJ5IjoiY3VzX09FNUhIRUs5amRlS21iIiwiaHR0cHM6Ly9kLWlkLmNvbS9lbWFpbCI6Im93ZW5Ac2NpZmljdGlvbi5jb20iLCJpc3MiOiJodHRwczovL2F1dGguZC1pZC5jb20vIiwic3ViIjoiYXV0aDB8NjQyOGI2ODIxZTYwMDZiNjU3ZWFlM2Y5IiwiYXVkIjpbImh0dHBzOi8vZC1pZC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vZC1pZC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA3NDcyMzE3LCJleHAiOjE3MDc1NTg3MTcsImF6cCI6Ikd6ck5JMU9yZTlGTTNFZURSZjNtM3ozVFN3MEpsUllxIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCByZWFkOmN1cnJlbnRfdXNlciB1cGRhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIG9mZmxpbmVfYWNjZXNzIn0.JFxKZe3QhJLS0ijBzUY5S9P_FQ0CdORRFlc6BcQm-e3gMrnGcHkSPDjsXSgr6PcBmkXgSUyH27H9NzSJALGXyZyrpQQciR-3WrHzVpsRc8rv4ks_JO4WoEF9eS99LdBKLBBIEwyGppUKxc169NSctKebaS-kNOkTpHZuko1WVSzA5-r84PSUJmRAP-1F-RhWFs-BaNhe5m0g2Dq1_ZnrG0nndToMB3b-62GVLqAEkHlVSwtsYgQ4Xfv0ycF67Ssv0aabMRR8mMEG6nEt5y0HX3xbL3rO1Kt6oj7_3trVdhHwvqliY5st5qkGpgVHHL4rZ_XQLYWD-q7VyaWs5bPV1Q'
        },
        body: JSON.stringify({
          script: {
            type: 'text',
            subtitles: 'false',
            provider: {type: 'elevenlabs', voice_id: voiceId},
            ssml: 'false',
            input: avatarScript,
          },
          config: { fluent: 'false', pad_audio: '0.0' },
          source_url: uploadedFileUrl
        })
      });

      if (!response.ok) throw new Error('Failed to create avatar');
      const responseData = await response.json();
      console.log("Create avatar response:", responseData);
      setTalkResponse(responseData);
      console.log(talkResponse);
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
      {error && <Alert status="error" mt={4}>{error}</Alert>}
      {talkVideoUrl ? (<>

        <video width="750" controls>
          <source src={talkVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Button onClick={handleReset}>Clear</Button>
      </>) : (
        <form onSubmit={handleAvatarUpload}>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>Avatar Script:</FormLabel>
          <Input fontSize={{ base: "sm", md: "md" }}
            type="text" value={avatarScript} 
            onChange={(e) => setAvatarScript(e.target.value)} disabled={loading} />
          <FormLabel fontSize={{ base: "sm", md: "md" }} mt={4}>Source URL (optional if uploading):</FormLabel>
          <Input fontSize={{ base: "sm", md: "md" }}
            type="text" value={sourceUrl} 
            onChange={(e) => setSourceUrl(e.target.value)} disabled={loading} />
          <FormLabel fontSize={{ base: "sm", md: "md" }}
            mt={4}>Or Upload Avatar:</FormLabel>
          <Input type="file" accept="image/*" 
          onChange={onImageChange} disabled={loading} />
          <Button fontSize={{ base: "sm", md: "md" }}
            mt={4} type="submit" isLoading={loading} loadingText="Processing...">
            {userInFile ? "Upload and Create" : "Create Avatar"}
          </Button>
        </form>
      )}
    </Box>
  )
}
export default CreateVideoTalkForm;
