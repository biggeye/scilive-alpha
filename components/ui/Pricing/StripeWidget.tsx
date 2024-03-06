import React, { useEffect } from 'react';

const StripeWidget = () => {
  useEffect(() => {
    // Dynamically load the Stripe script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <stripe-pricing-table
      pricing-table-id="prctbl_1OpzT1AmOI0sMNRG6yAq23IR"
      publishable-key="pk_test_51OQLxJAmOI0sMNRGKBubMCmBIWLNVZAdSuToiWDYh7f5oaQUhuwJiEBiPHmzabrWkITBZmQm3vehPC56QxkAQ75l00QU78l23A">
    </stripe-pricing-table>
  );
};

export default StripeWidget;
