import React from 'react';
import { Avatar, AvatarBadge } from '@chakra-ui/react'
import {
  PersonaContainer,
  PersonaDetails,
  PersonaLabel,
  PersonaSecondaryLabel,
} from '@saas-ui/react'
import { useUserContext } from '@/lib/user/UserProvider';

const CustomPersona = () => {

  const { userProfile } = useUserContext();
  const userName = userProfile.full_name;

  return (
    <PersonaContainer size="lg">
      <Avatar>
        <AvatarBadge boxSize="1em" border="0" bg="presence.away">
        </AvatarBadge>
      </Avatar>
      <PersonaDetails>
        <PersonaLabel>{userName}</PersonaLabel>
        <PersonaSecondaryLabel>Account Status</PersonaSecondaryLabel>
      </PersonaDetails>
    </PersonaContainer>
  )
}

export default CustomPersona;
