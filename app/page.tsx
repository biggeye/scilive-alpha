'use client'
import React from 'react';
import { Image, Text, Center, Grid, GridItem, Box, Heading, Button } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { fadeIn, fadeOut } from './theme';

function Home() {
  const [isVisible, setIsVisible] = React.useState(true);
  const handleFadeOut = fadeOut;

  return (
    <Grid
    templateAreas={`"hero hero hero"
                    "feature feature additional"
                    "footer footer footer"`}
    gridTemplateRows={'auto 1fr 1fr'}
    gridTemplateColumns={'1fr 50vw auto'}
    h='100%'
    w='100vw'
    gap='1'
    color='black' // Adjusted to use the color from the theme
    fontWeight='bold'
  >
    {/* HERO SECTION */}
    <GridItem area={'hero'} as="section" className="introduction">
      <Box bg="silver" p={10} textAlign="center"> {/* Using color from the theme */}
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
    </GridItem>


      {/* FEATURE SECTOIN */}
      <GridItem area={'feature'} as="section" className="dashboard-feature">

      </GridItem>

      {/* ADDITIONAL SECTION */}
      <GridItem area={'additional'} as="section" className="additional-info">

      </GridItem>

      {/* FOOTER SECTION */}
      <GridItem area={'footer'} as="section" className="cta">

      </GridItem>
    </Grid>
  )
}

export default Home;

