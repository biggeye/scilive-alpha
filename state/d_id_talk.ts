import { atom } from "recoil";

export const talkVideoUrlState = atom ({
 key: "talkVideoUrlState",
 default: null,
})

export const talkVideoStatusState = atom ({
    key: "talkVideoStatusState",
    default: null,
})

export const talkVideoPendingUrlState = atom ({
    key: "talkVideoPendingUrlState",
    default: null,
})