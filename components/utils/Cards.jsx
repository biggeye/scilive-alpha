import { Center, Card, Text, Image } from "@chakra-ui/react";

export const ImageCard = ({ imageUrl, prompt, modelName }) => (
    <Card className="image-card" borderColor="onyx" borderWidth="0.5px"
    maxwidth="80vw">
     <Image
        margin="5px"
        width={{ base: "50vh", md: "60vh" }}
        maxWidth="70vw"
        height="auto"
        src={imageUrl}
        alt="Generated Content"
        borderRadius=".5rem"
      />
      {prompt && (
        <Text fontSize={{ base: "xs", md: "sm" }}>
          <b>Prompt:</b> {prompt}
        </Text>
      )}
      {modelName && (
        <Text fontSize={{ base: "xs", md: "sm" }}>
          <b>Model:</b> {modelName}
        </Text>
      )}
  
    </Card>
  );
  
  export const NarrativeCard = ({ narrative }) => (
    <Card className="narrative-card" borderColor="onyx" borderWidth="0.5px">
      <Text margin="5px" fontSize={{ base: "xs", md: "sm" }}>
        {narrative}
      </Text>
    </Card>
  );
  
  // Helper function to check if a string is a valid URL
  function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }
  