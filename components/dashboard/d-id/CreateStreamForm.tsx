'use client'
import { InputLeftAddon, 
  Grid, 
  GridItem, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  FormControl, 
  InputGroup, 
  Input, 
  InputRightAddon, 
  Button, 
  Alert, 
  Text, 
  Center, 
  Box } from "@chakra-ui/react";
import StreamStatus from "./StreamStatus";
import { ChangeEvent, FormEvent, useState } from "react";
import { createStream } from "@/lib/d-id/createStream";
import { createPeerConnection } from "@/lib/d-id/createPeerConnection";
import { getSdpReply } from "@/lib/d-id/getSdpReply";
import { createTalkStream } from "@/lib/d-id/createTalkStream";
import { useRecoilState, useRecoilValue } from "recoil";
import { exampleImageState } from "@/state/config-atoms";
import { userAvatarUrlState } from "@/state/d_id_stream-atoms";
import { createClient } from "@/utils/supabase/client";
import { useUserContext } from "@/lib/UserProvider";
import uploadAvatar, { uploadFileToBucket } from "@/lib/d-id/uploadAvatar";
import { userImagePreviewState } from "@/state/prediction-atoms";
import {
  streamIdState,
  sessionIdState,
  sdpOfferState,
  iceServersState,
} from "@/state/d_id_stream-atoms";
import { convertToDataURI } from "@/lib/convertToDataURI";

export default function CreateStreamForm() {
  const [streamId, setStreamId] = useRecoilState(streamIdState);
  const [sessionId, setSessionId] = useRecoilState(sessionIdState);
  const [sdpOffer, setSdpOffer] = useRecoilState(sdpOfferState);
  const [iceServers, setIceServers] = useRecoilState(iceServersState);
  const { userProfile } = useUserContext();
  const userId = userProfile.id;

  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avatarInput, setAvatarInput] = useState("");
  const avatar_url = useRecoilValue(exampleImageState);
  const [userInFile, setUserInFile] = useState<File | null>(null);
  const [userAvatarUrl, setUserAvatarUrl] = useRecoilState(userAvatarUrlState);
  const [avatarBucketUrl, setAvatarBucketUrl] = useState(null);
  const [avatarName, setAvatarName] = useState("");
  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);

  const onAvatarNameChange = (e: ChangeEvent<HTMLInputElement>) => setAvatarName(e.target.value);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setAvatarInput(e.target.value);
  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const avatarUpload = await URL.createObjectURL(file);
      setUserAvatarUrl(avatarUpload);
      setUserInFile(file);
      setUserImagePreview(avatarUpload);
    }
  };

  const handleAvatarUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInFile) {
      console.log("Please Upload Image");
      return;
    }
    setIsLoading(true);
    try {
      // Replace this with your actual method to upload a file to the 'avatars' bucket
      const uploadedFileId = await uploadFileToBucket(userInFile, userAvatarUrl, supabase);
      console.log(uploadedFileId, avatarName, userId, supabase);
      const newAvatar = await uploadAvatar(uploadedFileId, avatarName, userId, supabase);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {

      setIsLoading(false);
    }
  };

  const handleAvatarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!avatar_url) {
      console.error("No model selected or user not found");
      return;
    }

    // Define your state setters here


    await createStream(avatar_url, setStreamId, setSessionId, setSdpOffer, setIceServers);
    // Other operations
  };

  return (
    <>
      <FormControl>
        <Grid templateRows="2">
          <form onSubmit={handleAvatarUpload}>
            <GridItem>
              <InputGroup>
                <InputLeftAddon>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Upload"}
                  </Button>
                </InputLeftAddon>
                <Input
                  padding=".5"
                  size="xs"
                  className="dynamic-input-upload"
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  width="30%"
                />
                <Input
                  size="xs"
                  type="text"
                  onChange={onAvatarNameChange}
                  width="70%"
                />
              </InputGroup>
            </GridItem>
          </form>
          <form onSubmit={handleAvatarSubmit}>
            <InputGroup>
              <Input
                size="sm"
                placeholder="Enter avatar's script"
                aria-label="Text for image creation"
                value={avatarInput}
                disabled={isLoading}
                onChange={handleInputChange}
              />
              <InputRightAddon> <Button type="submit" disabled={isLoading} size="sm">
                {isLoading ? "Processing..." : "Start Stream"}
              </Button></InputRightAddon>
            </InputGroup>
          </form>
          {error && <Alert>{error}</Alert>}
        </Grid>
      </FormControl>
      <StreamStatus />
    </>
  )
}