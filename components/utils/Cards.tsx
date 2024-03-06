import React, { FC, Suspense } from 'react';
import { Card, Text, Image, CircularProgress } from "@chakra-ui/react";
import { GalleryImageCardProps, ImageCardProps } from '@/types';


export const GalleryImageCard: FC<GalleryImageCardProps> = ({ imageUrl, prompt, modelName, width, onEdit, onDelete, onSetProfile, onClick }) => (
  <Suspense
    fallback={<CircularProgress isIndeterminate size="15px" thickness="5px" />}
  >
    <Card
      className="image-card"
      borderColor="onyx"
      borderWidth="0.5px"
      maxW={width}
    >
      <Image
        margin="5px"
        width="auto"
        height="auto"
        src={imageUrl}
        alt="Generated Content"
        borderRadius=".5rem"
      />
      {prompt && (
        <Text fontSize={{ base: "xs", md: "sm" }}>
          <b>Prompt:</b> {prompt}
        </Text>
      )}
      {modelName && (
        <Text fontSize={{ base: "xs", md: "sm" }}>
          <b>Model:</b> {modelName}
        </Text>
      )}
    </Card>
  </Suspense>
);

export const ImageCard: FC<ImageCardProps> = ({ imageUrl, prompt, modelName }) => (
  <Suspense
    fallback={<CircularProgress isIndeterminate size="15px" thickness="5px" />}
  >
  <Card className="image-card" borderColor="onyx" borderWidth="0.5px"
  maxW="80vw">
   <Image
      margin="5px"
      width={{ base: "50vh", md: "60vh" }}
      maxWidth="70vw"
      height="auto"
      src={imageUrl}
      alt="Generated Content"
      borderRadius=".5rem"
    />
    {prompt && (
      <Text fontSize={{ base: "xs", md: "sm" }}>
        <b>Prompt:</b> {prompt}
      </Text>
    )}
    {modelName && (
      <Text fontSize={{ base: "xs", md: "sm" }}>
        <b>Model:</b> {modelName}
      </Text>
    )}

  </Card>
  </Suspense>
);