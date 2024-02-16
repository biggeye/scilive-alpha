'use client';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Button, useSteps, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepSeparator, StepTitle, StepDescription } from "@chakra-ui/react";
import { voiceIdState, audioFileState } from '@/state/d-id/d_id_talk-atoms';
import { webpageUrlState } from '@/state/replicate/prediction-atoms';
import { avatarNameState, avatarDescriptionState } from '@/state/videoState';
import CloneVoice from '@/components/dashboard/d-id/talk/CloneVoice';
import CreateAvatar from '@/components/dashboard/d-id/talk/CreateAvatar';
import WriteScript from '@/components/dashboard/d-id/talk/WriteScript';
import { Leap } from "@leap-ai/workflows";

const CreateVideo = () => {
  // Recoil state values
  const webpageUrl = useRecoilValue(webpageUrlState);
  const avatarName = useRecoilValue(avatarNameState);
  const avatarDescription = useRecoilValue(avatarDescriptionState);
  const audioFile = useRecoilValue(audioFileState);

  // Define steps
  const steps = [
    { title: 'Clone Voice', description: 'Record or upload a recording of your voice' },
    { title: 'Create Avatar', description: 'Create the avatar for your video' },
    { title: 'Write Script', description: 'Write the script for your video' },
    { title: 'Submit', description: 'Review and submit your video creation' },
  ];

  const { activeStep, setActiveStep } = useSteps({
    count: steps.length, // Correct usage
  });
  

  // Async function to submit the workflow
  const submitWorkflow = async () => {
    if (!process.env.NEXT_PUBLIC_LEAP_API_KEY) {
      console.error("NEXT_PUBLIC_LEAP_API_KEY is not defined");
      return;
    }

    const leap = new Leap({
      apiKey: process.env.NEXT_PUBLIC_LEAP_API_KEY as string,
    });

    try {
      await leap.workflowRuns.workflow({
        workflow_id: "wkf_VJNj4EZZQNhxmd",
        input: {
          avatar_name: avatarName,
          avatar_description: avatarDescription,
          web_page_to_summarize: webpageUrl,
          clone_voice: audioFile,
        },
      });
      // Logic to handle the response
      setActiveStep(steps.length); // Assuming you want to move to a "completed" state
    } catch (error) {
      console.error("Failed to submit workflow:", error);
    }
  };

  // Implement renderStepContent
  const renderStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <CloneVoice onCompleted={() => setActiveStep(stepIndex + 1)} />;
      case 1:
        return <CreateAvatar onCompleted={() => setActiveStep(stepIndex + 1)} />;
      case 2:
        return <WriteScript onCompleted={submitWorkflow} />;
      default:
        return <div>All steps completed!</div>;
    }
  };

  return (
    <div>
      <Stepper margin={25} index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            {/* Step components */}
          </Step>
        ))}
      </Stepper>
      <Box mt={4}>
        {renderStepContent(activeStep)}
      </Box>
    </div>
  );
};

export default CreateVideo;
