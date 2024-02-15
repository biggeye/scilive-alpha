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

export const voiceIdState = atom ({
    key: "voiceIdState",
    default: null,
})

export const avatarScriptState = atom ({
    key: "avatarScriptState",
    default: "",
})

export const avatarImageState = atom ({
    key: "avatarImageState",
    default: "",
})

export const audioFileState = atom<File | null> ({
    key: "audioFileState",
    default: null,
})