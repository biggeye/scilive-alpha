import { atom } from "recoil";

export const selectedModelState = atom({
    key: "selectedModelState",
    default: {
      id: "",
      friendlyName: "",
      shortDesc: "",
      example: "", // or example?: string if it's optional
    },
  });
  

export const exampleImageState = atom({
    key: 'exampleImageState',
    default: "",
  });