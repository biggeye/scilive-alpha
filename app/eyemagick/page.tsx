'use client'
import { Card, CardHeader, CardBody, CardFooter, Text, InputGroup, Input, Button } from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import Replicate from "replicate";
import { useRecoilState } from "recoil";
import { eyeMagickPromptState, eyeMagickUploadState } from "@/state/eyemagick-atoms";

function EyeMagick() {
    const [displayedResponse, setDisplayedResponse] = useState("");
    const [eyeMagickUpload, setEyeMagickUpload] = useRecoilState(eyeMagickUploadState);
    const [eyeMagickPrompt, setEyeMagickPrompt] = useRecoilState(eyeMagickPromptState);

    const handleUserInFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setEyeMagickUpload(e.target.files[0]);
        }
    };

    const handleUserPrompt = (e: ChangeEvent<HTMLInputElement>) => {
        setEyeMagickPrompt(e.target.value);
    };

    const handleReplicate = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Create a new FormData object
        const formData = new FormData();
    
        // Check if eyeMagickUpload is not null before appending
        if (eyeMagickUpload) {
            formData.append("eyeMagickUpload", eyeMagickUpload);
        }
        
        // Append eyeMagickPrompt as a string
        formData.append("eyeMagickPrompt", eyeMagickPrompt);
    
        try {
            const response = await fetch('/api/eyeMagick', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            setDisplayedResponse(result.output);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <Card>
            <form onSubmit={handleReplicate}>
                <CardHeader>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleUserInFile}
                        placeholder="Upload an image"
                    />
                </CardHeader>
                <CardBody>
                    <Text>
                        {displayedResponse}
                    </Text>
                </CardBody>
                <CardFooter>
                    <InputGroup>
                        <Input
                            type="text"
                            onChange={handleUserPrompt}
                            value={eyeMagickPrompt || ""}
                            placeholder="Describe something"
                        />
                        <Button
                            type="submit"
                        >
                            Submit
                        </Button>
                    </InputGroup>
                </CardFooter>
            </form>
        </Card>
    );
}

export default EyeMagick;
