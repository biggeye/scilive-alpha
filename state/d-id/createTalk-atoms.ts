// state/createTalk-atoms.ts

import { atom } from "recoil";

// voice cloning
export const audioFileState = atom<File | null>({
  key: 'audioFileState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
export const voiceIdState = atom<string | null>({
  key: 'voiceIdState',
  default: null,
});


// voiceover creation
export const hostNameState = atom<string>({
  key: 'hostNameState',
  default: "",
});
export const podcastNameState = atom<string>({
  key: 'podcastNameState',
  default: "",
});
export const webpageUrlState = atom<string>({
  key: 'webpageUrlState',
  default: "", // Changed from null to an empty string
});
export const avatarScriptState = atom<string>({
  key: 'avatarScriptState',
  default: "", // Changed from null to an empty string
});
export const voiceoverUrlState = atom<string | null>({
  key: 'voiceoverUrlState',
  default: null,
});
export const hostUrlState = atom<string | null>({
  key: 'hostUrlState',
  default: null,
})

