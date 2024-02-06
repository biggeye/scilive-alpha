'use client'
import React from 'react';
import { Image, Text, Center, Grid, GridItem, Box, Heading, Button } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { fadeIn, fadeOut } from './theme';

function Home() {
  const [isVisible, setIsVisible] = React.useState(true);
  const handleFadeOut = fadeOut;

  return (
    <Box h="92vh" bg="silver" p={10} textAlign="center"> {/* Using color from the theme */}
        <Heading as="h1" mb={4}>
          <Center>
            <Image
              h="50vh"
              animation="fadeIn" // Simplified usage of animation from the theme
              src="/sciLive.svg"
            />
          </Center>
        </Heading>
        <Text fontSize="lg">Explore the Future of AI and Live Streaming</Text>
        <Link href="/auth/login">
          <Button colorScheme="orange" size="lg">Discover More</Button>
        </Link>
      </Box>
   )
}

export default Home;

