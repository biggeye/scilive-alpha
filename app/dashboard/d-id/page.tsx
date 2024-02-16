import React from 'react';
import { useRecoilValue } from 'recoil';
import { webpageUrlState, voiceIdState, avatarUrlState, avatarScriptState } from '@/state/createTalk-atoms';
import { StepStatus, Box, Step, Stepper, StepIcon, StepTitle, StepDescription } from "@chakra-ui/react";
import { avatarNameState, avatarDescriptionState } from '@/state/videoState';
import { audioFileState } from '@/state/d-id/d_id_talk-atoms';
import CloneVoice from '@/components/dashboard/d-id/talk/CloneVoice';
import CreateAvatar from '@/components/dashboard/d-id/talk/CreateAvatar';
import WriteScript from '@/components/dashboard/d-id/talk/WriteScript';
import { Leap } from "@leap-ai/workflows";

const CreateTalk = () => {
  const userAvatarUrl = useRecoilValue(avatarUrlState);  
  const voiceId = useRecoilValue(voiceIdState);
  const avatarScript = useRecoilValue(avatarScriptState);
  
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Clone Voice', component: CloneVoice },
    { title: 'Create Avatar', component: CreateAvatar },
    { title: 'Write Script', component: WriteScript },
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
      const data = await response.json();
      console.log(data);
      // Proceed to the next step or handle completion here
    } catch (error) {
      console.error('Error submitting talk:', error);
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

export default CreateTalk;
