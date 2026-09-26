import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import * as FaceValue from './managed/facevalue/contract/index.js';
import { type FaceValuePrivateState, witnesses } from './witnesses.js';

export * from './managed/facevalue/contract/index.js';
export * from './witnesses.js';

export const CompiledFaceValue = CompiledContract.make<FaceValue.Contract<FaceValuePrivateState>>(
  'FaceValue',
  FaceValue.Contract<FaceValuePrivateState>,
).pipe(CompiledContract.withWitnesses(witnesses), CompiledContract.withCompiledFileAssets('./managed/facevalue'));
