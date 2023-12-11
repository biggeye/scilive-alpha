'use client'
import { useEffect
 } from "react";

const GoogleLoginButton = () => {
    useEffect(() => {
    window.handleSignInWithGoogle = async (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        // Implement the sign-in logic here or call a function to handle it
    };

    // Load the Google sign-in script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID,
            callback: handleSignInWithGoogle,
        });
        window.google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size: 'large' }
        );
        window.google.accounts.id.prompt(); // Display the One Tap dialog
    };
    document.body.appendChild(script);

}, []);


    return(
        <>
        <div
        id="g_id_onload"
        data-client_id="247295820482-jqoui5no5kfepbqq27q0vrddfq03bjak.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_select="true"
        data-itp_support="true"
      ></div>

      <div
        class="g_id_signin"
        data-type="icon"
        data-shape="square"
        data-theme="filled_blue"
        data-text="signin_with"
        data-size="medium"
      ></div>
      
      </>
    )
}
export default GoogleLoginButton;