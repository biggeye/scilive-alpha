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

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        let prediction = await replicate.deployments.predictions.create(
            "biggeye",
            "minigpt-4",
            {
                input: {
                    image: eyeMagickUpload,
                    prompt: eyeMagickPrompt,
                },
                stream: true,
                webhook: 'https://scilive.cloud/webhooks/eyemagick'
            }
        );

        const response = await prediction.output();
        setDisplayedResponse(response.output);
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
