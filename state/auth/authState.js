// states/authState.js
import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    tiktok: false,
    google: false,
    twitter: false,
    facebook: false,
    instagram: false
  }
});
