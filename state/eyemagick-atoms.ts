import { atom } from "recoil";

export const eyeMagickUploadState = atom<File | null>({
    key: 'eyeMagickUploadState',
    default: null,
});

export const eyeMagickPromptState = atom({
    key: 'eyeMagickPromptState',
    default: "",
});
