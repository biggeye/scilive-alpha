'use client'
import { Grid, GridItem, Card, CardHeader, CardBody, CardFooter, FormControl, InputGroup, Input, InputRightAddon, Button, Alert, Text, Center, Box } from "@chakra-ui/react";
import StreamStatus from "./StreamStatus";
import { ChangeEvent, FormEvent, useState } from "react";
import { createStream } from "@/lib/d-id/createStream";
import { createPeerConnection } from "@/lib/d-id/createPeerConnection";
import { getSdpReply } from "@/lib/d-id/getSdpReply";
import { createTalkStream } from "@/lib/d-id/createTalkStream";
import { useRecoilState, useRecoilValue } from "recoil";
import { exampleImageState } from "@/state/selected_model-atoms";
import { userImageUploadState } from "@/state/prediction-atoms";

export default function CreateStreamForm() 
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [avatarInput, setAvatarInput] = useState("");
    const avatar_url = useRecoilValue(exampleImageState);
    const [userInFile, setUserInFile] = useState<File | null>(null);
    const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);
   
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setAvatarInput(e.target.value);
    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setUserInFile(e.target.files[0]);
        setUserImageUpload(e.target.files[0]);
      }
    };

    const handleAvatarSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevents the default form submission action
  
      if (!avatar_url) {
        console.error("No model selected or user not found");
        return;
      }
      await createStream(avatar_url);
      await createPeerConnection();
      await getSdpReply();
      await createTalkStream();
    };

    return(
      <>
      <FormControl>
  
      <form onSubmit={handleAvatarSubmit}>
        <Grid templateRows="2">
          <GridItem>
        <Input
              padding=".5"
              size="xs"
              className="dynamic-input-upload"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              width="50%"
            />
</GridItem>
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
              {isLoading ? "Processing..." : "Submit"}
            </Button></InputRightAddon>
  
  
          </InputGroup>
          {error && <Alert>{error}</Alert>}
        </Grid>
        </form>
      </FormControl>
      <StreamStatus />
      </>
    )
}