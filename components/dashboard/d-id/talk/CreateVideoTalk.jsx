'use client';
import React from 'react';
import { useSteps, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, Box, StepSeparator, StepTitle, StepDescription } from "@chakra-ui/react";
import CreateVideoTalkForm from "./CreateVideoTalkForm";
import AudioUploader from "./Voice";
// Import the component for creating an avatar once it's built
// import CreateAvatarForm from "./CreateAvatarForm";

export const AvatarToVideo = () => {
  const steps = [
    { title: 'Clone Voice', description: 'Record or upload a recording of your voice' },
    { title: 'Create Avatar', description: 'Create the avatar for your video' },
    { title: 'Configure & Submit!', description: 'Configure and submit!' },
  ];

  const { activeStep, setActiveStep } = useSteps({
    initialStep: 0,
    count: steps.length,
  });

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <AudioUploader onCompleted={() => setActiveStep(stepIndex + 1)} />;
      case 1:
        // Assuming CreateAvatarForm is the component for creating an avatar
        // return <CreateAvatarForm onCompleted={() => setActiveStep(stepIndex + 1)} />;
        return <div>Avatar Creation Component Placeholder</div>;
      case 2:
        return <CreateVideoTalkForm onCompleted={() => setActiveStep(stepIndex + 1)} />;
      default:
        return <div>Completed!</div>;
    }
  };

  return (
    <div>
      <Stepper index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            {index < steps.length - 1 && <StepSeparator />}
          </Step>
        ))}
      </Stepper>
      <Box mt={4}>
        {renderStepContent(activeStep)}
      </Box>
    </div>
  );
};
