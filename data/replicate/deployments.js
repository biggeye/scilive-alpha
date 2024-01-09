const deployments = [
  {
    modelName: "mplug-owl",
    type: "img2txt",
    inputExample: "https://replicate.delivery/pbxt/Io5RPgJuXv0NrYiefJ6mW7jadKLxebgsaZo0iyGJngHR93cv/fishfeet.webp",
    outputExample: "Exquisite and eye-catching, the pair of fish-themed sandals is sure to turn heads. Perfect for beach days or casual outings, these unique sandals feature a pair of large fish painted in green and yellow, adding a whimsical touch to any outfit.  With their innovative design, these sandals are unlike any other, promising to stand out in a crowd and make a statement. Boasting impeccable craftsmanship and attention to detail, these sandals are a must-have for those who value individuality and want to make a statement while on their feet.  So, for all those who seek unique, high-quality sandals, look no further. Be the envy of your friends and family with these exotic fish-themed sandals, which are sure to turn heads and make a lasting impression.",
    input: {
      img: "imgUrl",
      prompt: "string",
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
    outputExample: "...",
    input: {
      required: {
      prompt: ""
      }
    }
  },
   {
    modelName: "minigpt-4",
    type: "multi2txt",
    input: {
      required: {
      image: "file",
      prompt: "string",
                },
      num_beams: "integer",
      temperature: "number", // default 1 (lower = more predictable) 
      repetition_penalty: "number", // default 1 (greater than 1, discourage repitition, less than 1 encourage)
      max_new_tokens: "integer", //default 3000
      max_length: "integer", //default 4000
    }
   },
];


export default deployments;