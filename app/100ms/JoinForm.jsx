'use client'
import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

import { FormControl, FormLabel, Input, Button, Heading, VStack, Box, Text } from "@chakra-ui/react";
import { VirtualBackground } from "@/components/100ms/plugins/VirtualBackground";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    token: ""
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      userName = '',
      roomCode = '',
    } = inputValues

    // use room code to fetch auth token
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })

    try {
      await hmsActions.join({ userName, authToken });
    } catch (e) {
      console.error(e)
    }
  };
  return (
    <FormControl as="form" onSubmit={handleSubmit} maxW="450px" m="30px auto" boxShadow="0 20px 40px rgba(0, 0, 0, 0.4)" borderRadius="8px" p={4}>
      <Heading as="h2" size="lg" mb="20px">Join Room</Heading>
      <VStack spacing={4} align="stretch">
        <Text>Invitee: vmr-kokb-srb</Text>
        <Text>Viewer: duj-klus-stx</Text>
        <Text>Stage: ssy-tuqm-lbg</Text>
        <Text>Backstage: ken-rwky-cqh</Text>
        <Box>
          <Input
            isRequired
            value={inputValues.name}
            onChange={handleInputChange}
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            borderRadius="8px"
            bg="#37474f"
            color="white"
            mb="20px"
          />
        </Box>
        <Box>
          <Input
            id="room-code"
            type="text"
            name="roomCode"
            placeholder="Room code"
            onChange={handleInputChange}
            borderRadius="8px"
            bg="#37474f"
            color="white"
            mb="20px"
          />
        </Box>
        <Button onClick={handleSubmit} type="submit" colorScheme="blue">Join</Button>
      </VStack>

    <VirtualBackground />
    </FormControl>  
  );
}




export default JoinForm;
