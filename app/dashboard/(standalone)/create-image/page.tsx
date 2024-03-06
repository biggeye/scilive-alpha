
'use client'
import React from 'react';
import ImageCreator from '@/components/dashboard/ImageCreator';
import DisplayResults from '@/components/dashboard/DisplayResults';
import { CircularProgress, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { Suspense, useEffect } from 'react';
import { currentPageState } from '@/state/user/user_state-atoms';
import { useRecoilState } from 'recoil';

const CreateImages = () => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    useEffect(() => {
        setCurrentPage("createImage");
    }, []);
    return (
        <Suspense fallback={
            <Skeleton height="400px"
                width="400px"
                className="element-pulse" />}>
            <Grid templateAreas={`"results"
        "form"`}
                gridTemplateRows="2">
                <GridItem>
                    {/* Add Suspense with a fallback */}
                    <DisplayResults localPage="createImage" />
                </GridItem>
                <GridItem position="fixed" bottom="0">
                    <ImageCreator />
                </GridItem>
            </Grid>
        </Suspense>
    )
}

export default CreateImages;