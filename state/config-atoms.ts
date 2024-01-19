import { atom } from "recoil";

export const selectedModelFriendlyNameState = atom({
    key: "selectedModelFriendlyNameState",
    default: "",
  });

export const exampleImageState = atom({
    key: 'exampleImageState',
    default: "",
  });

  export const selectedModelIdState = atom ({
    key: "selectedModelIdState",
    default: "",
  });

  export const selectedTabState = atom ({
    key: "selectedTabState",
    default: "imageCreation",
  })

  export const dashboardState = atom({
    key: "dashboardState",
    default: false,
  })