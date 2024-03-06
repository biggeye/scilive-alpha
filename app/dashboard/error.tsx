// app/error/page.tsx
"use client";
import React from 'react';
import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push('/dashboard'); // Adjust the path as needed for your dashboard
  };

  return (
    <Center height="100vh">
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={4}
      >
        <Text fontSize="xl" mb={4}>
          An error has occurred
        </Text>
        <Text mb={6}>
          We're sorry for the inconvenience. Please try again or return to the dashboard.
        </Text>
        <Button
              onClick={handleBackToDashboard}
        >
          Back to Dashboard
        </Button>
      </Flex>
    </Center>
  );
};

export default ErrorPage;
