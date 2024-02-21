"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/lib/user/UserProvider";
import {
  Grid,
  GridItem,
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
  Alert,
  AlertIcon,
  Select,
} from "@chakra-ui/react";
import { createClient } from "@/utils/supabase/client";
import MasterContentDisplay from "../MasterContent";

export const AccountForm = () => {
  const { userProfile, setUserProfile } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formState, setFormState] = useState({
    full_name: "",
    username: "",
    website: "",
    // Initialize other fields as needed
  });
  const [error, setError] = useState("");
  const [modelType, setModelType] = useState();

  const getModelLists = async () => {
    const modelType =
      await fetch`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/content/getModels/${modelType}`;
  };
  // Update form state when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormState({
        full_name: userProfile.full_name || "",
        username: userProfile.username || "",
        website: userProfile.website || "",
        email: userProfile.email || "",
        // Update other fields as needed
      });
    }
  }, [userProfile]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("users")
        .update(formState)
        .eq("id", userProfile.id);

      if (error) {
        throw error;
      }

      setUserProfile({ ...userProfile, ...data[0] });
      router.push("/dashboard");
    } catch (err) {
      console.error("Error updating user:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Center>
      <Card
        m="100px"
        w={{ base: "85vw", md: "60vw" }}
        borderTopLeftRadius="10px"
        borderBottomRightRadius="10px"
        className="animated-shadow"
      >
        <form onSubmit={handleSubmit}>
          <CardBody>
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <FormControl id="fullName">
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="full_name"
                value={formState.full_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formState.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>E-mail</FormLabel>
              <Input
                type="text"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="website">
              <FormLabel>Web Site</FormLabel>
              <Input
                type="text"
                name="website"
                value={formState.website}
                onChange={handleInputChange}
              />
            </FormControl>

            <Grid
              templateAreas={`
                 "header header header"
                 "label pulldown pulldown"
`}
            >
              <GridItem area="header">CUSTOMIZE WORKSPACE DEFAULTS</GridItem>

              <GridItem area="label">Workspace:</GridItem>
              <GridItem area="pulldown">
                <Select></Select>
              </GridItem>
            </Grid>
            <MasterContentDisplay />
            {/* Add other form controls similarly */}
          </CardBody>
          <CardFooter>
            <Button
              size="sm"
              mt={2}
              colorScheme="teal"
              type="submit"
              isLoading={isLoading}
            >
              Update
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Center>
  );
};
