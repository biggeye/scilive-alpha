"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/lib/UserProvider";
import { Box, Center, Flex, FormControl, FormLabel, Input, Button, Spacer } from '@chakra-ui/react';

export const AccountForm = () => {
  const { userState, userProfile, setUserProfile } = useUserContext();
  const router = useRouter();
  function handleCancel() {
    router.push("/dashboard");
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Add the logic to handle form submission
  }
  if (userState.loading) return <Center>Loading...</Center>;
  if (userState.error) return <Center>Error: {userState.error}</Center>;

  return (
    
      <Flex direction="column" alignItems="center" justifyContent="space-evenly">
        <form onSubmit={handleSubmit}>
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
          <FormControl id="website">
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
          </Flex>
        </form>
      </Flex>

  );
};

