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

// avatar creation
export const avatarNameState = atom<string | null>({
  key: 'avatarNameState',
  default: null,
});

export const avatarDescriptionState = atom<string | null>({
  key: 'avatarDescriptionState',
  default: null,
});

export const avatarUrlState = atom<string | null>({
  key: 'avatarUrlState',
  default: null,
});

// voiceover creation
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
