//state/user_state-atoms.ts

import { atom } from "recoil";

export const currentUserIdState = atom<string | null> ({
 key: "currentUserIdState",
 default: null,
});

export const currentUserAvatarUrlState = atom<string | null> ({
    key: "currentUserAvatarUrlState",
    default: null,
});

export const currentPageState = atom<string | null> ({
    key: 'currentPageState',
    default: null,
});

export const viewModeState = atom<string> ({
    key: 'viewModeState',
    default: 'tabs',
});