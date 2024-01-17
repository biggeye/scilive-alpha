'use client'
import { Box, Alert, Card, CardHeader, CardBody, CardFooter, FormControl, Grid, GridItem, Input, InputGroup, Text, InputRightAddon, Button } from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { imageNarrativesPromptState, imageNarrativesUploadState, predictionIsLoadingState, predictionErrorState } from "@/state/prediction-atoms";
import { useImageNarrativeSubmit } from "@/lib/replicate/useImageNarrativeSubmit";

function ImageNarrativeForm () {
    const { submitImageNarrative, displayedResponse } = useImageNarrativeSubmit();
    const [imageNarrativesUpload, setImageNarrativesUpload] = useRecoilState(imageNarrativesUploadState);
    const [imageNarrativesPrompt, setImageNarrativesPrompt] = useRecoilState(imageNarrativesPromptState);
    const [userInput, setUserInput] = useState<string>("");
    const predictionIsLoading = useRecoilValue(predictionIsLoadingState);
    const predictionError = useRecoilValue(predictionErrorState);
    const handleUserInFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageNarrativesUpload(e.target.files[0]);
        }
    };

    const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImageNarrativesPrompt(e.target.value);
    };

    const handleUserImageNarrativeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
       await submitImageNarrative(imageNarrativesUpload, imageNarrativesPrompt)
    };
    

    return (
        <Box className="fixedInputForm">
        <FormControl>
                <form onSubmit={handleUserImageNarrativeSubmit}>
                    <Grid templateRows="2">
                        <GridItem>
                            <Input
                                padding=".5"
                                size="xs"
                                type="file"
                                accept="image/*"
                                onChange={handleUserInFile}
                                width="50%"
                            />
                        </GridItem>
                        <InputGroup>
                            <Input
                                placeholder="Enter text for image creation"
                                aria-label="Text for image creation"
                                value={imageNarrativesPrompt}
                                disabled={predictionIsLoading}
                                onChange={handleTextInputChange}
                            />
                            <InputRightAddon>
                                <Button
                                    type="submit"
                                    disabled={predictionIsLoading}
                                >
                                    {predictionIsLoading ? "Processing..." : "Submit"}
                                </Button>
                            </InputRightAddon>
                        </InputGroup>
                    </Grid>
                    {predictionError && <Alert>{predictionError}</Alert>}
                </form>
   
        </FormControl>
        </Box>
    )
    };
export default ImageNarrativeForm;