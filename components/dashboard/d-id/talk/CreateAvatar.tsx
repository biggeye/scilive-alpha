// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Heading, Card, Box, Button, FormControl, FormLabel, Textarea, useToast, VStack, Image, Grid, GridItem, CircularProgress, Checkbox } from '@chakra-ui/react';
import { avatarNameState, avatarDescriptionState, avatarUrlState } from '@/state/createTalk-atoms';
import { useUserContext } from '@/lib/user/UserProvider';
import { imageArrayState } from '@/state/createTalk-atoms';
import AvatarCreator from '../../AvatarCreator';

interface CreateAvatarProps {
  onCompleted: () => void;
}

const CreateAvatar: React.FC<CreateAvatarProps> = ({ onCompleted }) => {

  const toast = useToast();
  const { userProfile } = useUserContext();
  const userId = userProfile.id;

  return (
   <AvatarCreator />
  );
};

export default CreateAvatar;
