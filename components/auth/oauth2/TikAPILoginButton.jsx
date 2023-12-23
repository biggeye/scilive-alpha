'use client'

export default async function TikAPILoginButton() {

  useEffect(() => {
    const fetchContent = async () => {
        try {
            await TikAPI.popup({
                client_id: "c_BCLMWJVHOJ",
                scope: ["VIEW_PROFILE", "USER_MESSAGES"],
            });
        } catch (error) {
            console.error('Error during TikAPI popup:', error);
        }
    };

    fetchContent();
}, []); 


  return <button onClick={fetchContent}>TikTok</button>;
};

