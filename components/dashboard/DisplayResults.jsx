"use client";
import {
  predictionState,
  predictionResultState,
  predictionErrorState,
  predictionIdState,
  predictionProgressState,
  userImageUploadState,
  finalPredictionState,
  imageNarra,
  modelBootProgressState,
  modelBootResultState
} from "@/state/prediction-atoms";
import { exampleImageState } from "@/state/selected_model-atoms";
import {
  Modal,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  CircularProgress,
  useDisclosure,
} from "@chakra-ui/react";
import { fetchQuotes } from "@/lib/openai/fetchQuotes";
import React, { useState, useEffect } from "react";
import {
  Flex,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Center,
  Box,
  Spacer,
  Text,
  Progress,
  Tag,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

const DisplayResults = ({ tool, selectedImage }) => {
  const [displayedImage, setDisplayedImage] = useState(null);

  const modelBootProgress = useRecoilValue(modelBootProgressState);
  const modelBootResult = useRecoilValue(modelBootResultState);

  const predictionProgress = useRecoilValue(predictionProgressState);
  const predictionResult = useRecoilValue(predictionResultState);
  const prediction = useRecoilValue(predictionState);
  const error = useRecoilValue(predictionErrorState);
  const finalPrediction = useRecoilValue(finalPredictionState);

  const userImageUpload = useRecoilValue(userImageUploadState);
  const exampleImage = useRecoilValue(exampleImageState);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quotes, setQuotes] = useState([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);

  useEffect(() => {
    if (predictionResult) {
      onOpen(); // Open the modal when prediction results are available
      setDisplayedImage(null);
    }
  }, [predictionResult]);

  useEffect(() => {
    if (finalPrediction) {
      setDisplayedImage(finalPrediction);
      onModalClose();
    } else {
      setDisplayedImage(selectedImage || exampleImage);
    }
  }, [finalPrediction]);

  useEffect(() => {
    if (userImageUpload) {
      const objectURL = URL.createObjectURL(userImageUpload);
      setDisplayedImage(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [userImageUpload]);

  useEffect(() => {
    if (exampleImage) {
      setDisplayedImage(exampleImage);
    }
  }, [exampleImage]);

  const handleCloseModal = () => {
    if (finalPrediction || error) {
      // Replace this condition with your process completion condition
      onClose(); // Close the modal only if the process is complete
    }
  };

  return (
    <Card>
      <CardBody>
        {displayedImage ? (
          <Image
            height="auto"
            minHeight="50vh"
            width="75vw"
            src={displayedImage}
            alt="Selected or Processed"
            boxShadow="0 10px 20px rgba(0, 0, 0, 0.4)"
            borderRadius=".2rem"
          />
        ) : (
          <Skeleton
            minHeight="50vh"
            width="75vw"
            height="auto"
            boxShadow="0 5px 7px rgba(0, 0, 0, 0.4)"
          />
        )}
      </CardBody>

      <CardFooter></CardFooter>

      <Modal isOpen={isOpen} onClose={handleCloseModal} isClosable={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {" "}
            {predictionResult && <Tag size="xs">{predictionResult}</Tag>}
          </ModalHeader>

          <ModalBody>
            <Center>
              {" "}
              <CircularProgress isIndeterminate color="green.300" />
            </Center>

            <ModalFooter>
              <Flex
                width="100%"
                bgColor="gray"
                direction="column"
                borderRadius="md"
                borderColor="darkgrey"
                borderWidth={0.5}
                justifyContent="space-around"
              >
                <Spacer />
                {modelBootResult}
                {modelBootProgress && <Progress value={modelBootProgress} />}
                <Spacer />
                {predictionResult}
                {predictionProgress && <Progress value={predictionProgress} />}
                <Spacer />
              </Flex>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default DisplayResults;
