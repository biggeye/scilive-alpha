interface FetchQuoteProps {
    setIsLoadingQuotes: (isLoading: boolean) => void;
    setQuotes: (quotes: string[]) => void;
}

export const fetchQuotes = async ({ setIsLoadingQuotes, setQuotes }: FetchQuoteProps) => {
    setIsLoadingQuotes(true);
    try {
      // Replace this with the actual call to Vercel AI SDK
      const response = await fetch('API_ENDPOINT', {
        // API request configuration
      });
      const data = await response.json();
      setQuotes(data.quotes); // Assuming the response has a `quotes` field
    } catch (error) {
      console.error("Error fetching quotes", error);
    } finally {
      setIsLoadingQuotes(false);
    }
  };
  