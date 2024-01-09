'use client'
import { atom } from 'recoil';

export const userImageUploadState = atom<File | null>({
  key: 'userImageUploadState',
  default: null,
});

export const predictionState = atom({
  key: 'predictionState',
  default: null,
});

export const predictionErrorState = atom({
  key: 'predictionErrorState',
  default: null,
});

export const predictionResultState = atom({
  key: 'predictionResultState',
  default: null,
});

export const predictionProgressState = atom({
  key: 'predictionProgressState',
  default: 0, // Default progress is 0
});

export const exampleImageState = atom({
  key: 'exampleImageState',
  default: null,
});

export const predictionIdState = atom({
  key: 'predictionIdState',
  default: null,
});

export const finalPredictionState = atom({
  key: 'finalPredictionState',
  default: null,
})

