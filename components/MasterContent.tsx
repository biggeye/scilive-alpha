import React, { useState, useEffect } from 'react';
import {
  Box,
  Link,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text
} from '@chakra-ui/react';
import { createClient } from '@/utils/supabase/client';
import Modal from './utils/Modal';

interface ContentData {
  [key: string]: any; // This allows dynamic access but sacrifices some type safety
  content_id: string;
  url: string;
  name?: string;
  created_by: string;
  created_at: Date;
  model_id?: string;
  prediction_id?: string;
  prompt?: string;
  // Add other fields as necessary
}

const MasterContentDisplay = () => {
  const [contentData, setContentData] = useState([]);
  const supabase = createClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUrl, setSelectedUrl] = useState('');

  const fetchContent = async (query: string, condition1: string, condition2: string) => {
    const { data, error } = await supabase.from('master_content')
      .select('content_id, url, created_by, created_at, model_id, prediction_id, prompt')
      .is('name', null)
      .is('url', !null)
    if (error) {
      console.error(error);
      return [];
    }
    const images = await data;
    setContentData(images)



    const renderTable = (data: ContentData[], headers: string[]) => {

      return (
        <Table variant="simple" mb="8">
          <Thead>
            <Tr>
              {headers.map(header => <Th key={header}>{header}</Th>)}
            </Tr>
          </Thead>
          <Tbody>
            {data.map(content => (
              <Tr key={content.content_id}>
                {headers.map(header => (
                  <Td key={`${content.content_id}-${header}`}>
                    {header === 'URL' ? (
                      <Link color="teal.500" href="#" onClick={() => handleOpenModal(content.url)}>
                        Open Link
                      </Link>
                    ) : content[header.toLowerCase()]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )
    }
  
    return (
      <Box>
        <Text fontSize="xl" mb="4">Image Data</Text>
        {renderTable(contentData, ['Name', 'URL', 'Created At'])}

      </Box>
    );
  }
}
  export default MasterContentDisplay;