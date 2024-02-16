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
export const webpageUrlState = atom<string | null>({
  key: 'webpageUrlState',
  default: null,
});

export const avatarScriptState = atom<string | null>({
  key: 'avatarScriptState',
  default: null,
});

export const voiceoverUrlState = atom<string | null>({
  key: 'voiceoverUrlState',
  default: null,
});
