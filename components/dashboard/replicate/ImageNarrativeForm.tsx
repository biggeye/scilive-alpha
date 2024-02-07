'use client'
import { Select, Box, Alert, FormControl, Grid, GridItem, Input, InputGroup, InputRightAddon, Button } from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { finalNarrativePredictionState, userImagePreviewState, userImageDataUriState, imageNarrativeUploadState, predictionIsLoadingState, predictionErrorState } from "@/state/prediction-atoms";
import { useImageCreateSubmit } from "@/lib/replicate/useImageCreateSubmit";
import { convertToDataURI } from "@/lib/convertToDataURI";

function ImageNarrativeForm () {
    const submitImageCreate = useImageCreateSubmit();
    const [imageNarrativeUpload, setImageNarrativeUpload] = useRecoilState(imageNarrativeUploadState);
    const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
    const [userImageDataUri, setUserImageDataUri] = useRecoilState(userImageDataUriState);
    const [predictionIsLoading, setPredictionIsLoading] = useRecoilState(predictionIsLoadingState);
    const predictionError = useRecoilValue(predictionErrorState);

    const [userInput, setUserInput] = useState("");

    const handleUserInFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const imageUpload = await convertToDataURI(e.target.files[0])
            setUserImagePreview(imageUpload);
            setUserImageDataUri(imageUpload);
        }
    };

    const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value);

    const handleUserImageNarrativeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
         setPredictionIsLoading(true);
       await submitImageCreate(userInput);
       setPredictionIsLoading(false);
    };
    
    return (
        <Box>
             <FormControl>
                <form onSubmit={handleUserImageNarrativeSubmit}>
                    <Grid templateRows="3">
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
                        <GridItem>
                        <InputGroup>
                            <Input
                                placeholder="Enter text for image creation"
                                aria-label="Text for image creation"
                                value={userInput}
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
                        </GridItem>
                    </Grid>
                    {predictionError && <Alert>{predictionError}</Alert>}
                </form>
            </FormControl>
        </Box>
    )
    };

export default ImageNarrativeForm;