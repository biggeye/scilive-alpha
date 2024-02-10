import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import CreateStreamForm from "@/components/dashboard/d-id/stream/CreateStreamForm";
import CreateVideoTalk from "@/components/dashboard/d-id/talk/CreateVideoTalkForm";

const DID = () => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>Create Your Avatar</Tab>
        <Tab>Streaming</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CreateVideoTalk />
        </TabPanel>
        <TabPanel>
          <CreateStreamForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default DID;
