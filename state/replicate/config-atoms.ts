//state/replicate/config-atoms.ts

import { atom } from "recoil";


  // REPLICATE MODEL SELECTION
export const selectedModelIdState = atom ({
  key: "selectedModelIdState",
  default: "",
});
export const selectedModelFriendlyNameState = atom({
    key: "selectedModelFriendlyNameState",
    default: "",
  });
export const selectedModelNameState = atom ({
  key: "selectedModelNameState",
  default: "",
});
export const exampleImageState = atom({
    key: 'exampleImageState',
    default: "",
  });
  export const selectedModelShortDescState = atom ({
    key: "selectedModelShortDescState",
    default: "",
  });

  
   // UI
  export const selectedTabState = atom ({
    key: "selectedTabState",
    default: "imageCreation",
  });
