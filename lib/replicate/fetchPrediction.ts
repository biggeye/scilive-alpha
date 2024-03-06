// fetchPrediction.ts
export const fetchPrediction = async (requestBody: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/replicate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else if (
      response.headers.get("Content-Type")?.includes("application/json")
    ) {
      const predictionResponse: { id?: string; detail?: string } = await response.json();
      if (predictionResponse.id) {
        return predictionResponse.id;
      } else {
        throw new Error(predictionResponse.detail || "Unknown error");
      }
    } else {
      throw new Error("Response not JSON");
    }
  }
  