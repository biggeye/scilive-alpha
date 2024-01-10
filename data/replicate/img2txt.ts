import { Img2TxtItem, Input } from "@/types_db";

const img2txt: Img2TxtItem[] = [
    {
        name: "minigpt-4",
        id: "b96a2f33cc8e4b0aa23eacfce731b9c41a7d9466d9ed4e167375587b54db9423",
        friendlyName: "MiniGPT 4",
        type: "multi2txt",
        example: "https://replicate.delivery/pbxt/IqG1MbemhULihtfr62URRZbI29XtcPsnOYASrTDQ6u5oSqv9/llama_13b.png",
        input: {
          image: "user_upload",
          prompt: "",
        },
          temperature: "1", // default 1 (lower = more predictable) 
          repetition_penalty: "1", // default 1 (greater than 1, discourage repitition, less than 1 encourage)
          max_new_tokens: "3000", //default 3000
          max_length: "4000", //default 4000
       },
       {
        name: "clip-interrogator",
        id: "8151e1c9f47e696fa316146a2e35812ccf79cfc9eba05b11c7f450155102af70",
        friendlyName: "Clip Interrogator",
        type: "multi2txt",
        example: "https://replicate.delivery/pbxt/HrXsgowfhbZi3dImGZoIcvnz7oZfMtFY4UAEU8vBIakTd8JQ/watercolour-4799014_960_720.jpg",
        input: {
            image: "user_upload",
            prompt: "",
        },
        mode: "best",
        }
];
export default img2txt;