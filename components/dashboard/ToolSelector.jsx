
'use client'

import { useState } from 'react';

const ToolSelector = ({ onToolChange }) => {
  const [selectedTool, setSelectedTool] = useState('imageCreation');

  const handleToolChange = (e) => {
    setSelectedTool(e.target.value);
    onToolChange(e.target.value);
  };

  return (
    <select onChange={handleToolChange} value={selectedTool}>
      <option value="imageCreation">Image Creation</option>
      <option value="imageEditing">Image Editing</option>
      <option value="deployments">Deployments</option>
      <option value="articleCreation">Article Creation</option>
    </select>
  );
};

export default ToolSelector;