'use client'
import React from 'react';
import ImageEditor from '@/components/dashboard/ImageEditor/ImageEditor';
import DisplayResults from '@/components/dashboard/DisplayResults';
import { Grid, GridItem } from '@chakra-ui/react';
import { useEffect } from 'react'; // Make sure 'react' is lowercase
import { currentPageState } from '@/state/user/user_state-atoms';
import { useRecoilState } from 'recoil';

const EditImages = () => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    useEffect(() => {
        setCurrentPage("editImage");
    }, []); // Empty dependency array to run only on mount

    return (
        <Grid templateAreas={`"results"
                              "form"`}
              gridTemplateRows="2">
            <GridItem>
                <DisplayResults localPage="editImage" />
            </GridItem>
  
            <GridItem position="fixed" bottom="0">
                <ImageEditor />
            </GridItem>
        </Grid>
    );
}

export default EditImages;
