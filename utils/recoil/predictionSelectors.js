import { selector } from 'recoil';
import { promptState } from './predictionAtoms'

export const promptStateSubmit = selector({
    key: 'promptStateSubmit', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const prompt = get(promptState);
  
      return prompt;
    },
  });