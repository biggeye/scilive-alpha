import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import FormData from 'form-data';

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON payload
    const json = await request.json(); 
    const { voiceDataUri, name } = json;

    // Prepare the FormData
    const form = new FormData();
    // Append 'file' as a string, since the API expects the file content directly
    // The data URI is sent as a string here, similar to the API reference example
    form.append('file', voiceDataUri);
    form.append('name', name);


    
    
  
    const response = await fetch('https://api.d-id.com/tts/voices', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wcm9kdWN0X2lkIjoicHJvZF9PTlNVUW5VcWZ3MUpPQSIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2N1c3RvbWVyX2lkIjoiY3VzX09FNUhIRUs5amRlS21iIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9uYW1lIjoibGF1bmNoIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfc3Vic2NyaXB0aW9uX2lkIjoic3ViXzFOUmQ2bUp4RUtaMnpBeW5SejBqaVlLYiIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2JpbGxpbmdfaW50ZXJ2YWwiOiJtb250aCIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3BsYW5fZ3JvdXAiOiJkZWlkLWFwaS1sYXVuY2giLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wcmljZV9pZCI6InByaWNlXzFOZXZOYUp4RUtaMnpBeW5JeFQ0SVlXciIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3ByaWNlX2NyZWRpdHMiOiIyMDAiLCJodHRwczovL2QtaWQuY29tL2NoYXRfc3RyaXBlX3N1YnNjcmlwdGlvbl9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vY2hhdF9zdHJpcGVfcHJpY2VfY3JlZGl0cyI6IiIsImh0dHBzOi8vZC1pZC5jb20vY2hhdF9zdHJpcGVfcHJpY2VfaWQiOiIiLCJodHRwczovL2QtaWQuY29tL3Byb3ZpZGVyIjoiYXV0aDAiLCJodHRwczovL2QtaWQuY29tL2lzX25ldyI6ZmFsc2UsImh0dHBzOi8vZC1pZC5jb20vYXBpX2tleV9tb2RpZmllZF9hdCI6IjIwMjQtMDEtMjdUMjA6MzE6MjIuMzA4WiIsImh0dHBzOi8vZC1pZC5jb20vb3JnX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9hcHBzX3Zpc2l0ZWQiOlsiU3R1ZGlvIiwiU3R1ZGlvIE1vYmlsZSBBcHAiXSwiaHR0cHM6Ly9kLWlkLmNvbS9jeF9sb2dpY19pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vY3JlYXRpb25fdGltZXN0YW1wIjoiMjAyMy0wNC0wMVQyMjo1NjowMi44MDhaIiwiaHR0cHM6Ly9kLWlkLmNvbS9hcGlfZ2F0ZXdheV9rZXlfaWQiOiIyMDF2enNiN3A1IiwiaHR0cHM6Ly9kLWlkLmNvbS91c2FnZV9pZGVudGlmaWVyX2tleSI6InVzZ19xMVZIb3p6X0l6TWxlVHRkZzFMNEMiLCJodHRwczovL2QtaWQuY29tL2hhc2hfa2V5IjoicWZyRlhZMTkyUWI3cjdfWTJnbHZ4IiwiaHR0cHM6Ly9kLWlkLmNvbS9wcmltYXJ5IjoiY3VzX09FNUhIRUs5amRlS21iIiwiaHR0cHM6Ly9kLWlkLmNvbS9lbWFpbCI6Im93ZW5Ac2NpZmljdGlvbi5jb20iLCJpc3MiOiJodHRwczovL2F1dGguZC1pZC5jb20vIiwic3ViIjoiYXV0aDB8NjQyOGI2ODIxZTYwMDZiNjU3ZWFlM2Y5IiwiYXVkIjpbImh0dHBzOi8vZC1pZC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vZC1pZC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA4NDEyNTc0LCJleHAiOjE3MDg0OTg5NzQsImF6cCI6Ikd6ck5JMU9yZTlGTTNFZURSZjNtM3ozVFN3MEpsUllxIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCByZWFkOmN1cnJlbnRfdXNlciB1cGRhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIG9mZmxpbmVfYWNjZXNzIn0.egRn_NVeA6MeOQgholSYigHU9pd4D2HjCGxdjJuC1tgP0qW70QHJfjwx9bOr-9pYwauyTllgkKbkjA7hGRY3WkAKENg9Cw2Mofk6aoV4chlCRYNTXHipTYA6R7d95SrhbtjB9aSFBPTiQFJ5w3go7W_TPjjzTYejGlijztY07sbT92-Re_FINuku93BTLdHQsSCni8SeDjxXAUqP6TBMrhbDW1_XykdEwi5UVYVj3V5IXBatE4WhrZRG-p0jQNCqYYSlWosQText7FF2_6Yh4lTiblCA6dlsMPLF1DvwIaG4aR0GBrg8P1AMgkHS0QWpwNcsZ9tSsJ7N73e-OjEpFg'
      },
      body: 
        form
      
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Parsing the JSON response from the D-ID API
    const responseData = await response.json();
    return new NextResponse(JSON.stringify(responseData), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Failed to fetch from D-ID API:", error);
    return new NextResponse(JSON.stringify({ error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
