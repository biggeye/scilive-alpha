//state/gallery-atoms.ts

import { atom } from "recoil";
import { ContentItem } from '@/types';

export const contentItemsState = atom<ContentItem[][]>({
  key: 'contentItemsState',
  default: [],
});

export const currentIndexState = atom<number | null>({
  key: 'currentIndexState',
  default: null,
});

export const currentGroupState = atom<number | null>({
  key: 'currentGroupState',
  default: 0,
});