// avatar creation
import { atom } from "recoil";

export const avatarNameState = atom<string | null>({
    key: 'avatarNameState',
    default: null,
  });
  export const avatarDescriptionState = atom<string | null>({
    key: 'avatarDescriptionState',
    default: null,
  });
  export const frameStyleState = atom<string | null>({
    key: 'frameStyleState',
    default: null,
  });
  export const photoStyleState = atom<string | null>({
    key: 'photoStyleState',
    default: null,
  });
  export const avatarUrlState = atom<string | null>({
    key: 'avatarUrlState',
    default: null,
  });
  export const imageArrayState = atom<Array<[]> | null>({
    key: 'imageArrayState',
    default: [],
  })
  