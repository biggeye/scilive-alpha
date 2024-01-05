'use client';

import { Card, CardFooter } from "@chakra-ui/react";

const Home = () => {
  const apiResults = "API call results will be displayed here.";
  
  
  return (
    <Card>
    <CardFooter className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        Powered by{' '}
        <a href="https://www.scifiction.com" target="_blank" className="font-bold hover:underline" rel="noreferrer">
          <img src="/scifiction.png" alt="SciFiction" width="70px" />
        </a>
      </p>
    </CardFooter>
    </Card>
  )
}

export default Home;