'use client'
import React from 'react';
import { Image, Text, Center, Grid, GridItem, Box, Heading, Button, useTheme } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { fadeIn, fadeOut } from './theme';
import Logo from '@/components/Logo';
import FeaturesSection from '@/components/FeatureCard';

function Home() {
  const [isVisible, setIsVisible] = React.useState(true);
  const handleFadeOut = fadeOut;
  const theme = useTheme();

  const fadeInAnimation = theme.animations.fadeIn;

  return (
    <Box h="92vh" textAlign="center"> {/* Using color from the theme */}
           <FeaturesSection />
        <Link href="/auth/signup">
          <Button size="lg">Discover More</Button>
          
        </Link>
      </Box>
   )
}

export default Home;

