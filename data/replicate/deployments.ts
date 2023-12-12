// Define a TypeScript interface for the objects in the array
interface Deployment {
  modelName: string;
  type: string;
  inputExample?: string;
  outputExample?: string;
  input?: object;  
    img?: string;
    prompt?: string;
}

// Define the array with the specified type
const deployments: Deployment[] = [
  {
    modelName: "mplug-owl",
    type: "img2txt",
    inputExample: "https://replicate.delivery/pbxt/Io5RPgJuXv0NrYiefJ6mW7jadKLxebgsaZo0iyGJngHR93cv/fishfeet.webp",
    outputExample: "Exquisite and eye-catching, the pair of fish-themed sandals is sure to turn heads. Perfect for beach days or casual outings, these unique sandals feature a pair of large fish painted in green and yellow, adding a whimsical touch to any outfit.  With their innovative design, these sandals are unlike any other, promising to stand out in a crowd and make a statement. Boasting impeccable craftsmanship and attention to detail, these sandals are a must-have for those who value individuality and want to make a statement while on their feet.  So, for all those who seek unique, high-quality sandals, look no further. Be the envy of your friends and family with these exotic fish-themed sandals, which are sure to turn heads and make a lasting impression.",
    input: {
      img: "https://replicate.delivery/pbxt/Io5RPgJuXv0NrYiefJ6mW7jadKLxebgsaZo0iyGJngHR93cv/fishfeet.webp",
      prompt: "I designed these sandals. Can you help me write an advertisement?",
    }
  },
  {
    modelName: "tortoise-tts",
    type: "txt2audio",
    inputExample: "",
    outputExample: "https://replicate.delivery/mgxm/f6253eec-53f6-4ca0-8715-8ad16abdb794/tortoise.mp3",
    input: {
      text: "string",
      custom_voice: "mp3Url"
    }
},
  {
    modelName: "upscale-res",
    type: "img2img",
    inputExample: "",
    outputExample: "https://replicate.delivery/pbxt/Ing7Fa4YMk6YtcoG1YZnaK3UwbgDB5guRc5M2dEjV6ODNLMl/cat.jpg",
    input: {
      image: "imgUrl"
    }
  },
  {
    modelName: "video-llava",
    type: "video2txt",
    inputExample: "https://replicate.delivery/pbxt/JvUeO366GYGoMEHxfSwn39LYgScZh6hKNj2EuJ17SXO6aGER/archery.mp4",
    outputExample: "These two are practicing archery on a field. They are holding bows and arrows and shooting at targets.",
    input: {
      video_path: "mp4Url",
      text_prompt: "string"
    }
  },
  {
    modelName: "yi-34b-chat",
    type: "txt2txt",
    inputExample: "https://replicate.delivery/pbxt/Io5RPgJuXv0NrYiefJ6mW7jadKLxebgsaZo0iyGJngHR93cv/fishfeet.webp",
    outputExample: "..."
  }
];

export default deployments;