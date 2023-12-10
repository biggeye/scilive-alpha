import { atom } from 'recoil';

export const promptState = atom({
    key: 'promptState', // unique ID (with respect to other atoms/selectors)
    default: '""', // default value (aka initial value)
  });