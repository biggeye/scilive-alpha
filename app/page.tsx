'use client'
import { useUserContext } from "@/lib/UserProvider";
import { Text, Center, Grid, GridItem } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

function Home() {

  return (
    <Grid
      templateAreas={`"header header"
                      "feature additional"
                      "footer footer"`}
      gridTemplateRows={'20vh 1fr 1fr'}
      gridTemplateColumns={'1fc 70vw'}
      h='100%'
      w='100vw'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >

      <GridItem area={'header'} as="section" className="introduction">
        <Text>Welcome to SciLive</Text>
        <Text as="p">Explore the world of AI-powered content creation and streaming.</Text>
        <Link href="/about">Learn More</Link>
      </GridItem>

      <GridItem area={'feature'} as="section" className="dashboard-feature">
        <Text><Link href="/dashboard">sciGenerate</Link></Text>
      </GridItem>

      <GridItem area={'additional'} as="section" className="additional-info">
        <Text>About SciLive</Text>
        <Text as="p">Discover how SciLive is revolutionizing content creation...</Text>
      </GridItem>

      <GridItem area={'footer'} as="section" className="cta">
        <Link href="/loginp"><a>Join SciLive Today</a></Link>
      </GridItem>



    </Grid>
  )
}

export default Home;

