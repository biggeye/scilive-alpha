import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import CreateStreamForm from "@/components/dashboard/d-id/CreateStreamForm";
import CreateVideoTalkForm from "@/components/dashboard/d-id/CreateVideoTalkForm";

const DID = () => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>Create Stream</Tab>
        <Tab>Video Talk</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CreateStreamForm />
        </TabPanel>
        <TabPanel>
          <CreateVideoTalkForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default DID;
