import { atom } from "recoil";

export const currentPageState = atom<string | null>({
   key: 'currentPageState',
   default: null,
});

export const viewModeState = atom<string | null>({
    key: 'viewModeState',
    default: null,
});
