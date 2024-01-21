'use client'
import { useUserContext } from "@/lib/UserProvider";
import { Text, Center, Grid, GridItem, Box, Heading, Button } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

function Home() {

  return (
    <Grid
      templateAreas={`"hero hero hero"
                      "feature feature additional"
                      "footer footer footer"`}
      gridTemplateRows={'20vh 1fr 1fr'}
      gridTemplateColumns={'1fc 50vw auto'}
      h='100%'
      w='100vw'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >

      <GridItem area={'hero'} as="section" className="introduction">
      
  <Box bg="gray.100" p={10} textAlign="center">
    <Heading as="h1" mb={4}>Welcome to SciLive</Heading>
    <Text fontSize="xl">Explore the Future of AI and Live Streaming</Text>
 <Link href="/auth/login">
      <Button as="a" mt={4} colorScheme="orange" size="lg">Discover More</Button>
    </Link>
  </Box>
      </GridItem>
      <GridItem area={'feature'} as="section" className="dashboard-feature">
      </GridItem>

      <GridItem area={'additional'} as="section" className="additional-info">

      </GridItem>

      <GridItem area={'footer'} as="section" className="cta">

      </GridItem>



    </Grid>
  )
}

export default Home;

