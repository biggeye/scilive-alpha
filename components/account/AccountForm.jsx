"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/lib/UserProvider";
import {
  Card,
  CardBody,
  CardFooter,
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spacer,
} from "@chakra-ui/react";

export const AccountForm = () => {
  const { userState, userProfile, setUserProfile } = useUserContext();
  const userId = userProfile.id;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [state, setState] = useState({
    X: false,
    TikTok: false,
    YouTube: false,
    Facebook: false,
    Instagram: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  function handleCancel() {
    router.push("/dashboard");
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const { supabase } = useUserContext();

    try {
      const { data, error } = await supabase
        .from("users")
        .update({
          full_name: userProfile.full_name,
          username: userProfile.username,
          website: userProfile.website,
        })
        .eq("id", userProfile.id);

      if (error) {
        setIsLoading(false);
        throw error;
      }

      console.log("User updated:", data);
      if (data) {
        Alert("Profile updated");
      }
      getProfile(userId);
      setIsLoading(false);
      router.push("/dashboard");
    } catch (err) {
      console.error("Error updating user:", err.message);
      setIsLoading(false);
    }
  }

async function getProfile(userId) {
  const profile = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/user/profile?id=${userId}`)
  console.log(profile);
  setUserProflie({profile});
}

  return (
    <Center>
      <Card
        m="100px"
        w={{ base: "85vw", md: "60vw" }}
        borderTopLeftRadius="10px"
        borderBottomRightRadius="10px"
        className="animated-shadow"
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
          minWidth="300px"
        >
          <form onSubmit={handleSubmit}>
            <CardBody>
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

              <FormControl id="socialMediaPlatforms">
                <FormLabel>Social Media Connections</FormLabel>
                {Object.keys(state).map((key) => (
                  <div key={key}>
                    <label>
                      <input
                        name={key}
                        type="checkbox"
                        checked={state[key]}
                        onChange={handleChange}
                      />
                      {key}
                    </label>
                  </div>
                ))}
              </FormControl>
            </CardBody>
            <CardFooter>
              <Flex direction="row" justifyContent="space-evenly">
                <Button
                  size="xxs"
                  padding={".5px"}
                  mt={2}
                  p={2}
                  colorScheme="teal"
                  type="submit"
                  disabled={isLoading}
                >
                  Update
                </Button>
              </Flex>
            </CardFooter>
          </form>
        </Flex>
      </Card>
    </Center>
  );
};
