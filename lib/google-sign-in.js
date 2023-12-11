// This function will be globally accessible
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Pass the response to a global function defined in your React component
    window.handleSignInWithGoogle(response);
}
