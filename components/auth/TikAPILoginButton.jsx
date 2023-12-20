"use server";

const TikAPILoginButton = () => {
  
 
    const fetchContent = async () => {
      try {
        const TikLogIn = await TikAPI.popup({
          client_id: "c_BCLMWJVHOJ",
          scope: ["VIEW_PROFILE", "USER_MESSAGES"],
        });
        // Further logic if needed
      } catch (error) {
        console.error('Error with TikAPI:', error);
      }
    };



  return <button onClick={fetchContent}>Sign In With TikTok</button>;
};

export default TikAPILoginButton;
