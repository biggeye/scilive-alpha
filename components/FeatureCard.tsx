import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Container,
  useStyleConfig,
} from '@chakra-ui/react';

const imageCreationPlaceholder = 'path/to/your/imageCreationPlaceholder.png';
const videoCreationPlaceholder = 'path/to/your/videoCreationPlaceholder.png';
const avatarTrainingPlaceholder = 'path/to/your/avatarTrainingPlaceholder.png';

interface FeatureCardProps {
    title: string,
    text: string,
    imgSrc: string,
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, text, imgSrc }) => {
  const styles = useStyleConfig("FeatureCard");

  return (
    <VStack
      spacing={4}
      align="start"
      sx={styles}
      className="element-fade-in" // Apply the fade-in animation from your theme
    >
      <Image borderRadius="md" src={imgSrc} alt={title} objectFit="cover" className="image-card" />
      <Heading size="md">{title}</Heading>
      <Text>{text}</Text>
    </VStack>
  );
};

const FeaturesSection = () => (
  <Container maxW="container.xl" py={10} className="fade-in-from-top">
    <VStack spacing={5}>
      <Heading as="h2" size="xl" textAlign="center">
        Explore the Future of Digital Creation
      </Heading>
      <Text textAlign="center" maxW="3xl">
        Dive into a world where your creativity knows no bounds with sciLive, your ultimate platform for digital creation.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <FeatureCard
          title="Image Creation"
          text="Craft stunning visuals with our advanced image generators and store every masterpiece in your personal gallery."
          imgSrc={imageCreationPlaceholder}
        />
        <FeatureCard
          title="Video Creation"
          text="Elevate your storytelling with talking head videos, clone voices, and create lifelike avatars."
          imgSrc={videoCreationPlaceholder}
        />
        <FeatureCard
          title="Avatar Training"
          text="Create a personalized model with just four pictures using our SDXL technology."
          imgSrc={avatarTrainingPlaceholder}
        />
      </SimpleGrid>
    </VStack>
  </Container>
);

export default FeaturesSection;
