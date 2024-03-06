'use client'
import { atom} from "recoil";

export const streamIdState = atom({
    key: 'streamIdState',
    default: null,
});
export const sessionIdState = atom({
    key: 'sessionIdState',
    default: null,
});
export const sdpOfferState = atom({
    key: 'sdpOfferState',
    default: null,
});
export const iceServersState = atom({
    key: 'iceServersState',
    default: [],
});

export const sessionClientAnswerState = atom({
    key: 'sessionClientAnswerState',
    default: null,
});

export const candidateState = atom({
    key: 'candidateState',
    default: null,
});
export const sdpMidState = atom({
    key: 'sdpMidState',
    default: null,
});
export const sdpMLineIndexState = atom({
    key: 'sdpMLineIndexState',
    default: null,
});
export const sdpResponseState = atom({
    key: 'sdpResponseState',
    default: null,
});


export const userAvatarUrlState = atom({
    key: 'user AvatarUrlState',
    default: '',
})