'use client'
import React from 'react';
import {
    Box,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Flex,
    Stack,
    Link,
    Text,
    Spacer,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody
} from '@chakra-ui/react';
import { NavbarItem, NavbarLink } from '@saas-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '@/components/Logo';
import { useUserContext } from "@/lib/user/UserProvider";
import { useRouter } from 'next/navigation'; // Corrected from 'next/navigation' to 'next/router'
import SignOut from './Auth/SignOut';

const NewNavbar = () => {
    const router = useRouter();
    const { supabase } = useUserContext();
    const { userProfile } = useUserContext();
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

    const userName = userProfile.full_name;
    const userId = userProfile?.id; // Ensure userProfile is accessed safely

    const UserMenu = () => {

        return (
            <Popover placement="bottom-end">
                <PopoverTrigger>
                    <IconButton
                        icon={<Image src={userProfile?.avatar_url || "https://scilive.cloud/avatar-icon.svg"} borderRadius="full" boxSize="40px" />}
                        aria-label="User menu"
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>{userName}</PopoverHeader>
                    <PopoverBody>
                        {userId ? (
                            <Stack>
                                <Link href="/gallery">Gallery</Link>
                                <Link href="/account">Account</Link>
                                <SignOut />
                            </Stack>
                        ) : (
                            <Link href="/auth/signup">Login / Signup</Link>
                        )}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        );
    };

    return (
        <Box>
            {/* Mobile menu button */}
            <IconButton
                display={{ base: "inline-flex", md: "none" }} // Only show on mobile
                icon={<HamburgerIcon />}
                onClick={onDrawerOpen}
                aria-label="Open Menu"
            />
            <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader><Logo /></DrawerHeader>
                    <DrawerBody>
                        <Stack as="nav" spacing={4}>
                            
                                <Link href="/">Home</Link>
                          
                                <Link href="/dashboard">Image</Link>
                          
                                <Link href="/dashboard/d-id">Video</Link>
                     
                                <Link href="/dashboard/avatar">Avatar</Link>
                        
                            {/* Add more links as needed */}
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                         {userId ? (
                            <Stack>
                                <Link href="/gallery">Gallery</Link>
                                <Link href="/account">Account</Link>
                                <SignOut />
                            </Stack>
                        ) : (
                            <Link href="/auth/signup">Login / Signup</Link>
                        )}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* Desktop Navbar */}
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding="1.5rem"
                display={{ base: "none", md: "flex" }}
            >
                <Logo />
                <Spacer />
                <Stack direction="row" spacing={4} align="center">
                    <Link href="/">Home</Link>
                    <Link href="/dashboard">Image</Link>
                    <Link href="/dashboard/d-id">Video</Link>
                    <Link href="/dashboard/avatar">Avatar</Link>


                </Stack>
                <Spacer />
                <UserMenu />
            </Flex>
        </Box>
    );
};

export default NewNavbar;
