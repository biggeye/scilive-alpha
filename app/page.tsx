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
    <Button mt={4} colorScheme="teal" size="lg">Discover More</Button>
  </Box>
      </GridItem>
<Box w="100%" bgColor="silver" borderColor="seasalt" borderWidth=".5px">
      <GridItem area={'feature'} as="section" className="dashboard-feature">
        <Text><Link href="/dashboard">sciGenerate</Link></Text>
      </GridItem>
</Box>
      <GridItem area={'additional'} as="section" className="additional-info">
        <Text>About SciLive</Text>
        <Text as="p">Discover how SciLive is revolutionizing content creation...</Text>
      </GridItem>

      <GridItem area={'footer'} as="section" className="cta">
<Box w="90vw" bgColor="onyx" borderColor="orange" borderWidth=".5px">
        <Link href="/login"><a>Join SciLive Today</a></Link>
</Box>
      </GridItem>



    </Grid>
  )
}

export default Home;

