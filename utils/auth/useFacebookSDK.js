// This is a client-side hook, ensure it is used under client-side conditions
"use client";

import { useEffect } from 'react';

export function useFacebookSDK  (appId, version)  {
  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== 'undefined') {
      window.fbAsyncInit = function() {
        FB.init({
          appId,
          cookie: true,
          xfbml: true,
          version,
        });

        FB.AppEvents.logPageView();
      };

      // Dynamically load the Facebook SDK script
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }, [appId, version]); // Re-run this effect if appId or version changes
};
