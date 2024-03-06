import { atom } from "recoil";

export const voiceOverScriptState = atom<string | null>({
    key: 'voiceOverScriptState',
    default: null,
})