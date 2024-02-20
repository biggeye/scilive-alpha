'use client';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Stepper, Step, StepIndicator, StepTitle, StepNumber, StepIcon, StepDescription, StepStatus, StepSeparator, Box, VStack, HStack, Button, useToast } from "@chakra-ui/react";
import { webpageUrlState, voiceIdState, avatarUrlState, avatarScriptState } from '@/state/createTalk-atoms';
import CloneVoice from '@/components/dashboard/d-id/talk/CloneVoice';
import CreateAvatar from '@/components/dashboard/d-id/talk/CreateAvatar';
import WriteScript from '@/components/dashboard/d-id/talk/WriteScript';

const CreateTalk = () => {
  const userAvatarUrl = useRecoilValue(avatarUrlState);  
  const voiceId = useRecoilValue(voiceIdState);
  const avatarScript = useRecoilValue(avatarScriptState);
  
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Voice', component: CloneVoice },
    { title: 'Avatar', component: CreateAvatar },
    { title: 'Script', component: WriteScript },
  ];

  const nextStep = () => setActiveStep(prev => Math.min(prev + 1, steps.length));
  const isLastStep = activeStep === steps.length - 1;

  const handleSubmit = async () => {
    // Assuming this function is to be called on the last step
    try {
      const response = await fetch('/api/did/talk/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAvatarUrl, voiceId, avatarScript }),
      });
      const data = await response.json();
      console.log(data);
      // Proceed to the next step or handle completion here
    } catch (error) {
      console.error('Error submitting talk:', error);
    }
  };

  const StepComponent = steps[activeStep].component;

  return (
    
    <Box>
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
                      </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
    <VStack spacing={4}>
      <StepComponent onCompleted={nextStep} />
      <HStack spacing={4}>
        {activeStep > 0 && (
          <Button onClick={() => setActiveStep(prev => Math.max(prev - 1, 0))}>
            Previous
          </Button>
        )}
        {!isLastStep ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </HStack>
    </VStack>
  </Box>
  );
};

export default CreateTalk;
