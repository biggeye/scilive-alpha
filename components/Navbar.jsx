"use client";
import React, { useContext } from "react";
import {
  Box,
  Button,
  Link,
  Collapse,
  IconButton,
  Image,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  useDisclosure,
  Spacer,
  Flex,
  Text,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useUserContext } from "@/lib/UserProvider";

const fallbackImageUrl = "https://scilive.cloud/avatar-icon.svg";

const DropdownMenu = ({ items }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Menu isOpen={isOpen} onClose={onToggle}>
      <MenuButton
        as={IconButton}
        onClick={onToggle}
        boxSize="50px" // Adjust the size as needed for your navbar
        objectFit="cover" // Ensures the image covers the box area
        boxShadow="md"
        bgGradient="radial(white 5%, silver 50%)"
        marginLeft="7px"
      >
        <Image src="/sciLive.svg" width={40} />
      </MenuButton>
      <MenuList>
        {items.map((item) => (
          <MenuItem key={item.name} as={Link} href={item.href}>
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

const UserMenu = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { supabase } = useUserContext();
  const { userProfile } = useUserContext();
  const userId = userProfile.id;
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  const userImageUrl = userProfile.avatar_url || fallbackImageUrl;
  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        as={IconButton}
        onClick={onOpen}
        boxSize="50px" // Adjust the size as needed for your navbar
        objectFit="cover" // Ensures the image covers the box area
        boxShadow="md"
        bgGradient="radial(white 5%, silver 50%)"
        marginRight="7px"
        borderRadius="full"
      >
        <Image
          src={userImageUrl}
          onError={(e) => (e.target.src = fallbackImageUrl)}
          borderRadius="full"
          width="90%"
        />
      </MenuButton>
      <MenuList>
        {userId ? (
          <MenuItem onClick={signOut}>Sign-Out</MenuItem>
        ) : (
          <MenuItem as={Link} href="/auth/login">
            Login
          </MenuItem>
        )}
        <MenuItem as={Link} href="/account">
          Account
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const Navbar = () => {
  const navigation = [
    { name: "sciStill", href: "/dashboard" },
    { name: "sciVideo", href: "/dashboard/d-id" },
    { name: "sciLive", href: "/100ms" },
    { name: "sciGallery", href: "/gallery" },
  ];
  const { userProfile } = useUserContext();
  const avatar_url = userProfile.avatar_url;
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center" // Add this to align items vertically in the center
      as="nav"
      bgColor="silver"
      p={1}
      className="navbar"
      height="8vh"
    >
      <DropdownMenu items={navigation} />
      <Spacer />

      <UserMenu userImageUrl={avatar_url} />
    </Flex>
  );
};

export default Navbar;
