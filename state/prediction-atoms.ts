'use client'
import { atom } from 'recoil';

export const userImageUploadState = atom<File | null>({
  key: 'userImageUploadState',
  default: null,
});

export const userInFileState = atom<File | null>({
  key: 'userInFileState',
  default: null,
})

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
  default: null, // Default progress is 0
});



export const predictionIdState = atom({
  key: 'predictionIdState',
  default: null,
});

export const finalPredictionState = atom({
  key: 'finalPredictionState',
  default: null,
})

export const imageNarrativesUploadState = atom<File | null>({
  key: 'imageNarrativesUploadState',
  default: null,
});

export const imageNarrativesPromptState = atom({
  key: 'imageNarrativesPromptState',
  default: "",
});
