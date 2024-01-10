'use client'

import { Alert, Card, CardHeader, CardBody, CardFooter, FormControl, Grid, GridItem, Input, InputGroup, Text, InputRightAddon, Button } from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { imageNarrativesPromptState, imageNarrativesUploadState } from "@/state/prediction-atoms";
import { useImageNarrativeSubmit } from "@/lib/replicate/useImageNarrativeSubmit";

function ImageNarrativeForm () {
    const { isLoading, error, submitImageNarrative, displayedResponse } = useImageNarrativeSubmit();
    const [imageNarrativesUpload, setImageNarrativesUpload] = useRecoilState(imageNarrativesUploadState);
    const [imageNarrativesPrompt, setImageNarrativesPrompt] = useRecoilState(imageNarrativesPromptState);
    const [userInput, setUserInput] = useState<string>("");
   
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
                                size="sm"
                                placeholder="Enter text for image creation"
                                aria-label="Text for image creation"
                                value={imageNarrativesPrompt}
                                disabled={isLoading}
                                onChange={handleTextInputChange}
                            />
                            <InputRightAddon>
                                <Button
                                    size="sm"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Processing..." : "Submit"}
                                </Button>
                            </InputRightAddon>
                        </InputGroup>
                    </Grid>
                    {error && <Alert>{error}</Alert>}
                </form>
   
        </FormControl>
    )
    };
export default ImageNarrativeForm;