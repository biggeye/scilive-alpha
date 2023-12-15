// types.ts

// Define the structure for the Input object
interface Input {
    image: string;
    prompt?: string;
  }
  // Define a TypeScript interface for the objects in the array
export interface Deployment {
  modelName: string;
  type: string;
  inputExample?: string;
  outputExample?: string;
  input: object;
    prompt?: string;
    text?: string;
    text_prompt?: string;
    custom_voice?: File;
    img?: File;
    video_path?: File;


}

  // Define the structure for each item in the img2img array
  export interface Img2ImgItem {
    name: string;
    id: string;
    shortDesc: string;
    input: Input;
    outputIndex: string;
    friendlyName: string;
    example: string;
  }
  
  export interface Txt2ImgItem {
    name: string;
    id: string;
    shortDesc: string;
    friendlyName: string;
    example: string;
}


// /data/types.ts

export interface UserInFile {
  dataURI: string;
}

export interface FilePreview {
  previewURL: string;
}

export interface Prediction {
  // Add fields relevant to your prediction logic
}

export interface Results {
  // Define the structure for results
}

export interface ExampleImage {
  imageURL: string;
}

export interface NewPrediction {
  // Define structure for new predictions
}

export type ToolType = 'imageCreation' | 'voiceCreation' | string; // Add other tool types as needed

export interface SelectedModel {
  modelId: string;
  friendlyName: string;
  shortDesc: string;
  example: string;
}

export interface AllInputs {
  modelName: string;
  prompt: string;
  [key: string]: any; // For other dynamic keys
}
