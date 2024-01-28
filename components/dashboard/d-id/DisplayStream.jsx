"use client";
import React, { useState, useEffect } from "react";
import {
  useTheme,
  Flex,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Center,
  Grid,
  GridItem,
  Box,
  Spacer,
  Text,
  Progress,
  Tag,
  Image,
  Skeleton,
  CircularProgress,
} from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  userImageUploadState,
  userImagePreviewState,
  predictionIsLoadingState
} from "@/state/prediction-atoms";
import {
  selectedModelFriendlyNameState,
  selectedModelShortDescState,
  selectedModelNameState,
  exampleImageState,
  userContentExamplesState,
} from "@/state/config-atoms";


const DisplayStream = () => {
  const theme = useTheme();

  const [displayedImage, setDisplayedImage] = useState(null);


  const exampleImage = useRecoilValue(exampleImageState);
  const selectedModelFriendlyName = useRecoilValue(
    selectedModelFriendlyNameState
  );
  const userContentExamples = useRecoilValue(userContentExamplesState);
  const userImagePreview = useRecoilValue(userImagePreviewState);

  useEffect(() => {

   /* 
   if (liveStream?) {
      setDisplayedImage(liveStream);
      return;
    } else 
    */
   
    if (talkVideo) {
      setDisplayedImage(talkVideo);
    }
    else if (userImagePreview) {
      setDisplayedImage(userImagePreview);
      return;
    } else if (exampleImage) {
      setDisplayedImage(exampleImage);
    }
  }, [userImagePreview, exampleImage]);

  return (
    <Grid
      templateAreas={{
        base: `"results"
             "description"
             "shortDesc"`,
       // Mobile layout
        md: `"results description"
           "results shortDesc"`
      }}
      gridTemplateRows={{
        base: "auto auto auto", // Mobile layout
        md: "50px 1fr", // Larger screens layout
      }}
      gridTemplateColumns={{
        base: "auto", // Mobile layout
        md: "30vw auto", // Larger screens layout
      }}
      h="100%"
      gap="1"
      color="blackAlpha.700"
    >
      <GridItem
        m="7px"
        pl="2"
        borderTopLeftRadius="5"
        borderTopRightRadius="5"
        area={"results"}
      >
        <Image
          height={{ base: "30vh", md: "40vh" }}
          width="auto"
          src={displayedImage}
          alt="Selected or Processed"
          boxShadow="0 10px 20px rgba(0, 0, 0, 0.4)"
          borderRadius=".5rem"
        />
        
      </GridItem>

      <Flex direction="column" justifyContent="space-between">
        <GridItem p="2" m="5px" area={"description"}>
          <Card m="1" p=".5" width="100%">
            <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
              description
            </Text>
          </Card>
        </GridItem>

        <GridItem p="2" m="5px" area={"shortDesc"}>
          <Card m="1" p=".5" width="100%">
            <Text fontSize={{ base: "xs", md: "sm" }}>
              Avatar Time
            </Text>
          </Card>
        </GridItem>
      
      </Flex>
    </Grid>
  );
};

export default DisplayStream;
