'use client'
import { atom } from 'recoil';

export const predictionIsLoadingState = atom({
   key: 'predictionIsLoadingState',
   default: 'false',
});

export const userImageUploadState = atom<File | null>({
  key: 'userImageUploadState',
  default: null,
});
export const userInFileState = atom<File | null>({
  key: 'userInFileState',
  default: null,
});


export const modelBootProgressState = atom({
  key: 'modelBootProgressState',
  default: '0',
});
export const modelBootResultState = atom({
  key: 'modelBootResultState',
  default: '',
});


export const predictionStatusState = atom({
  key: 'predictionStatusState',
  default: null,
});
export const predictionErrorState = atom({
  key: 'predictionErrorState',
  default: null,
});
export const predictionProgressState = atom({
  key: 'predictionProgressState',
  default: 0, // Default progress is 0
});
export const predictionResultState = atom({
  key: 'predictionResultState',
  default: null,
});




export const finalPredictionState = atom({
  key: 'finalPredictionState',
  default: null,
});




export const imageNarrativesUploadState = atom<File | null>({
  key: 'imageNarrativesUploadState',
  default: null,
});

export const imageNarrativesPromptState = atom({
  key: 'imageNarrativesPromptState',
  default: "",
});

