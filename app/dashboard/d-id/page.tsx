'use client'
import React from 'react';
import { voiceIdState } from '@/state/d-id/d_id_talk-atoms';
import { useRecoilValue } from "recoil";
import { Box, useSteps, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepSeparator, StepTitle, StepDescription } from "@chakra-ui/react";
import CloneVoice from '@/components/dashboard/d-id/talk/CloneVoice';
import CreateAvatar from '@/components/dashboard/d-id/talk/CreateAvatar';
import CreateVideoTalkForm from '@/components/dashboard/d-id/talk/CreateVideoTalkForm';
import WriteScript from '@/components/dashboard/d-id/talk/WriteScript';

export const TalkProduction = () => {
  const steps = [
    { title: 'Clone Voice', description: 'Record or upload a recording of your voice' },
    { title: 'Create Avatar', description: 'Create the avatar for your video' },
    { title: 'Configure & Submit!', description: 'Configure and submit!' },
  ];

  const { activeStep, setActiveStep } = useSteps({
    count: steps.length, // Correct property for setting initial step
  });
  
  console.log("Current active step:", activeStep);

  const renderStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <CloneVoice onCompleted={() => setActiveStep(stepIndex + 1)} />;
      case 1:
        return <CreateAvatar onCompleted={() => setActiveStep(stepIndex + 1)} />;
        case 2:
          return <WriteScript />
      case 3:
        return <CreateVideoTalkForm />;
      default:
        return <div>Completed!</div>;
    }
  };

  return (
    <div>
      <Stepper margin={25} index={activeStep}>
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
export default TalkProduction;
