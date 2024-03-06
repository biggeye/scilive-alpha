'use client'
import React from 'react';
import { Image, Text, Center, Grid, GridItem, Box, Heading, Button, useTheme } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import Pricing from "@/components/ui/Pricing";

const PricingPage = () => {

    return (
        <Box
            position="relative"
            h="92vh"
            textAlign="center"
            sx={{
                background: 'linear-gradient(to bottom, rgba(209,212,212,0.65) 0%,rgba(0,0,0,0) 100%)'
            }}
        >
            <Pricing />

        </Box>
    )
}

export default PricingPage;