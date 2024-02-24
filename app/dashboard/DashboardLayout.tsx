// Corrected /app/dashboard/DashboardLayout.tsx
'use client'
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { createClient } from "@/utils/supabase/client";
import { useRecoilState } from "recoil";
import { finalPredictionState } from "@/state/replicate/prediction-atoms";

interface DashboardLayoutProps {
  children: any
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const toast = useToast();
  const supabase = createClient();
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);

  useEffect(() => {
    // Assuming this setup is corrected according to Supabase real-time subscription setup
    const subscription = supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'master_content' },
        (payload) => {
          toast({
            title: 'Image received! (click to view)',
            status: 'info',
            duration: 5000,
            isClosable: true,
          });

          // Corrected access to payload data
          const output = payload.new.url; // Assuming this is the correct path to the data
          setFinalPrediction(output); // Update state here
        })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [router, toast]);

  return <>{children}</>; // Corrected return statement
};

export default DashboardLayout;
