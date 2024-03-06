import { atom } from "recoil";

export const modelTrainingDataState = atom<File[]>({
    key: 'modelTrainingDataState',
    default: [],
});

export const modelIdState = atom<string | null>({
    key: 'modelIdState',
    default: null,
});

export const typeOfModelState = atom<string | null>({
    key: 'typeOfModelState',
    default: null, 
});

export const numberOfImagesState = atom<string | null>({
    key: 'numberOfImagesState',
    default: null,
});

export const trainingModelNameState = atom<string>({
    key: 'modelNameState',
    default: '',
})