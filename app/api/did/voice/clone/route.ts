export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    const name = form.get('name');
    
    // Create a new instance of FormData for forwarding the request
    const formData = new FormData();

    // Check if 'file' and 'name' are not null and are of expected types
    if (file instanceof Blob && typeof name === 'string') {
      formData.append('file', file);
      formData.append('name', name);
      
      const response = await fetch('https://jsonblob.com/api/239ca594-47d7-11e9-b3cd-7be194ed8dd9', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          // 'Content-Type' is not set manually because it's automatically determined by the FormData instance
          authorization: `Basic ${process.env.NEXT_PUBLIC_DID_API_KEY}`,
        },
        body: formData,
      });

      // Handle the response from the D-ID API
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      return new Response(JSON.stringify(responseData), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      // Handle the case where 'file' or 'name' is null or not of the expected type
      throw new Error("'file' must be a Blob and 'name' must be a string.");
    }
  } catch (error) {
    console.error("Failed to fetch from D-ID API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
