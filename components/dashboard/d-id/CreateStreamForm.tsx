'use client'
import { Card, CardHeader, CardBody, CardFooter, FormControl, InputGroup, Input, InputRightAddon, Button, Alert, Text, Center, Box } from "@chakra-ui/react";
import StreamStatus from "./StreamStatus";
import { ChangeEvent, FormEvent, useState } from "react";
import CreateNewStream from "@/lib/d-id/CreateNewStream";
import { createPeerConnection } from "@/lib/d-id/createPeerConnection";
import { getSdpReply } from "@/lib/d-id/getSdpReply";
import { createTalkStream } from "@/lib/d-id/createTalkStream";
import { useRecoilState, useRecoilValue } from "recoil";
import { exampleImageState } from "@/state/prediction-atoms";

export default function CreateStreamForm() 
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [avatarInput, setAvatarInput] = useState("");
    const avatar_url = useRecoilValue(exampleImageState);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setAvatarInput(e.target.value);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevents the default form submission action
  
      if (!avatar_url) {
        console.error("No model selected or user not found");
        return;
      }
      await CreateNewStream(avatar_url);
      await createPeerConnection();
      await getSdpReply();
      await createTalkStream();
    };

    return(
        <>
        <FormControl>
        <form onSubmit={handleSubmit}>
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
        </form>
      </FormControl>
      <StreamStatus />
      </>
    )
}