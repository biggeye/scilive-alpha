// CustomContextMenuList.tsx
import React from 'react';
import { ContextMenuList, ContextMenuItem } from '@saas-ui/react';

interface CustomContextMenuListProps {
    edit: () => void; // Adjust the type signature to match the implementation
  }

const CustomContextMenuList: React.FC<CustomContextMenuListProps> = ({ edit }) => {
  return (
    <ContextMenuList>
      <ContextMenuItem onClick={edit}>Edit</ContextMenuItem>
      <ContextMenuItem>Delete</ContextMenuItem>
    </ContextMenuList>
  );
};

export default CustomContextMenuList;
