import {
  Box,
  Flex,
  Center,
  VStack,
  CircularProgress,
  Text,
  Progress,
  Card,
  Skeleton,
  CardHeader,
  Button,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import {
  predictionIsLoadingState,
  cancelRunningPredictionState,
  modelBootResultState,
  predictionStatusState,
  predictionProgressState,
  finalPredictionState,
  finalPredictionPromptState,
  userImagePreviewState,
  globalLoadingState,
} from "@/state/replicate/prediction-atoms";
import {
  exampleImageState,
  selectedModelFriendlyNameState,
} from "@/state/replicate/config-atoms";
import ToolOptions from "./ToolOptions";
import { ImageCard } from "../utils/Cards";
import { motion } from "framer-motion";
import Link from "next/link";

const DisplayResults = () => {
  const cancelPrediction = useRecoilValue(cancelRunningPredictionState);
  const globalLoading = useRecoilValue(globalLoadingState);
  const predictionIsLoading = useRecoilValue(predictionIsLoadingState);
  const modelBootResult = useRecoilValue(modelBootResultState);
  const predictionStatus = useRecoilValue(predictionStatusState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const finalPrediction = useRecoilValue(finalPredictionState);
  const finalPredictionPrompt = useRecoilValue(finalPredictionPromptState);
  const userImagePreview = useRecoilValue(userImagePreviewState);
  const exampleImage = useRecoilValue(exampleImageState);
  const selectedModelFriendlyName = useRecoilValue(
    selectedModelFriendlyNameState
  );

  const displayedImage = finalPrediction || userImagePreview || exampleImage;
  const isFinalPredictionLoading =
    predictionIsLoading && exampleImage && userImagePreview;

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Box height="100%" m="25px">
      <Flex direction="column">
        <Center>
          <VStack>
            <ToolOptions />
            {globalLoading ? (
              <Card
                className="image-card"
                borderColor="onyx"
                borderWidth="0.5px"
              >
                <CardHeader>
                  {cancelPrediction && <Link href={cancelPrediction}>Cancel</Link>}
                </CardHeader>
                <Skeleton
                  height="400px"
                  width="400px"
                  className="element-pulse"
                />
                <Flex direction="column" justifyContent="space-evenly">
                  {modelBootResult === "loading" && (
                    <CircularProgress
                      isIndeterminate
                      className="element-pulse"
                    />
                  )}
                  <Text fontSize={{ base: "sm", md: "md" }}>
                    Model Status: {modelBootResult}
                  </Text>
                  <Progress value={predictionProgress} />
                  <Text fontSize={{ base: "sm", md: "md" }}>
                    Prediction Status: {predictionStatus}
                  </Text>
                </Flex>
              </Card>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                transition={{ duration: 0.5 }}
              >
                <ImageCard
                  imageUrl={displayedImage}
                  prompt={finalPredictionPrompt}
                  modelName={selectedModelFriendlyName}
                />
              </motion.div>
            )}
          </VStack>
        </Center>
      </Flex>
    </Box>
  );
};

export default DisplayResults;
