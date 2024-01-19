import { selectedModelIdState } from "@/state/config-atoms"
import { useRecoilValue } from "recoil"
import { createClient } from "@/utils/supabase/route";

export async function POST(req: Request) {

  const supabase = createClient(req);
  const selectedModelId = useRecoilValue(selectedModelIdState);

  const { data: modelsData, error } = await supabase
    .from('master_content')
    .select('url')
    .eq('model_id', selectedModelId);

  if (error) {
    throw new Error(error.message);
  }

  return modelsData;
}
