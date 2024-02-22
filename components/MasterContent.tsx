"use client";

import React, { useState, useEffect } from 'react';
import { Box, Link, Button, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { createClient } from '@/utils/supabase/client';
import Modal from './utils/Modal'; // Ensure this path is correct

interface ContentData {
  content_id: string;
  url: string;
  name?: string;
  created_by: string;
  created_at: Date;
  model_id?: string;
  prediction_id?: string;
  prompt?: string;
}

const MasterContentDisplay: React.FC = () => {
  const [contentData, setContentData] = useState<ContentData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ContentData | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('master_content')
        .select('content_id, url, created_by, created_at, model_id, prediction_id, prompt')
        .is('name', null)
        .is('url', !null);

      if (error) {
        console.error(error);
        return;
      }

      setContentData(data || []);
    };

    fetchContent();
  }, []);

  const handleOpenModal = (item: ContentData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const renderTable = (data: ContentData[]) => (
    <Table variant="simple" mb="8">
      <Thead>
        <Tr>
          {['Name', 'URL', 'Created At'].map((header) => (
            <Th key={header}>{header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((content) => (
          <Tr key={content.content_id}>
            <Td>{content.name}</Td>
            <Td>
              <Link color="teal.500" href="#" onClick={() => handleOpenModal(content)}>
                Open Link
              </Link>
            </Td>
            <Td>{content.created_at.toString()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  return (
    <Box>
      <Text fontSize="xl" mb="4">Image Data</Text>
      {renderTable(contentData)}
      {isModalOpen && selectedItem && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} item={selectedItem} handleDelete={selectedItem}/>
      )}
    </Box>
  );
};

export default MasterContentDisplay;
