'use client'
import React from 'react';
import { Image, Text, Center, Grid, GridItem, Box, Heading, Button, useTheme } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import FeaturesSection from '@/components/FeatureCard';
import StripeWidget from '@/components/ui/Pricing/StripeWidget';

function Home() {


  return (
    <Box
      position="relative"
      h="92vh"
      textAlign="center"
      sx={{
        background: 'linear-gradient(to bottom, rgba(209,212,212,0.65) 0%,rgba(0,0,0,0) 100%)'
      }}
    >
      <FeaturesSection />
      <Link href="/auth/signup">
        <Button size="lg">Discover More</Button>
      </Link>
      <Box className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <StripeWidget />
      </Box>

    </Box>
  )
}

export default Home;

