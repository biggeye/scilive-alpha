import { Box, Flex, Center, VStack, CircularProgress, Text, Progress, Card } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import {
  predictionIsLoadingState,
  modelBootResultState,
  predictionStatusState,
  predictionProgressState,
  finalPredictionState,
  finalPredictionPromptState,
  userImagePreviewState,
} from '@/state/prediction-atoms'; 
import { exampleImageState, selectedModelFriendlyNameState } from "@/state/config-atoms";// Adjust the import path according to your project structure
import ToolOptions from './ToolOptions';
import { ImageCard } from "../Cards";
import { motion } from 'framer-motion';

const DisplayResults = () => {
  const predictionIsLoading = useRecoilValue(predictionIsLoadingState);
  const modelBootResult = useRecoilValue(modelBootResultState);
  const predictionStatus = useRecoilValue(predictionStatusState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const finalPrediction = useRecoilValue(finalPredictionState);
  const finalPredictionPrompt = useRecoilValue(finalPredictionPromptState);
  const userImagePreview = useRecoilValue(userImagePreviewState);
  const exampleImage = useRecoilValue(exampleImageState);
  const selectedModelFriendlyName = useRecoilValue(selectedModelFriendlyNameState);

  const displayedImage = finalPrediction || userImagePreview || exampleImage;

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
            {predictionIsLoading ? (
              <Card className="image-card" borderColor="onyx" borderWidth="0.5px">
                <Flex direction="column" justifyContent="space-evenly">
                  {modelBootResult === "loading" && (
                    <CircularProgress isIndeterminate className="element-pulse" />
                  )}
                  <Text fontSize={{ base: "sm", md: "md" }}>Model Status: {modelBootResult}</Text>
                  <Progress value={predictionProgress} />
                  <Text fontSize={{ base: "sm", md: "md" }}>Prediction Status: {predictionStatus}</Text>
                </Flex>
              </Card>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                transition={{ duration: 0.5 }}
              >
                <ImageCard imageUrl={displayedImage} prompt={finalPredictionPrompt} modelName={selectedModelFriendlyName} />
              </motion.div>
            )}
          </VStack>
        </Center>
      </Flex>
    </Box>
  );
};

export default DisplayResults;