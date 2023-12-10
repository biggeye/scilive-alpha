import { useState, useEffect } from "react";
import {
  chakra,
  Link,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Box,
  Button,
  CircularProgress,
  Grid,
  GridItem,
  Flex,
  Image,
  Spacer,
  Select,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Center,
  Skeleton,
  Toast,
  useDisclosure,
  Text,
  IconButton,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { SettingsIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import ModelSelect from "./ModelSelect";
import { txt2img } from "../../../data/replicate/txt2img";
import axios from "axios";
import uploadPrediction from "../../../utils/replicate/uploadPrediction";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ImageCreation = () => {
  // ******STATE
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [predictionProgress, setPredictionProgress] = useState(0);
  const [delayToast, setDelayToast] = useState(null);
  const [error, setError] = useState(null);
  // Prediction preparation
  const [userInput, setUserInput] = useState("");
  const [negativeUserInput, setNegativeUserInput] = useState("");
  const [selectedModel, setSelectedModel] = useState({
    modelId: "601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",
    friendlyName: "Kandinsky-2",
    shortDesc:
      "text2img model trained on LAION HighRes and fine-tuned on internal datasets",
    example:
      "https://replicate.delivery/pbxt/2ReXGPtHrE1xe09lakZGFNY6FSdXUOPfSNkw2PAIXAAJ0mdhA/out.png",
  });
  // Prediction production
  const [prediction, setPrediction] = useState(null);
  const [newPrediction, setNewPrediction] = useState(null);

  // *****VARIABLES
  const user = useUser();
  const supabase = useSupabaseClient();
  const userId = user.id;
  const toast = useToast();

  const sortedTxt2Img = [...txt2img].sort((a, b) =>
  a.friendlyName.localeCompare(b.friendlyName, 'en', { sensitivity: 'base' })
);

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleModelChange = (modelId, friendlyName, shortDesc, example) => {
    setSelectedModel({ modelId, friendlyName, shortDesc, example });
    if (newPrediction) {
      handleImageReset();
    }
  };
  const handleUserInputSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const requestBody = {
        prompt: userInput,
        negative_prompt: negativeUserInput,
        version: selectedModel.modelId,
      };

      const response = await fetch("api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      let prediction = await response.json();

      if (response.status !== 201) {
        throw new Error(prediction.detail);
      }

      setPrediction(prediction);
      const startTime = new Date();
      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        const currentTime = new Date();
        const timeElapsed = (currentTime - startTime) / 1000; // convert to seconds

        // If more than 15 seconds have passed, show toast
        if (timeElapsed > 12) {
          setDelayToast("Please be patient, model is booting!");
        }

        await sleep(2500);
        const predictionResponse = await fetch(
          "/api/replicate/" + prediction.id
        );
        prediction = await predictionResponse.json();
        if (predictionResponse.status !== 200) {
          setError(prediction.detail);
          return;
        }
        const logs = prediction.logs;
        const regex = /(\d+)%/g;
        let matches;
        let highestPercentage = 0;

        while ((matches = regex.exec(logs)) !== null) {
          const percentage = parseInt(matches[1], 10);
          highestPercentage = Math.max(highestPercentage, percentage);
        }

        if (highestPercentage > 0) {
          setPredictionProgress(highestPercentage);
        }
        setPrediction(prediction);
      }
      if (prediction.status === "succeeded") {
        const predictionId = prediction.id;
        const modelId = prediction.version;
        // Make sure output is always an array
        let output = Array.isArray(prediction.output)
          ? prediction.output
          : [prediction.output];

        // If there is a second element in the array, use it as the file. Otherwise, use the first element.
        let file = output.length > 1 ? output[1] : output[0];
        const prompt = prediction.input.prompt;
        const imageUrl = await uploadPrediction(
          file,
          userId,
          modelId,
          predictionId,
          prompt,
          supabase
        );
        setNewPrediction(imageUrl);
      } else if (prediction.status === "failed") {
        console.log(prediction.error);
        setError(prediction.error);
      }
    } finally {
      setIsLoading(false);
      setUserInput("");
      setPrediction(null);
    }
  };
  const handleImageReset = (newPrediction) => {
    toast.closeAll();
    toast({
      title: "Image stored in EyeGallery",
      description: "Your image is stored in EyeGallery",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setNewPrediction(null);
  };
  useEffect(() => {
    if (error) {
      toast.closeAll();
      toast({
        title: "img2img Failed",
        description: `Process failed: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  }, [error, toast]);
  useEffect(() => {
    toast.closeAll();
    if (delayToast) {
      toast({
        title: "Delay Notice",
        description: delayToast,
        status: "info",
        duration: 10000,
        isClosable: false,
      });
    }
  }, [delayToast, toast]);

  return (
    <>
      <Box
        bgGradient="linear(to-b, white 0%, gray.200 40%, white 60%, white 100%)"
        overflowY="none"
        fontSize={["sm", "md", "lg", "xl"]}
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
      <Flex direction="column">
          <InputGroup>
            <Input
              color="black"
              name="prompt"
              placeholder="Describe your image here"
              size="md"
              resize="none"
              value={userInput}
              onChange={handleUserInputChange}
            />
            <InputRightAddon>
              <IconButton
                icon={<ArrowRightIcon />}
                isLoading={isLoading}
                onClick={handleUserInputSubmit}
                size="xs"
              />
            </InputRightAddon>
          </InputGroup>
        
        <Card w="80vw" align="center">
          <CardHeader>
            <ModelSelect
              handleModelChange={handleModelChange}
              models={sortedTxt2Img}
            />
          </CardHeader>
          <CardBody>
            {isLoading ? (
              prediction && (
                <Box>
                  <CircularProgress
                    isIndeterminate={prediction.status === "starting"}
                    value={predictionProgress}
                    color="green.300"
                  />
                  <br />
                  {prediction.status}
                </Box>
              )
            ) : (
              <Box
                mx="auto"
                rounded="lg"
                shadow="md"
                bg="white"
                _dark={{ bg: "gray.800" }}
                maxW="2xl"
              >
                {newPrediction ? (
                  <Image
                    roundedTop="lg"
                    w="full"
                    h="50vh"
                    fit="cover"
                    src={newPrediction}
                    alt="Article"
                    onClick={handleImageReset}
                  />
                ) : (
                  <Image
                    roundedTop="lg"
                    w="full"
                    h="50vh"
                    fit="cover"
                    src={selectedModel.example}
                    alt="Article"
                  />
                )}

                <Box p={6}>
                  <Box>
                    <chakra.span
                      fontSize="xs"
                      textTransform="uppercase"
                      color="brand.600"
                      _dark={{ color: "brand.400" }}
                    >
                      txt2img
                    </chakra.span>
                    <chakra.p
                      display="block"
                      color="gray.800"
                      _dark={{ color: "white" }}
                      fontWeight="bold"
                      fontSize="2xl"
                      mt={2}
                      _hover={{ color: "gray.600", textDecor: "underline" }}
                    >
                      {selectedModel.friendlyName}
                    </chakra.p>
                    <chakra.p
                      mt={2}
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: "gray.400" }}
                    >
                      {selectedModel.shortDesc}
                    </chakra.p>
                  </Box>
                </Box>
              </Box>
            )}
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
        </Flex>
      </Box>
      <Box
        fontSize={["sm", "md", "lg", "xl"]}
        p={[".25rem", ".5rem"]}
        position="fixed"
        bottom="0rem"
        width="100%"
        opacity={0.9}
        backdropFilter="blur(10px)"
      >
        
      </Box>
    </>
  );
};
export default ImageCreation;