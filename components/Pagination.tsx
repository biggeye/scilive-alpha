import { Center, Box, Button, Flex, IconButton, Spacer } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
    totalGroups: number;
    currentGroup: number;
    setCurrentGroup: (group: number) => void;
  }
  
// Pagination Component
export const Pagination: React.FC<PaginationProps> = ({
    totalGroups,
    currentGroup,
    setCurrentGroup,
  }) => {
  const maxGroupButtons = 5; // Adjust based on your UI space

  const renderGroupButtons = () => {
    let buttons = [];
    let start = Math.max(currentGroup - 2, 0);
    let end = Math.min(start + maxGroupButtons, totalGroups);

    // Adjust start if we're at the last few items
    if (totalGroups - currentGroup <= 2) {
      start = Math.max(totalGroups - maxGroupButtons, 0);
      end = totalGroups;
    }

    // Generate buttons for groups
    for (let i = start; i < end; i++) {
      buttons.push(
        <Button 
        size={{ base: "sm", md: "md" }}
        key={i} onClick={() => setCurrentGroup(i)} colorScheme={i === currentGroup ? "blue" : "gray"}>
          {i + 1}
        </Button>
      );
    }

    // Add ellipsis and last group if needed
    if (end < totalGroups) {
      buttons.push(<Box key="ellipsis" mx="2">...</Box>);
      buttons.push(
        <Button key={totalGroups - 1} onClick={() => setCurrentGroup(totalGroups - 1)}>
          {totalGroups}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <Flex justifyContent="space-between" width="100%" direction="row" alignItems="center">
      <IconButton
      size={{ base: "sm", md: "md" }}
        aria-label="Previous group"
        icon={<ChevronLeftIcon />}
        onClick={() => setCurrentGroup(Math.max(currentGroup - 1, 0))}
        isDisabled={currentGroup === 0}
        mr="2"
      />
      <Spacer />
      {renderGroupButtons()}
       <Spacer />
      <IconButton
        size={{ base: "sm", md: "md" }}
        aria-label="Next group"
        icon={<ChevronRightIcon />}
        onClick={() => setCurrentGroup(Math.min(currentGroup + 1, totalGroups - 1))}
        isDisabled={currentGroup === totalGroups - 1}
        ml="2"
      />
    </Flex>
  );
};