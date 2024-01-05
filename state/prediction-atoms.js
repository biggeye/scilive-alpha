'use client'
import { atom } from 'recoil';

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

