"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import SignOut from "../Auth/SignOut";
import {
  Image,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useUserContext } from "@/lib/UserProvider";

export const AccountForm = () => {
  const { userState } = useUserContext();
  const { userProfile } = useUserContext();
  const { setUserProfile } = useUserContext();
  const router = useRouter();

  function handleCancel() {
    router.push("/dashboard");
  }

  function handleInputChange() {
    // INSERT APPROPRIATE LOGIC
  }

  if (userState.loading) return <Center>Loading...</Center>;
  if (userState.error) return <Center>Error: {userState.error}</Center>;

  return (
    <Box>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <form onSubmit={setUserProfile}>
          <FormControl id="fullName">
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              name="full_name"
              value={userProfile.full_name || ""}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={userProfile.username || ""}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="fullName">
            <FormLabel>Website</FormLabel>
            <Input
              type="text"
              name="website"
              value={userProfile.website || ""}
              onChange={handleInputChange}
            />
          </FormControl>
          <Spacer />
          <Flex direction="row" justifyContent="space-evenly">
            <Button padding={".5px"} mt={2} colorScheme="teal" type="submit">
              Update
            </Button>
            <Button padding={".5px"} mt={2} colorScheme="gray" onClick={handleCancel}>
              Cancel
            </Button>
            <SignOut />
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};
