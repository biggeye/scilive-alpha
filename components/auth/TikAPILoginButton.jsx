"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default function TikAPILoginButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const handleTikAPILogin = async () => {
    await TikAPI.popup({
      client_id: "c_BCLMWJVHOJ",
      scope: ["VIEW_PROFILE", "USER_MESSAGES"],
    });

    return <button onClick={TikAPILoginButton}>Sign In With TikTok</button>;
  };
}
