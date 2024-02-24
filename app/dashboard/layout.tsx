'use client'
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { createClient } from "@/utils/supabase/client";
import { useRecoilState } from "recoil";
import { finalPredictionState } from "@/state/replicate/prediction-atoms";

export default async function DashboardLayout ({   
  children,
} : {
  children: React.ReactNode;
}) {
    
const router = useRouter();
const toast = useToast();
const supabase = createClient();
const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);

useEffect(() => {
  const subscription = supabase
    .channel('custom-insert-channel')
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'master_content' },
     async (payload) => {
      toast({
        title: 'Image received! (click to view)',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
     
      const output = await payload.new.url; // im trying to access the value** of the inserted row in column 'url'
      setFinalPrediction(output)  /* so that i can set value** to state here */

    })
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
}, [router, toast]);

return(
  [{children}]
)
};