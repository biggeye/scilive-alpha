import { Img2ImgItem, Input } from "@/types_db";

const img2img: Img2ImgItem[] = [
    {
        name: "mv-lab/swin2sr",
        id: "a01b0512004918ca55d02e554914a9eca63909fa83a29ff0f115c78a7045574f",
        shortDesc: "AI Photorealistic Image Super-Resolution and Restoration",
        input: {
            image: "user_upload",
        },
        outputIndex: "0",
        friendlyName: "Super Resolution & Restoration",
        example: "https://replicate.delivery/pbxt/KUIcw7v0GKZtDByjISRnRrcMer7J80cikHOCcnvdnefhFcChA/out.png"
    },
    {
        name: "microsoft/bringing-old-photos-back-to-life",
        id: "c75db81db6cbd809d93cc3b7e7a088a351a3349c9fa02b6d393e35e0d51ba799",
        shortDesc: "Bringing Old Photos Back to Life",
        input: {
            image: "user_upload",
        },
        outputIndex: "0",
        friendlyName: "Restore Old Photo",
        example: "https://replicate.delivery/mgxm/892cca7f-4f6f-4359-9865-f9cacba34199/out.png"
    },
    {
        name: "arielreplicate/deoldify_image",
        id: "0da600fab0c45a66211339f1c16b71345d22f26ef5fea3dca1bb90bb5711e950",
        shortDesc: "Add colours to old images",
        input: {
            image: "user_upload",
        },
        outputIndex: "0",
        friendlyName: "Colorize",
        example: "https://replicate.delivery/pbxt/qzypePce20uGHEeKPikfWFdcoImAS0vYu1mGY9Av0qryOyVBB/tmpb0coa7f02.jpg"
    },
    { 
        name: "jagilley/controlnet-canny",
        id: "aff48af9c68d162388d230a2ab003f68d2638d88307bdaf1c2f1ac95079c9613",
        shortDesc: "Modify images using canny edge detection", 
        input: {
            image: "user_upload",
            prompt:  "prompt",
        },
        outputIndex: "1",
        friendlyName: "Edge Detection",
        example: "https://replicate.delivery/pbxt/Fp3G1dILv6YRNxTLm6VfVc9mzRHktHlvae9U6TGKGSAkdDhQA/output_1.png"
    },
    { 
        name: "jagilley/controlnet-depth2img",
        id: "922c7bb67b87ec32cbc2fd11b1d5f94f0ba4f5519c4dbd02856376444127cc60",
        shortDesc: "Modify images using depth maps", 
        input: {
            image: "user_upload",
            prompt:  "prompt",
        },
        outputIndex: "1",
        friendlyName: "Depth Detection",
        example: "https://replicate.delivery/pbxt/CCPUFqXwc2LZF5CVU13C8yPE03ENz9gMdnuvXf7Kb2abzhPIA/output_1.png"
    },
    { 
        name: "jagilley/controlnet-hough",
        id: "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
        shortDesc: "Modify images using M-LSD line detection", 
        input: {
            image: "user_upload",
            prompt:  "prompt",
        },
        outputIndex: "1",
        friendlyName: "Line Detection",
        example: "https://replicate.delivery/pbxt/kfbWmK9LnJRiOqqfOmnYrrbQ4X37kysVlAMllEKManE92aegA/output_1.png"
    },
    {
        name: "cjwbw/rembg",
        id: "fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
        shortDesc: "Remove image's background", 
        input: {
            image: "user_upload",
            prompt:  "prompt",
        },
        outputIndex: "0",
        friendlyName: "Remove Background",
        example: "https://replicate.delivery/pbxt/2hczaMwD9xrsIR8h3Cl8iYGbHaCdFhIOMZ0LfoYfHlKuuIBQA/out.png"
    },
    { 
        name: "jagilley/controlnet-pose",
        id: "0304f7f774ba7341ef754231f794b1ba3d129e3c46af3022241325ae0c50fb99",
        shortDesc: "Modify images with humans using pose detection", 
        input: {
            image: "user_upload",
            prompt:  "prompt",
        },
        outputIndex: "1",
        friendlyName: "Pose Detection",
        example: "https://replicate.delivery/pbxt/q2fCGheRyqunU0PfSxq18PNaJToHtcTzgO1NfPiTgM3qlb8BB/output_1.png"
    },
    { 
        name: "jagilley/controlnet-seg",
        id: "f967b165f4cd2e151d11e7450a8214e5d22ad2007f042f2f891ca3981dbfba0d",
        shortDesc: "Modify images using semantic segmenetation", 
        input: {
            image: "user_upload",
            prompt:  "prompt",
        },
        outputIndex: "1",
        friendlyName: "Semantic Segmentation",
        example: "https://replicate.delivery/pbxt/YKVetNkuroyWJC4mxzrgvQbJ2vS5eFOS1B8xkJMkAiXMbaegA/output_1.png"
    },
    {
        name: "sczhou/codeformer",
        id: "7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
        shortDesc: "", 
        input: {
            image: "user_upload",
            prompt:  "prompt",
        },
        outputIndex: "0",
        friendlyName: "Upscale Restoration / Face Restoration",
        example: "https://replicate.com/api/models/sczhou/codeformer/files/4e7adcc7-eb0d-49c9-81e5-56c041f7a9dd/output.png"
    },
    {
        name: "timothybrooks/instruct-pix2pix",
        id: "30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
        shortDesc: "Edit images with human instructions",
        input: {
            image: "user_upload",
            prompt: "prompt",
        },
        outputIndex: "0",
        friendlyName: "Pix2Pix",
        example: "https://replicate.delivery/pbxt/kfL8fyBkHllh4kfEJbulrcnzWywUzZ2Fl1GkpXlb4n8xiaugA/out-0.png"
    },
    {
        name: "jingyunliang/swinir",
        id: "660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a",
        shortDesc: "Image Restoration Using Swin Transformer",
        input: {
            image: "user_upload",
        },
        outputIndex: "0",
        friendlyName: "Upscale / Super-Resolution",
        example: "https://replicate.delivery/mgxm/1fdd16a4-21d1-4b65-aec4-21936690f66d/out.png"
    },
].sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));

export default img2img;