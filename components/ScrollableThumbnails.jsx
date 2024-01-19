import React from "react";
import { Box, Image, HStack, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const ScrollableThumbnails = ({ images }) => {
  const scrollContainer = React.createRef();

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const { current } = scrollContainer;
      const scrollAmount = direction === "left" ? -200 : 200;
      current.scrollLeft += scrollAmount;
    }
  };

  return (
    <Box position="relative" w="100%" h="100px" overflow="hidden">
      <IconButton
        aria-label="Scroll left"
        icon={<ChevronLeftIcon />}
        position="absolute"
        left="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        onClick={() => scroll("left")}
      />
      <HStack
        ref={scrollContainer}
        overflowX="auto"
        spacing="20px"
        p="10px"
        w="100%"
        h="100%"
      >
        {images.map((image, index) => (
          <Box key={index} boxShadow="md" borderRadius="md" overflow="hidden">
            <Image src={image} alt={`Thumbnail ${index}`} />
          </Box>
        ))}
      </HStack>
      <IconButton
        aria-label="Scroll right"
        icon={<ChevronRightIcon />}
        position="absolute"
        right="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        onClick={() => scroll("right")}
      />
    </Box>
  );
};