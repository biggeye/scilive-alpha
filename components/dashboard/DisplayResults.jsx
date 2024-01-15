"use client";
import {
  predictionResultState,
  predictionErrorState,
  predictionStatusState,
  predictionProgressState,
  userImageUploadState,
  finalPredictionState,
  imageNarra,
  modelBootProgressState,
  modelBootResultState,
} from "@/state/prediction-atoms";
import { exampleImageState } from "@/state/selected_model-atoms";
import {
  Modal,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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

  const predictionStatus = useRecoilValue(predictionStatusState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const predictionResult = useRecoilValue(predictionResultState);
  const error = useRecoilValue(predictionErrorState);
  const finalPrediction = useRecoilValue(finalPredictionState);

  const userImageUpload = useRecoilValue(userImageUploadState);
  const exampleImage = useRecoilValue(exampleImageState);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quotes, setQuotes] = useState([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);

  useEffect(() => {
    if (predictionStatus==="starting") {
      onOpen(); // Open the modal when prediction results are available
      setDisplayedImage(null);
    }
  }, [predictionStatus]);

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
            maxHeight="50vh"
            width="auto"
            src={displayedImage}
            alt="Selected or Processed"
            boxShadow="0 10px 20px rgba(0, 0, 0, 0.4)"
            borderRadius=".2rem"
          />
        ) : (
          <Skeleton
            maxHeight="50vh"
            width="auto"
            boxShadow="0 5px 7px rgba(0, 0, 0, 0.4)"
          />
        )}
      </CardBody>

      <CardFooter></CardFooter>

      <Modal isOpen={isOpen} onClose={handleCloseModal} isClosable={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex display="row" justifyContent="space-between">
              {predictionResult && <Tag size="xs">{predictionResult}</Tag>}
              <Spacer />
              {predictionStatus}
            </Flex>
          </ModalHeader>

          <ModalBody>
            <Center>
              <CircularProgress
                value={predictionProgress}
                isIndeterminate
                color="green.300"
              />
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
                {modelBootProgress && (
                  <Center>
                    {modelBootResult}
                    <Progress value={modelBootProgress} />
                  </Center>
                )}
                <Spacer />

                {predictionProgress && (
                  <Center>
                    {predictionResult}
                    <Progress value={predictionProgress} />
                  </Center>
                )}
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
