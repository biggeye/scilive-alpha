// types.ts

// Define the structure for the Input object
interface Input {
    image: string;
    prompt?: string;
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

