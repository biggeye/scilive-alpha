'use client'
import React, { useEffect, useState } from 'react';
import { Text, Card, Box, Link } from '@chakra-ui/react';
import { DataTable, ColumnDef, Web3Address } from '@saas-ui/react'; // Adjust if ColumnDef import is incorrect
import { parseGalleryImages } from '@/lib/gallery/getGalleryItems';
import { GalleryImage } from '@/types';

const ContentTables = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const chunkedData = await parseGalleryImages();
      const flattenedData = chunkedData.flat();
      setGalleryImages(flattenedData);
    };

    fetchGalleryImages();
  }, []);

 const columns: ColumnDef<GalleryImage>[] = [
    {
      header: 'Content ID', 
      accessorKey: 'content_id', 
      cell: ({ row }) =>
        <Link href={row.original.url} isExternal>
          <Web3Address startLength={6} endLength={3} address={row.original.content_id} />
        </Link>,
    },
    {
      header: 'Prompt',
      accessorKey: 'prompt',
      cell: ({ row }) =>
        <Box maxWidth="60%">
          <Text isTruncated>
            {row.original.prompt}
          </Text>
        </Box>
    },
  ];

  return (
    <Box as="section" p="4" borderWidth="1px" borderRadius="lg" overflow="hidden" margin={5}>
      <Card p={5}>
        <DataTable
          columns={columns}
          data={galleryImages}
          isSortable
          onSelectedRowsChange={(selected) => console.log(selected)}
          size={{ base: "xs", md: "sm", lg: "md" }}
        />
      </Card>
    </Box>
  );
};
export default ContentTables;
