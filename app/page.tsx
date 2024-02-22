'use client'
import React from 'react';
import { Image, Text, Center, Grid, GridItem, Box, Heading, Button, useTheme } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { fadeIn, fadeOut } from './theme';
import Logo from '@/components/Logo';


function Home() {
  const [isVisible, setIsVisible] = React.useState(true);
  const handleFadeOut = fadeOut;
  const theme = useTheme();

  const fadeInAnimation = theme.animations.fadeIn;

  return (
    <Box h="92vh" bg="silver"  textAlign="center"> {/* Using color from the theme */}
        <Heading as="h1" mb={4}>
          <Center>
           <Logo />
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

