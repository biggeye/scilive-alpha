import { atom } from "recoil";

export const currentUserIdState = atom ({
 key: "currentUserIdState",
 default: null,
})

export const currentUserAvatarUrl = atom ({
    key: "currentUserAvatarUrl",
    default: null,
})