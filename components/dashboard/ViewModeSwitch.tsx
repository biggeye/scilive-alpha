'use client'
import React from 'react';
import { Switch, Text, Flex } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { viewModeState } from '@/state/user/user_state-atoms';

const ViewModeSwitch = () => {
    const [viewMode, setViewMode] = useRecoilState(viewModeState);

    // Corrected toggle logic
    const toggleViewMode = () => {
        const nextViewMode = viewMode === 'tabs' ? 'grid' : 'tabs';
        setViewMode(nextViewMode);
        console.log("Toggling viewMode to:", nextViewMode); // Additional logging for debugging
    };

    return (
            <Flex align="center">
                <Switch size="sm" onChange={toggleViewMode} isChecked={viewMode === 'grid'} />
                <Text color="white" fontSize="sm" ml={2}>{viewMode === 'tabs' ? 'Tabs' : 'Grid'}</Text>
            </Flex>
        );
}

export default ViewModeSwitch;
