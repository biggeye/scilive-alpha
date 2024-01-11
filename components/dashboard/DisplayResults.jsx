"use client";
import {
  predictionState,
  predictionResultState,
  predictionErrorState,
  predictionIdState,
  predictionProgressState,
  userImageUploadState,

  finalPredictionState,
  imageNarra
} from "@/state/prediction-atoms";
import { exampleImageState } from "@/state/selected_model-atoms";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, CircularProgress, useDisclosure } from "@chakra-ui/react";
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

  const predictionProgress = useRecoilValue(predictionProgressState);
  const predictionResult = useRecoilValue(predictionResultState);
  const prediction = useRecoilValue(predictionState);
  const progress = useRecoilValue(predictionProgressState);
  const error = useRecoilValue(predictionErrorState);
  const finalPrediction = useRecoilValue(finalPredictionState);

  const userImageUpload = useRecoilValue(userImageUploadState);
  const exampleImage = useRecoilValue(exampleImageState);

  const { isOpen: Open, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const [quotes, setQuotes] = useState([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);

useEffect(() => {
    if (predictionResult >= 1) {
      fetchQuotes().then((quotes) => {
        setQuotes(quotes);
        setIsLoadingQuotes(false);
      });
      onModalOpen();
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

      <CardFooter>
        <Flex
          width="100%"
          direction="column"
          bgColor="gray"
          borderColor="darkgrey"
          borderWidth={0.5}
          justifyContent="space-around"
        >
          <Spacer />
          {progress && <Progress value={progress} />}
          <Spacer />
          {predictionResult && <Tag size="xs">{predictionResult}</Tag>}
          <Spacer />
        </Flex>
      </CardFooter>

      <Modal isOpen={Open} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Random Quotes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoadingQuotes ? (
              <Center>
                <CircularProgress isIndeterminate color="green.300" />
              </Center>
            ) : (
              quotes.map((quote, index) => <Text key={index}>{quote}</Text>)
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default DisplayResults;
