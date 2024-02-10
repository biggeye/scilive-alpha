'use client'
import { atom } from 'recoil';

export const userImagePreviewState = atom<string | null>({
  key: 'userImagePreviewState',
  default: null,
});
export const userImageUploadState = atom<File | null>({
  key: 'userImageUploadState',
  default: null,
});
export const userInFileState = atom<File | null>({
  key: 'userInFileState',
  default: null,
});
export const userImageDataUriState = atom<string | null>({
  key: 'userImageDataUriState',
  default: null,
});
export const existingUploadState = atom<File | null>({
  key: 'existingUploadState',
  default: null,
});

export const modelBootProgressState = atom({
  key: 'modelBootProgressState',
  default: 0,
});
export const modelBootResultState = atom({
  key: 'modelBootResultState',
  default: "Model not started",
});

export const predictionErrorState = atom({
  key: 'predictionErrorState',
  default: null,
});
export const predictionProgressState = atom({
  key: 'predictionProgressState',
  default: null, // Default progress is 0
});

export const predictionResultState = atom({
  key: 'predictionResultState',
  default: null,
});

export const predictionStatusState = atom({
  key: 'predictionStatusState',
  default: '',
})
export const predictionIsLoadingState = atom({
  key: 'predictionIsLoadingState',
  default: false,
});



// finalized
export const finalPredictionState = atom({
  key: 'finalPredictionState',
  default: null,
});

export const finalPredictionPromptState = atom({
key: 'finalPredictionPromptState',
default: null,
});

export const finalNarrativePredictionState = atom({
  key: 'finalNarrativePredictionState',
  default: '' || null,
});

export const finalNarrativeState = atom ({
  key: 'finalNarrativeState',
  default: '' || null,
});

export const imageNarrativeUploadState = atom<File | null>({
  key: 'imageNarrativeUploadState',
  default: null,
});

export const imageNarrativePromptState = atom ({
  key: 'imageNarrativePromptState',
  default: "Describe the image you've uploaded",
});

