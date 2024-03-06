// state/recoilAtomsIndex.ts
import { RecoilState } from 'recoil';
import * as predictionAtoms from './replicate/prediction-atoms';
import * as configAtoms from './replicate/config-atoms';
import * as createTalkAtoms from './d-id/createTalk-atoms';
import * as galleryAtoms from './user/gallery-atoms';
import * as userStateAtoms from './user/user_state-atoms';
import * as avatarAtoms from './leap/avatar-atoms';
import * as trainedModelAtoms from './leap/trainedModel-atoms';

// Define a type for the atomsIndex that includes an index signature
type AtomsIndexType = {
  [key: string]: RecoilState<any>;
};

// Combine all atoms into a single object that matches the AtomsIndexType
const atomsIndex: AtomsIndexType = {
  ...avatarAtoms,
  ...trainedModelAtoms,
  ...predictionAtoms,
  ...configAtoms,
  ...createTalkAtoms,
  ...galleryAtoms,
  ...userStateAtoms,
};

export { atomsIndex };
