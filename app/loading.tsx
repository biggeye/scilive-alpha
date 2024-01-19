import React from 'react';
import { Skeleton } from "@chakra-ui/react"; 
type LoadingPageProps = {
    isLoading: boolean; 
    width?: string; 
    height?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ isLoading, width = "100%", height = "20px" }) => {
    if (!isLoading) return null;
    return (
        <div className="flex justify-center items-center h-screen">
            <Skeleton className="w-full max-w-lg" style={{ width, height }} isLoaded={!isLoading} />
        </div>
    )
}

export default LoadingPage;
