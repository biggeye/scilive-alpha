import { atom } from "recoil";
import { ContentItem } from '@/types';

// This atom's default value is an empty array of ContentItem,
// TypeScript infers the type based on the default value,
// which means explicit type annotation here is optional.
export const contentItemsState = atom<ContentItem[][]>({
  key: 'contentItemsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
