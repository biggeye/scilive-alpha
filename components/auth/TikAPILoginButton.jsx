"use server";

export default async function TikAPILoginButton() {
  const handleTikAPILogin = await TikAPI.popup({
      client_id: "c_BCLMWJVHOJ",
      scope: ["VIEW_PROFILE", "USER_MESSAGES"],
    });

    return <button onClick={handleTikAPILogin}>Sign In With TikTok</button>;
  };

