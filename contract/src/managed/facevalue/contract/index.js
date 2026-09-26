import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var Phase;
(function (Phase) {
  Phase[Phase['draw'] = 0] = 'draw';
  Phase[Phase['closing'] = 1] = 'closing';
  Phase[Phase['drawn'] = 2] = 'drawn';
  Phase[Phase['sale'] = 3] = 'sale';
  Phase[Phase['closed'] = 4] = 'closed';
})(Phase || (Phase = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_3.toValue(value_0.value)));
  }
}

const _descriptor_4 = new _ShieldedCoinInfo_0();

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

const _descriptor_6 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_7 = new __compactRuntime.CompactTypeEnum(4, 1);

class _Show_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment().concat(_descriptor_6.alignment().concat(_descriptor_7.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_3.alignment()))))))))))))))));
  }
  fromValue(value_0) {
    return {
      organizer: _descriptor_0.fromValue(value_0),
      faceValue: _descriptor_1.fromValue(value_0),
      capacity: _descriptor_5.fromValue(value_0),
      perFanCap: _descriptor_6.fromValue(value_0),
      phase: _descriptor_7.fromValue(value_0),
      seedCommit: _descriptor_0.fromValue(value_0),
      beaconRound: _descriptor_1.fromValue(value_0),
      beacon: _descriptor_5.fromValue(value_0),
      seed: _descriptor_5.fromValue(value_0),
      entropy: _descriptor_1.fromValue(value_0),
      entries: _descriptor_5.fromValue(value_0),
      offset: _descriptor_5.fromValue(value_0),
      issued: _descriptor_5.fromValue(value_0),
      pool: _descriptor_5.fromValue(value_0),
      returned: _descriptor_5.fromValue(value_0),
      checkedIn: _descriptor_5.fromValue(value_0),
      revenue: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.organizer).concat(_descriptor_1.toValue(value_0.faceValue).concat(_descriptor_5.toValue(value_0.capacity).concat(_descriptor_6.toValue(value_0.perFanCap).concat(_descriptor_7.toValue(value_0.phase).concat(_descriptor_0.toValue(value_0.seedCommit).concat(_descriptor_1.toValue(value_0.beaconRound).concat(_descriptor_5.toValue(value_0.beacon).concat(_descriptor_5.toValue(value_0.seed).concat(_descriptor_1.toValue(value_0.entropy).concat(_descriptor_5.toValue(value_0.entries).concat(_descriptor_5.toValue(value_0.offset).concat(_descriptor_5.toValue(value_0.issued).concat(_descriptor_5.toValue(value_0.pool).concat(_descriptor_5.toValue(value_0.returned).concat(_descriptor_5.toValue(value_0.checkedIn).concat(_descriptor_3.toValue(value_0.revenue)))))))))))))))));
  }
}

const _descriptor_8 = new _Show_0();

const _descriptor_9 = __compactRuntime.CompactTypeBoolean;

const _descriptor_10 = new __compactRuntime.CompactTypeVector(4, _descriptor_0);

class _QualifiedShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_1.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_3.fromValue(value_0),
      mt_index: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_3.toValue(value_0.value).concat(_descriptor_1.toValue(value_0.mt_index))));
  }
}

const _descriptor_11 = new _QualifiedShieldedCoinInfo_0();

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_12 = new _ZswapCoinPublicKey_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_13 = new _ContractAddress_0();

class _Either_0 {
  alignment() {
    return _descriptor_9.alignment().concat(_descriptor_12.alignment().concat(_descriptor_13.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_9.fromValue(value_0),
      left: _descriptor_12.fromValue(value_0),
      right: _descriptor_13.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_9.toValue(value_0.is_left).concat(_descriptor_12.toValue(value_0.left).concat(_descriptor_13.toValue(value_0.right)));
  }
}

const _descriptor_14 = new _Either_0();

const _descriptor_15 = __compactRuntime.CompactTypeField;

class _MerkleTreeDigest_0 {
  alignment() {
    return _descriptor_15.alignment();
  }
  fromValue(value_0) {
    return {
      field: _descriptor_15.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_15.toValue(value_0.field);
  }
}

const _descriptor_16 = new _MerkleTreeDigest_0();

const _descriptor_17 = new __compactRuntime.CompactTypeUnsignedInteger(79228162514264337593543950335n, 12);

class _tuple_0 {
  alignment() {
    return _descriptor_17.alignment().concat(_descriptor_5.alignment());
  }
  fromValue(value_0) {
    return [
      _descriptor_17.fromValue(value_0),
      _descriptor_5.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_17.toValue(value_0[0]).concat(_descriptor_5.toValue(value_0[1]));
  }
}

const _descriptor_18 = new _tuple_0();

class _MerkleTreePathEntry_0 {
  alignment() {
    return _descriptor_16.alignment().concat(_descriptor_9.alignment());
  }
  fromValue(value_0) {
    return {
      sibling: _descriptor_16.fromValue(value_0),
      goes_left: _descriptor_9.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_16.toValue(value_0.sibling).concat(_descriptor_9.toValue(value_0.goes_left));
  }
}

const _descriptor_19 = new _MerkleTreePathEntry_0();

const _descriptor_20 = new __compactRuntime.CompactTypeVector(20, _descriptor_19);

class _MerkleTreePath_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_20.alignment());
  }
  fromValue(value_0) {
    return {
      leaf: _descriptor_0.fromValue(value_0),
      path: _descriptor_20.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.leaf).concat(_descriptor_20.toValue(value_0.path));
  }
}

const _descriptor_21 = new _MerkleTreePath_0();

const _descriptor_22 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

const _descriptor_23 = new __compactRuntime.CompactTypeBytes(6);

class _LeafPreimage_0 {
  alignment() {
    return _descriptor_23.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_23.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_23.toValue(value_0.domain_sep).concat(_descriptor_0.toValue(value_0.data));
  }
}

const _descriptor_24 = new _LeafPreimage_0();

const _descriptor_25 = new __compactRuntime.CompactTypeBytes(21);

class _CoinPreimage_0 {
  alignment() {
    return _descriptor_25.alignment().concat(_descriptor_4.alignment().concat(_descriptor_9.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_25.fromValue(value_0),
      info: _descriptor_4.fromValue(value_0),
      dataType: _descriptor_9.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_25.toValue(value_0.domain_sep).concat(_descriptor_4.toValue(value_0.info).concat(_descriptor_9.toValue(value_0.dataType).concat(_descriptor_0.toValue(value_0.data))));
  }
}

const _descriptor_26 = new _CoinPreimage_0();

const _descriptor_27 = new __compactRuntime.CompactTypeVector(3, _descriptor_0);

const _descriptor_28 = new __compactRuntime.CompactTypeVector(3, _descriptor_15);

const _descriptor_29 = new __compactRuntime.CompactTypeVector(2, _descriptor_15);

class _Maybe_0 {
  alignment() {
    return _descriptor_9.alignment().concat(_descriptor_4.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_9.fromValue(value_0),
      value: _descriptor_4.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_9.toValue(value_0.is_some).concat(_descriptor_4.toValue(value_0.value));
  }
}

const _descriptor_30 = new _Maybe_0();

class _ShieldedSendResult_0 {
  alignment() {
    return _descriptor_30.alignment().concat(_descriptor_4.alignment());
  }
  fromValue(value_0) {
    return {
      change: _descriptor_30.fromValue(value_0),
      sent: _descriptor_4.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_30.toValue(value_0.change).concat(_descriptor_4.toValue(value_0.sent));
  }
}

const _descriptor_31 = new _ShieldedSendResult_0();

class _Either_1 {
  alignment() {
    return _descriptor_9.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_9.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_9.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_32 = new _Either_1();

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.roleSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named roleSecret');
    }
    if (typeof(witnesses_0.fanSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named fanSecret');
    }
    if (typeof(witnesses_0.fanPath) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named fanPath');
    }
    if (typeof(witnesses_0.ticketPath) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named ticketPath');
    }
    if (typeof(witnesses_0.entryContribution) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named entryContribution');
    }
    if (typeof(witnesses_0.entryIndexOf) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named entryIndexOf');
    }
    if (typeof(witnesses_0.divRem) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named divRem');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      rolePk(context, ...args_1) {
        return { result: pureCircuits.rolePk(...args_1), context };
      },
      fanLeaf(context, ...args_1) {
        return { result: pureCircuits.fanLeaf(...args_1), context };
      },
      entryTag(context, ...args_1) {
        return { result: pureCircuits.entryTag(...args_1), context };
      },
      entryKey(context, ...args_1) {
        return { result: pureCircuits.entryKey(...args_1), context };
      },
      slotNullifier(context, ...args_1) {
        return { result: pureCircuits.slotNullifier(...args_1), context };
      },
      ticketCommit(context, ...args_1) {
        return { result: pureCircuits.ticketCommit(...args_1), context };
      },
      ticketNullifier(context, ...args_1) {
        return { result: pureCircuits.ticketNullifier(...args_1), context };
      },
      seedCommitment(context, ...args_1) {
        return { result: pureCircuits.seedCommitment(...args_1), context };
      },
      windowPosition(context, ...args_1) {
        return { result: pureCircuits.windowPosition(...args_1), context };
      },
      tkrwColor: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`tkrwColor: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('tkrwColor',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 199 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._tkrwColor_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      enroll: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`enroll: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const leaf_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('enroll',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 240 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('enroll',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 240 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(leaf_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._enroll_0(context, partialProofData, leaf_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      enrollBatch: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`enrollBatch: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const leaves_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('enrollBatch',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 248 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(Array.isArray(leaves_0) && leaves_0.length === 4 && leaves_0.every((t) => t.buffer instanceof ArrayBuffer && t.BYTES_PER_ELEMENT === 1 && t.length === 32))) {
          __compactRuntime.typeError('enrollBatch',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 248 char 1',
                                     'Vector<4, Bytes<32>>',
                                     leaves_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_10.toValue(leaves_0),
            alignment: _descriptor_10.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._enrollBatch_0(context, partialProofData, leaves_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      createShow: (...args_1) => {
        if (args_1.length !== 7) {
          throw new __compactRuntime.CompactError(`createShow: expected 7 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const showId_0 = args_1[1];
        const faceValue_0 = args_1[2];
        const capacity_0 = args_1[3];
        const perFanCap_0 = args_1[4];
        const seedCommit_0 = args_1[5];
        const beaconRound_0 = args_1[6];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('createShow',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 262 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
          __compactRuntime.typeError('createShow',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 262 char 1',
                                     'Bytes<32>',
                                     showId_0)
        }
        if (!(typeof(faceValue_0) === 'bigint' && faceValue_0 >= 0n && faceValue_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createShow',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'facevalue.compact line 262 char 1',
                                     'Uint<0..18446744073709551616>',
                                     faceValue_0)
        }
        if (!(typeof(capacity_0) === 'bigint' && capacity_0 >= 0n && capacity_0 <= 4294967295n)) {
          __compactRuntime.typeError('createShow',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'facevalue.compact line 262 char 1',
                                     'Uint<0..4294967296>',
                                     capacity_0)
        }
        if (!(typeof(perFanCap_0) === 'bigint' && perFanCap_0 >= 0n && perFanCap_0 <= 255n)) {
          __compactRuntime.typeError('createShow',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'facevalue.compact line 262 char 1',
                                     'Uint<0..256>',
                                     perFanCap_0)
        }
        if (!(seedCommit_0.buffer instanceof ArrayBuffer && seedCommit_0.BYTES_PER_ELEMENT === 1 && seedCommit_0.length === 32)) {
          __compactRuntime.typeError('createShow',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'facevalue.compact line 262 char 1',
                                     'Bytes<32>',
                                     seedCommit_0)
        }
        if (!(typeof(beaconRound_0) === 'bigint' && beaconRound_0 >= 0n && beaconRound_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createShow',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'facevalue.compact line 262 char 1',
                                     'Uint<0..18446744073709551616>',
                                     beaconRound_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(showId_0).concat(_descriptor_1.toValue(faceValue_0).concat(_descriptor_5.toValue(capacity_0).concat(_descriptor_6.toValue(perFanCap_0).concat(_descriptor_0.toValue(seedCommit_0).concat(_descriptor_1.toValue(beaconRound_0)))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment())))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createShow_0(context,
                                            partialProofData,
                                            showId_0,
                                            faceValue_0,
                                            capacity_0,
                                            perFanCap_0,
                                            seedCommit_0,
                                            beaconRound_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      closeEntries: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`closeEntries: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const showId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('closeEntries',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 295 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
          __compactRuntime.typeError('closeEntries',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 295 char 1',
                                     'Bytes<32>',
                                     showId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(showId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._closeEntries_0(context,
                                              partialProofData,
                                              showId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      revealDraw: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`revealDraw: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const showId_0 = args_1[1];
        const seed_0 = args_1[2];
        const salt_0 = args_1[3];
        const beacon_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('revealDraw',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 305 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
          __compactRuntime.typeError('revealDraw',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 305 char 1',
                                     'Bytes<32>',
                                     showId_0)
        }
        if (!(typeof(seed_0) === 'bigint' && seed_0 >= 0n && seed_0 <= 4294967295n)) {
          __compactRuntime.typeError('revealDraw',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'facevalue.compact line 305 char 1',
                                     'Uint<0..4294967296>',
                                     seed_0)
        }
        if (!(salt_0.buffer instanceof ArrayBuffer && salt_0.BYTES_PER_ELEMENT === 1 && salt_0.length === 32)) {
          __compactRuntime.typeError('revealDraw',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'facevalue.compact line 305 char 1',
                                     'Bytes<32>',
                                     salt_0)
        }
        if (!(typeof(beacon_0) === 'bigint' && beacon_0 >= 0n && beacon_0 <= 4294967295n)) {
          __compactRuntime.typeError('revealDraw',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'facevalue.compact line 305 char 1',
                                     'Uint<0..4294967296>',
                                     beacon_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(showId_0).concat(_descriptor_5.toValue(seed_0).concat(_descriptor_0.toValue(salt_0).concat(_descriptor_5.toValue(beacon_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_5.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._revealDraw_0(context,
                                            partialProofData,
                                            showId_0,
                                            seed_0,
                                            salt_0,
                                            beacon_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      openSale: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`openSale: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const showId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('openSale',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 324 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
          __compactRuntime.typeError('openSale',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 324 char 1',
                                     'Bytes<32>',
                                     showId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(showId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._openSale_0(context, partialProofData, showId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      closeShow: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`closeShow: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const showId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('closeShow',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 333 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
          __compactRuntime.typeError('closeShow',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 333 char 1',
                                     'Bytes<32>',
                                     showId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(showId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._closeShow_0(context, partialProofData, showId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      withdraw: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`withdraw: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const showId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('withdraw',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 343 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
          __compactRuntime.typeError('withdraw',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 343 char 1',
                                     'Bytes<32>',
                                     showId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(showId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._withdraw_0(context, partialProofData, showId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      enterDraw: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`enterDraw: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const showId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('enterDraw',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 357 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
          __compactRuntime.typeError('enterDraw',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 357 char 1',
                                     'Bytes<32>',
                                     showId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(showId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._enterDraw_0(context, partialProofData, showId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      claimTicket: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`claimTicket: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const showId_0 = args_1[1];
        const slot_0 = args_1[2];
        const coin_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('claimTicket',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 375 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
          __compactRuntime.typeError('claimTicket',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 375 char 1',
                                     'Bytes<32>',
                                     showId_0)
        }
        if (!(typeof(slot_0) === 'bigint' && slot_0 >= 0n && slot_0 <= 255n)) {
          __compactRuntime.typeError('claimTicket',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'facevalue.compact line 375 char 1',
                                     'Uint<0..256>',
                                     slot_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('claimTicket',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'facevalue.compact line 375 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(showId_0).concat(_descriptor_6.toValue(slot_0).concat(_descriptor_4.toValue(coin_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_4.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._claimTicket_0(context,
                                             partialProofData,
                                             showId_0,
                                             slot_0,
                                             coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      buyFromPool: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`buyFromPool: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const showId_0 = args_1[1];
        const slot_0 = args_1[2];
        const coin_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('buyFromPool',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 396 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
          __compactRuntime.typeError('buyFromPool',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 396 char 1',
                                     'Bytes<32>',
                                     showId_0)
        }
        if (!(typeof(slot_0) === 'bigint' && slot_0 >= 0n && slot_0 <= 255n)) {
          __compactRuntime.typeError('buyFromPool',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'facevalue.compact line 396 char 1',
                                     'Uint<0..256>',
                                     slot_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('buyFromPool',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'facevalue.compact line 396 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(showId_0).concat(_descriptor_6.toValue(slot_0).concat(_descriptor_4.toValue(coin_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_4.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._buyFromPool_0(context,
                                             partialProofData,
                                             showId_0,
                                             slot_0,
                                             coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      returnTicket: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`returnTicket: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const showId_0 = args_1[1];
        const slot_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('returnTicket',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 414 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
          __compactRuntime.typeError('returnTicket',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 414 char 1',
                                     'Bytes<32>',
                                     showId_0)
        }
        if (!(typeof(slot_0) === 'bigint' && slot_0 >= 0n && slot_0 <= 255n)) {
          __compactRuntime.typeError('returnTicket',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'facevalue.compact line 414 char 1',
                                     'Uint<0..256>',
                                     slot_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(showId_0).concat(_descriptor_6.toValue(slot_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_6.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._returnTicket_0(context,
                                              partialProofData,
                                              showId_0,
                                              slot_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      checkIn: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`checkIn: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const showId_0 = args_1[1];
        const slot_0 = args_1[2];
        const passKey_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('checkIn',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 432 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
          __compactRuntime.typeError('checkIn',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 432 char 1',
                                     'Bytes<32>',
                                     showId_0)
        }
        if (!(typeof(slot_0) === 'bigint' && slot_0 >= 0n && slot_0 <= 255n)) {
          __compactRuntime.typeError('checkIn',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'facevalue.compact line 432 char 1',
                                     'Uint<0..256>',
                                     slot_0)
        }
        if (!(passKey_0.buffer instanceof ArrayBuffer && passKey_0.BYTES_PER_ELEMENT === 1 && passKey_0.length === 32)) {
          __compactRuntime.typeError('checkIn',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'facevalue.compact line 432 char 1',
                                     'Bytes<32>',
                                     passKey_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(showId_0).concat(_descriptor_6.toValue(slot_0).concat(_descriptor_0.toValue(passKey_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._checkIn_0(context,
                                         partialProofData,
                                         showId_0,
                                         slot_0,
                                         passKey_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      faucet: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`faucet: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const amount_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('faucet',
                                     'argument 1 (as invoked from Typescript)',
                                     'facevalue.compact line 448 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('faucet',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'facevalue.compact line 448 char 1',
                                     'Uint<0..18446744073709551616>',
                                     amount_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(amount_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._faucet_0(context, partialProofData, amount_0);
        partialProofData.output = { value: _descriptor_4.toValue(result_0), alignment: _descriptor_4.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      tkrwColor: this.circuits.tkrwColor,
      enroll: this.circuits.enroll,
      enrollBatch: this.circuits.enrollBatch,
      createShow: this.circuits.createShow,
      closeEntries: this.circuits.closeEntries,
      revealDraw: this.circuits.revealDraw,
      openSale: this.circuits.openSale,
      closeShow: this.circuits.closeShow,
      withdraw: this.circuits.withdraw,
      enterDraw: this.circuits.enterDraw,
      claimTicket: this.circuits.claimTicket,
      buyFromPool: this.circuits.buyFromPool,
      returnTicket: this.circuits.returnTicket,
      checkIn: this.circuits.checkIn,
      faucet: this.circuits.faucet
    };
    this.provableCircuits = {
      tkrwColor: this.circuits.tkrwColor,
      enroll: this.circuits.enroll,
      enrollBatch: this.circuits.enrollBatch,
      createShow: this.circuits.createShow,
      closeEntries: this.circuits.closeEntries,
      revealDraw: this.circuits.revealDraw,
      openSale: this.circuits.openSale,
      closeShow: this.circuits.closeShow,
      withdraw: this.circuits.withdraw,
      enterDraw: this.circuits.enterDraw,
      claimTicket: this.circuits.claimTicket,
      buyFromPool: this.circuits.buyFromPool,
      returnTicket: this.circuits.returnTicket,
      checkIn: this.circuits.checkIn,
      faucet: this.circuits.faucet
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const issuerKey_0 = args_0[1];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(issuerKey_0.buffer instanceof ArrayBuffer && issuerKey_0.BYTES_PER_ELEMENT === 1 && issuerKey_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 1 (argument 2 as invoked from Typescript)',
                                 'facevalue.compact line 87 char 1',
                                 'Bytes<32>',
                                 issuerKey_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('tkrwColor', new __compactRuntime.ContractOperation());
    state_0.setOperation('enroll', new __compactRuntime.ContractOperation());
    state_0.setOperation('enrollBatch', new __compactRuntime.ContractOperation());
    state_0.setOperation('createShow', new __compactRuntime.ContractOperation());
    state_0.setOperation('closeEntries', new __compactRuntime.ContractOperation());
    state_0.setOperation('revealDraw', new __compactRuntime.ContractOperation());
    state_0.setOperation('openSale', new __compactRuntime.ContractOperation());
    state_0.setOperation('closeShow', new __compactRuntime.ContractOperation());
    state_0.setOperation('withdraw', new __compactRuntime.ContractOperation());
    state_0.setOperation('enterDraw', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimTicket', new __compactRuntime.ContractOperation());
    state_0.setOperation('buyFromPool', new __compactRuntime.ContractOperation());
    state_0.setOperation('returnTicket', new __compactRuntime.ContractOperation());
    state_0.setOperation('checkIn', new __compactRuntime.ContractOperation());
    state_0.setOperation('faucet', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(1n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newBoundedMerkleTree(
                                                                       new __compactRuntime.StateBoundedMerkleTree(20)
                                                                     )).arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                        alignment: _descriptor_1.alignment() })).arrayPush(__compactRuntime.StateValue.newMap(
                                                                                                                                                                             new __compactRuntime.StateMap()
                                                                                                                                                                           ))
                                                          .encode() } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(2n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(0n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       'root',
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(2n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(3n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(4n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(5n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(6n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(7n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(8n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newBoundedMerkleTree(
                                                                       new __compactRuntime.StateBoundedMerkleTree(20)
                                                                     )).arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                        alignment: _descriptor_1.alignment() })).arrayPush(__compactRuntime.StateValue.newMap(
                                                                                                                                                                             new __compactRuntime.StateMap()
                                                                                                                                                                           ))
                                                          .encode() } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(2n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(0n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       'root',
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(9n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(10n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(11n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue({ nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n, mt_index: 0n }),
                                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(12n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(false),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(13n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(14n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(issuerKey_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(12n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(false),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _some_0(value_0) { return { is_some: true, value: value_0 }; }
  _none_0() {
    return { is_some: false,
             value:
               { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n } };
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: { bytes: new Uint8Array(32) } };
  }
  _right_0(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _merkleTreePathRoot_0(path_0) {
    return { field:
               this._folder_0((...args_0) =>
                                this._merkleTreePathEntryRoot_0(...args_0),
                              this._degradeToTransient_0(this._persistentHash_3({ domain_sep:
                                                                                    new Uint8Array([109, 100, 110, 58, 108, 104]),
                                                                                  data:
                                                                                    path_0.leaf })),
                              path_0.path) };
  }
  _merkleTreePathEntryRoot_0(recursiveDigest_0, entry_0) {
    const left_0 = entry_0.goes_left ? recursiveDigest_0 : entry_0.sibling.field;
    const right_0 = entry_0.goes_left ?
                    entry_0.sibling.field :
                    recursiveDigest_0;
    return this._transientHash_0([left_0, right_0]);
  }
  _tokenType_0(domain_sep_0, contractAddress_0) {
    return this._persistentCommit_0([domain_sep_0, contractAddress_0.bytes],
                                    new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 100, 101, 114, 105, 118, 101, 95, 116, 111, 107, 101, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  }
  _mintShieldedToken_0(context,
                       partialProofData,
                       domain_sep_0,
                       value_0,
                       nonce_0,
                       recipient_0)
  {
    const coin_0 = { nonce: nonce_0,
                     color:
                       this._tokenType_0(domain_sep_0,
                                         _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 2 } },
                                                                                                     { idx: { cached: true,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_6.toValue(0n),
                                                                                                                                alignment: _descriptor_6.alignment() } }] } },
                                                                                                     { popeq: { cached: true,
                                                                                                                result: undefined } }]).value)),
                     value: value_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(4n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(domain_sep_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(value_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       'neg',
                                       { branch: { skip: 4 } },
                                       { dup: { n: 2 } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: true,
                                                pushPath: false,
                                                path: [ { tag: 'stack' }] } },
                                       'add',
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const cm_0 = this._coinCommitment_0(coin_0, recipient_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(2n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    if (!recipient_0.is_left
        &&
        this._equal_0(recipient_0.right.bytes,
                      _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 2 } },
                                                                                  { idx: { cached: true,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_6.toValue(0n),
                                                                                                             alignment: _descriptor_6.alignment() } }] } },
                                                                                  { popeq: { cached: true,
                                                                                             result: undefined } }]).value).bytes))
    {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_6.toValue(1n),
                                                                    alignment: _descriptor_6.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
    }
    return coin_0;
  }
  _evolveNonce_0(index_0, nonce_0) {
    return this._upgradeFromTransient_0(this._transientHash_1([__compactRuntime.convertBytesToField(28,
                                                                                                    new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
                                                                                                    '<standard library>'),
                                                               index_0,
                                                               this._degradeToTransient_0(nonce_0)]));
  }
  _receiveShielded_0(context, partialProofData, coin_0) {
    const recipient_0 = this._right_0(_descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                 partialProofData,
                                                                                                 [
                                                                                                  { dup: { n: 2 } },
                                                                                                  { idx: { cached: true,
                                                                                                           pushPath: false,
                                                                                                           path: [
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_6.toValue(0n),
                                                                                                                             alignment: _descriptor_6.alignment() } }] } },
                                                                                                  { popeq: { cached: true,
                                                                                                             result: undefined } }]).value));
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const tmp_0 = this._coinCommitment_0(coin_0, recipient_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(1n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    return [];
  }
  _sendShielded_0(context, partialProofData, input_0, recipient_0, value_0) {
    const selfAddr_0 = _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 2 } },
                                                                                   { idx: { cached: true,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_6.toValue(0n),
                                                                                                              alignment: _descriptor_6.alignment() } }] } },
                                                                                   { popeq: { cached: true,
                                                                                              result: undefined } }]).value);
    this._createZswapInput_0(context, partialProofData, input_0);
    const tmp_0 = this._coinNullifier_0(this._downcastQualifiedCoin_0(input_0),
                                        selfAddr_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(0n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    let t_0;
    const change_0 = (t_0 = input_0.value,
                      (__compactRuntime.assert(t_0 >= value_0,
                                               'result of subtraction would be negative'),
                       t_0 - value_0));
    const output_0 = { nonce:
                         this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convertBytesToField(28,
                                                                                                                  new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
                                                                                                                  '<standard library>'),
                                                                             this._degradeToTransient_0(input_0.nonce)])),
                       color: input_0.color,
                       value: value_0 };
    this._createZswapOutput_0(context, partialProofData, output_0, recipient_0);
    const tmp_1 = this._coinCommitment_0(output_0, recipient_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(2n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    if (!recipient_0.is_left
        &&
        this._equal_1(recipient_0.right.bytes, selfAddr_0.bytes))
    {
      const tmp_2 = this._coinCommitment_0(output_0, recipient_0);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_6.toValue(1n),
                                                                    alignment: _descriptor_6.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_2),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
    }
    if (this._equal_2(change_0, 0n)) {
      return { change: this._none_0(), sent: output_0 };
    } else {
      const changeCoin_0 = { nonce:
                               this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convertBytesToField(30,
                                                                                                                        new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101, 47, 50]),
                                                                                                                        '<standard library>'),
                                                                                   this._degradeToTransient_0(input_0.nonce)])),
                             color: input_0.color,
                             value: change_0 };
      this._createZswapOutput_0(context,
                                partialProofData,
                                changeCoin_0,
                                this._right_0(selfAddr_0));
      const cm_0 = this._coinCommitment_0(changeCoin_0,
                                          this._right_0(selfAddr_0));
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_6.toValue(2n),
                                                                    alignment: _descriptor_6.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_6.toValue(1n),
                                                                    alignment: _descriptor_6.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
      return { change: this._some_0(changeCoin_0), sent: output_0 };
    }
  }
  _mergeCoin_0(context, partialProofData, a_0, b_0) {
    const selfAddr_0 = _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 2 } },
                                                                                   { idx: { cached: true,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_6.toValue(0n),
                                                                                                              alignment: _descriptor_6.alignment() } }] } },
                                                                                   { popeq: { cached: true,
                                                                                              result: undefined } }]).value);
    this._createZswapInput_0(context, partialProofData, a_0);
    const tmp_0 = this._coinNullifier_0(this._downcastQualifiedCoin_0(a_0),
                                        selfAddr_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(0n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    this._createZswapInput_0(context, partialProofData, b_0);
    const tmp_1 = this._coinNullifier_0(this._downcastQualifiedCoin_0(b_0),
                                        selfAddr_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(0n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    __compactRuntime.assert(this._equal_3(a_0.color, b_0.color),
                            'Can only merge coins of the same color');
    const newCoin_0 = { nonce:
                          this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convertBytesToField(28,
                                                                                                                   new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
                                                                                                                   '<standard library>'),
                                                                              this._degradeToTransient_0(a_0.nonce)])),
                        color: a_0.color,
                        value:
                          ((t1) => {
                            if (t1 > 340282366920938463463374607431768211455n) {
                              throw new __compactRuntime.CompactError('<standard library>: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                            }
                            return t1;
                          })(a_0.value + b_0.value) };
    this._createZswapOutput_0(context,
                              partialProofData,
                              newCoin_0,
                              this._right_0(selfAddr_0));
    const cm_0 = this._coinCommitment_0(newCoin_0, this._right_0(selfAddr_0));
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(2n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(1n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    return newCoin_0;
  }
  _mergeCoinImmediate_0(context, partialProofData, a_0, b_0) {
    return this._mergeCoin_0(context,
                             partialProofData,
                             a_0,
                             this._upcastQualifiedCoin_0(b_0));
  }
  _downcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce, color: coin_0.color, value: coin_0.value };
  }
  _upcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce,
             color: coin_0.color,
             value: coin_0.value,
             mt_index: 0n };
  }
  _coinCommitment_0(coin_0, recipient_0) {
    return this._persistentHash_4({ domain_sep:
                                      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 99, 91, 118, 49, 93]),
                                    info: coin_0,
                                    dataType: recipient_0.is_left,
                                    data:
                                      recipient_0.is_left ?
                                      recipient_0.left.bytes :
                                      recipient_0.right.bytes });
  }
  _coinNullifier_0(coin_0, addr_0) {
    return this._persistentHash_4({ domain_sep:
                                      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 110, 91, 118, 49, 93]),
                                    info: coin_0,
                                    dataType: false,
                                    data: addr_0.bytes });
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_29, value_0);
    return result_0;
  }
  _transientHash_1(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_28, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_22, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_10, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_27, value_0);
    return result_0;
  }
  _persistentHash_3(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_24, value_0);
    return result_0;
  }
  _persistentHash_4(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_26, value_0);
    return result_0;
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_22,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  _degradeToTransient_0(x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  _upgradeFromTransient_0(x_0) {
    const result_0 = __compactRuntime.upgradeFromTransient(x_0);
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_12.toValue(result_0),
      alignment: _descriptor_12.alignment()
    });
    return result_0;
  }
  _createZswapInput_0(context, partialProofData, coin_0) {
    const result_0 = __compactRuntime.createZswapInput(context, coin_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _createZswapOutput_0(context, partialProofData, coin_0, recipient_0) {
    const result_0 = __compactRuntime.createZswapOutput(context,
                                                        coin_0,
                                                        recipient_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _roleSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.roleSecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('roleSecret',
                                 'return value',
                                 'facevalue.compact line 79 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _fanSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.fanSecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('fanSecret',
                                 'return value',
                                 'facevalue.compact line 80 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _fanPath_0(context, partialProofData, leaf_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.fanPath(witnessContext_0,
                                                                  leaf_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && result_0.leaf.buffer instanceof ArrayBuffer && result_0.leaf.BYTES_PER_ELEMENT === 1 && result_0.leaf.length === 32 && Array.isArray(result_0.path) && result_0.path.length === 20 && result_0.path.every((t) => typeof(t) === 'object' && typeof(t.sibling) === 'object' && typeof(t.sibling.field) === 'bigint' && t.sibling.field >= 0 && t.sibling.field <= __compactRuntime.MAX_FIELD && typeof(t.goes_left) === 'boolean'))) {
      __compactRuntime.typeError('fanPath',
                                 'return value',
                                 'facevalue.compact line 81 char 1',
                                 'struct MerkleTreePath<leaf: Bytes<32>, path: Vector<20, struct MerkleTreePathEntry<sibling: struct MerkleTreeDigest<field: Field>, goes_left: Boolean>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_21.toValue(result_0),
      alignment: _descriptor_21.alignment()
    });
    return result_0;
  }
  _ticketPath_0(context, partialProofData, leaf_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.ticketPath(witnessContext_0,
                                                                     leaf_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && result_0.leaf.buffer instanceof ArrayBuffer && result_0.leaf.BYTES_PER_ELEMENT === 1 && result_0.leaf.length === 32 && Array.isArray(result_0.path) && result_0.path.length === 20 && result_0.path.every((t) => typeof(t) === 'object' && typeof(t.sibling) === 'object' && typeof(t.sibling.field) === 'bigint' && t.sibling.field >= 0 && t.sibling.field <= __compactRuntime.MAX_FIELD && typeof(t.goes_left) === 'boolean'))) {
      __compactRuntime.typeError('ticketPath',
                                 'return value',
                                 'facevalue.compact line 82 char 1',
                                 'struct MerkleTreePath<leaf: Bytes<32>, path: Vector<20, struct MerkleTreePathEntry<sibling: struct MerkleTreeDigest<field: Field>, goes_left: Boolean>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_21.toValue(result_0),
      alignment: _descriptor_21.alignment()
    });
    return result_0;
  }
  _entryContribution_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.entryContribution(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0n && result_0 <= 4294967295n)) {
      __compactRuntime.typeError('entryContribution',
                                 'return value',
                                 'facevalue.compact line 83 char 1',
                                 'Uint<0..4294967296>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_5.toValue(result_0),
      alignment: _descriptor_5.alignment()
    });
    return result_0;
  }
  _entryIndexOf_0(context, partialProofData, showId_0, tag_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.entryIndexOf(witnessContext_0,
                                                                       showId_0,
                                                                       tag_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0n && result_0 <= 4294967295n)) {
      __compactRuntime.typeError('entryIndexOf',
                                 'return value',
                                 'facevalue.compact line 84 char 1',
                                 'Uint<0..4294967296>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_5.toValue(result_0),
      alignment: _descriptor_5.alignment()
    });
    return result_0;
  }
  _divRem_0(context, partialProofData, total_0, n_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.divRem(witnessContext_0,
                                                                 total_0,
                                                                 n_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 2  && typeof(result_0[0]) === 'bigint' && result_0[0] >= 0n && result_0[0] <= 79228162514264337593543950335n && typeof(result_0[1]) === 'bigint' && result_0[1] >= 0n && result_0[1] <= 4294967295n)) {
      __compactRuntime.typeError('divRem',
                                 'return value',
                                 'facevalue.compact line 85 char 1',
                                 '[Uint<0..79228162514264337593543950336>, Uint<0..4294967296>]',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_18.toValue(result_0),
      alignment: _descriptor_18.alignment()
    });
    return result_0;
  }
  _rolePk_0(sk_0) {
    return this._persistentHash_0([new Uint8Array([102, 97, 99, 101, 118, 97, 108, 117, 101, 58, 114, 111, 108, 101, 58, 112, 107, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _fanLeaf_0(fsk_0) {
    return this._persistentHash_0([new Uint8Array([102, 97, 99, 101, 118, 97, 108, 117, 101, 58, 102, 97, 110, 58, 108, 101, 97, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   fsk_0]);
  }
  _entryTag_0(showId_0, fsk_0) {
    return this._persistentHash_2([new Uint8Array([102, 97, 99, 101, 118, 97, 108, 117, 101, 58, 101, 110, 116, 114, 121, 58, 116, 97, 103, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   showId_0,
                                   fsk_0]);
  }
  _entryKey_0(showId_0, index_0) {
    return this._persistentHash_2([new Uint8Array([102, 97, 99, 101, 118, 97, 108, 117, 101, 58, 101, 110, 116, 114, 121, 58, 107, 101, 121, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   showId_0,
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        index_0,
                                                                        'facevalue.compact line 110 char 46')]);
  }
  _slotNullifier_0(showId_0, fsk_0, slot_0) {
    return this._persistentHash_1([new Uint8Array([102, 97, 99, 101, 118, 97, 108, 117, 101, 58, 115, 108, 111, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   showId_0,
                                   fsk_0,
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        slot_0,
                                                                        'facevalue.compact line 116 char 46')]);
  }
  _ticketCommit_0(showId_0, fsk_0, slot_0) {
    return this._persistentHash_1([new Uint8Array([102, 97, 99, 101, 118, 97, 108, 117, 101, 58, 116, 105, 99, 107, 101, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   showId_0,
                                   fsk_0,
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        slot_0,
                                                                        'facevalue.compact line 122 char 48')]);
  }
  _ticketNullifier_0(showId_0, fsk_0, slot_0) {
    return this._persistentHash_1([new Uint8Array([102, 97, 99, 101, 118, 97, 108, 117, 101, 58, 115, 112, 101, 110, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   showId_0,
                                   fsk_0,
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        slot_0,
                                                                        'facevalue.compact line 128 char 47')]);
  }
  _seedCommitment_0(seed_0, salt_0) {
    return this._persistentHash_2([new Uint8Array([102, 97, 99, 101, 118, 97, 108, 117, 101, 58, 115, 101, 101, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   __compactRuntime.convertFieldToBytes(32,
                                                                        seed_0,
                                                                        'facevalue.compact line 134 char 33'),
                                   salt_0]);
  }
  _windowPosition_0(index_0, offset_0, n_0) {
    if (index_0 >= offset_0) {
      __compactRuntime.assert(index_0 >= offset_0,
                              'result of subtraction would be negative');
      return index_0 - offset_0;
    } else {
      let t_0;
      return ((t1) => {
               if (t1 > 4294967295n) {
                 throw new __compactRuntime.CompactError('facevalue.compact line 143 char 7: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
               }
               return t1;
             })((t_0 = index_0 + n_0,
                 (__compactRuntime.assert(t_0 >= offset_0,
                                          'result of subtraction would be negative'),
                  t_0 - offset_0)));
    }
  }
  _requireRole_0(context, partialProofData, expected_0) {
    __compactRuntime.assert(this._equal_4(this._rolePk_0(this._roleSecret_0(context,
                                                                            partialProofData)),
                                          expected_0),
                            'not authorized');
    return [];
  }
  _requireShow_0(context, partialProofData, id_0) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_6.toValue(3n),
                                                                                                                  alignment: _descriptor_6.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'no such show');
    return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_6.toValue(3n),
                                                                                                 alignment: _descriptor_6.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_0.toValue(id_0),
                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  _proveFan_0(context, partialProofData, fsk_0) {
    const leaf_0 = this._fanLeaf_0(fsk_0);
    const path_0 = this._fanPath_0(context, partialProofData, leaf_0);
    __compactRuntime.assert(this._equal_5(path_0.leaf, leaf_0),
                            'registry path does not match this fan');
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._merkleTreePathRoot_0(path_0),
                             _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_6.toValue(1n),
                                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_6.toValue(2n),
                                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_16.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'not a verified fan');
    return [];
  }
  _spendTicket_0(context, partialProofData, id_0, fsk_0, slot_0) {
    const tc_0 = this._ticketCommit_0(id_0, fsk_0, slot_0);
    const path_0 = this._ticketPath_0(context, partialProofData, tc_0);
    __compactRuntime.assert(this._equal_6(path_0.leaf, tc_0),
                            'ticket path does not match');
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._merkleTreePathRoot_0(path_0),
                             _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_6.toValue(8n),
                                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_6.toValue(2n),
                                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_16.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'no such ticket');
    const tn_0 = this._ticketNullifier_0(id_0, fsk_0, slot_0);
    __compactRuntime.assert(!_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_6.toValue(9n),
                                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tn_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'ticket already returned or used');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(9n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tn_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _mintTicket_0(context, partialProofData, id_0, s_0, fsk_0, slot_0) {
    __compactRuntime.assert(slot_0 < s_0.perFanCap, 'per-fan ticket cap reached');
    const sn_0 = this._slotNullifier_0(id_0, fsk_0, slot_0);
    __compactRuntime.assert(!_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_6.toValue(7n),
                                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(sn_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'slot already used');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(7n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(sn_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = this._ticketCommit_0(id_0, fsk_0, slot_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(8n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(0n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(1n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.leafHash(
                                                                                              { value: _descriptor_0.toValue(tmp_0),
                                                                                                alignment: _descriptor_0.alignment() }
                                                                                            )).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(1n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { addi: { immediate: 1 } },
                                       { ins: { cached: true, n: 1 } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(2n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(0n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       'root',
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _tkrwDomain_0() {
    return new Uint8Array([102, 97, 99, 101, 118, 97, 108, 117, 101, 58, 116, 75, 82, 87, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  _tkrwColor_0(context, partialProofData) {
    return this._tokenType_0(this._tkrwDomain_0(),
                             _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                        partialProofData,
                                                                                        [
                                                                                         { dup: { n: 2 } },
                                                                                         { idx: { cached: true,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_6.toValue(0n),
                                                                                                                    alignment: _descriptor_6.alignment() } }] } },
                                                                                         { popeq: { cached: true,
                                                                                                    result: undefined } }]).value));
  }
  _takePayment_0(context, partialProofData, coin_0, amount_0) {
    const c_0 = coin_0;
    __compactRuntime.assert(this._equal_7(c_0.color,
                                          this._tkrwColor_0(context,
                                                            partialProofData)),
                            'pay in tKRW');
    __compactRuntime.assert(this._equal_8(c_0.value, amount_0),
                            'pay exactly face value');
    this._receiveShielded_0(context, partialProofData, c_0);
    if (_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_6.toValue(12n),
                                                                                              alignment: _descriptor_6.alignment() } }] } },
                                                                   { popeq: { cached: false,
                                                                              result: undefined } }]).value))
    {
      const tmp_0 = this._mergeCoinImmediate_0(context,
                                               partialProofData,
                                               _descriptor_11.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                          partialProofData,
                                                                                                          [
                                                                                                           { dup: { n: 0 } },
                                                                                                           { idx: { cached: false,
                                                                                                                    pushPath: false,
                                                                                                                    path: [
                                                                                                                           { tag: 'value',
                                                                                                                             value: { value: _descriptor_6.toValue(11n),
                                                                                                                                      alignment: _descriptor_6.alignment() } }] } },
                                                                                                           { popeq: { cached: false,
                                                                                                                      result: undefined } }]).value),
                                               c_0);
      const tmp_1 = this._right_0(_descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 2 } },
                                                                                              { idx: { cached: true,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_6.toValue(0n),
                                                                                                                         alignment: _descriptor_6.alignment() } }] } },
                                                                                              { popeq: { cached: true,
                                                                                                         result: undefined } }]).value));
      __compactRuntime.hasCoinCommitment(context, tmp_0, tmp_1) ? __compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(11n),
                                                                                                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                                                                                                     { dup: { n: 3 } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell(__compactRuntime.runtimeCoinCommitment(
                                                                                                                                                            { value: _descriptor_4.toValue(tmp_0),
                                                                                                                                                              alignment: _descriptor_4.alignment() },
                                                                                                                                                            { value: _descriptor_14.toValue(tmp_1),
                                                                                                                                                              alignment: _descriptor_14.alignment() }
                                                                                                                                                          )).encode() } },
                                                                                                     { idx: { cached: true,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_6.toValue(1n),
                                                                                                                                alignment: _descriptor_6.alignment() } },
                                                                                                                     { tag: 'stack' }] } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                                                                                                     { swap: { n: 0 } },
                                                                                                     { concat: { cached: true,
                                                                                                                 n: 91 } },
                                                                                                     { ins: { cached: false,
                                                                                                              n: 1 } }]) : (() => { throw new __compactRuntime.CompactError(`facevalue.compact line 211 char 5: Coin commitment not found. Check the coin has been received (or call 'createZswapOutput')`); })();
    } else {
      const tmp_2 = this._right_0(_descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 2 } },
                                                                                              { idx: { cached: true,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_6.toValue(0n),
                                                                                                                         alignment: _descriptor_6.alignment() } }] } },
                                                                                              { popeq: { cached: true,
                                                                                                         result: undefined } }]).value));
      __compactRuntime.hasCoinCommitment(context, c_0, tmp_2) ? __compactRuntime.queryLedgerState(context,
                                                                                                  partialProofData,
                                                                                                  [
                                                                                                   { push: { storage: false,
                                                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(11n),
                                                                                                                                                          alignment: _descriptor_6.alignment() }).encode() } },
                                                                                                   { dup: { n: 3 } },
                                                                                                   { push: { storage: false,
                                                                                                             value: __compactRuntime.StateValue.newCell(__compactRuntime.runtimeCoinCommitment(
                                                                                                                                                          { value: _descriptor_4.toValue(c_0),
                                                                                                                                                            alignment: _descriptor_4.alignment() },
                                                                                                                                                          { value: _descriptor_14.toValue(tmp_2),
                                                                                                                                                            alignment: _descriptor_14.alignment() }
                                                                                                                                                        )).encode() } },
                                                                                                   { idx: { cached: true,
                                                                                                            pushPath: false,
                                                                                                            path: [
                                                                                                                   { tag: 'value',
                                                                                                                     value: { value: _descriptor_6.toValue(1n),
                                                                                                                              alignment: _descriptor_6.alignment() } },
                                                                                                                   { tag: 'stack' }] } },
                                                                                                   { push: { storage: false,
                                                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(c_0),
                                                                                                                                                          alignment: _descriptor_4.alignment() }).encode() } },
                                                                                                   { swap: { n: 0 } },
                                                                                                   { concat: { cached: true,
                                                                                                               n: 91 } },
                                                                                                   { ins: { cached: false,
                                                                                                            n: 1 } }]) : (() => { throw new __compactRuntime.CompactError(`facevalue.compact line 216 char 5: Coin commitment not found. Check the coin has been received (or call 'createZswapOutput')`); })();
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(12n),
                                                                                                alignment: _descriptor_6.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(true),
                                                                                                alignment: _descriptor_9.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } }]);
    }
    return [];
  }
  _payOut_0(context, partialProofData, amount_0) {
    __compactRuntime.assert(_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_6.toValue(12n),
                                                                                                                  alignment: _descriptor_6.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value),
                            'treasury empty');
    const res_0 = this._sendShielded_0(context,
                                       partialProofData,
                                       _descriptor_11.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                  partialProofData,
                                                                                                  [
                                                                                                   { dup: { n: 0 } },
                                                                                                   { idx: { cached: false,
                                                                                                            pushPath: false,
                                                                                                            path: [
                                                                                                                   { tag: 'value',
                                                                                                                     value: { value: _descriptor_6.toValue(11n),
                                                                                                                              alignment: _descriptor_6.alignment() } }] } },
                                                                                                   { popeq: { cached: false,
                                                                                                              result: undefined } }]).value),
                                       this._left_0(this._ownPublicKey_0(context,
                                                                         partialProofData)),
                                       amount_0);
    if (res_0.change.is_some) {
      const tmp_0 = res_0.change.value;
      const tmp_1 = this._right_0(_descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 2 } },
                                                                                              { idx: { cached: true,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_6.toValue(0n),
                                                                                                                         alignment: _descriptor_6.alignment() } }] } },
                                                                                              { popeq: { cached: true,
                                                                                                         result: undefined } }]).value));
      __compactRuntime.hasCoinCommitment(context, tmp_0, tmp_1) ? __compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(11n),
                                                                                                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                                                                                                     { dup: { n: 3 } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell(__compactRuntime.runtimeCoinCommitment(
                                                                                                                                                            { value: _descriptor_4.toValue(tmp_0),
                                                                                                                                                              alignment: _descriptor_4.alignment() },
                                                                                                                                                            { value: _descriptor_14.toValue(tmp_1),
                                                                                                                                                              alignment: _descriptor_14.alignment() }
                                                                                                                                                          )).encode() } },
                                                                                                     { idx: { cached: true,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_6.toValue(1n),
                                                                                                                                alignment: _descriptor_6.alignment() } },
                                                                                                                     { tag: 'stack' }] } },
                                                                                                     { push: { storage: false,
                                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                                                                                                     { swap: { n: 0 } },
                                                                                                     { concat: { cached: true,
                                                                                                                 n: 91 } },
                                                                                                     { ins: { cached: false,
                                                                                                              n: 1 } }]) : (() => { throw new __compactRuntime.CompactError(`facevalue.compact line 230 char 5: Coin commitment not found. Check the coin has been received (or call 'createZswapOutput')`); })();
    } else {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(12n),
                                                                                                alignment: _descriptor_6.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(false),
                                                                                                alignment: _descriptor_9.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } }]);
    }
    return [];
  }
  _enroll_0(context, partialProofData, leaf_0) {
    this._requireRole_0(context,
                        partialProofData,
                        _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_6.toValue(0n),
                                                                                                              alignment: _descriptor_6.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value));
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(1n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(0n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(1n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.leafHash(
                                                                                              { value: _descriptor_0.toValue(leaf_0),
                                                                                                alignment: _descriptor_0.alignment() }
                                                                                            )).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(1n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { addi: { immediate: 1 } },
                                       { ins: { cached: true, n: 1 } },
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(2n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: false,
                                                pushPath: false,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(0n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       'root',
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(2n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_2.toValue(tmp_0),
                                                                alignment: _descriptor_2.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _enrollBatch_0(context, partialProofData, leaves_0) {
    this._requireRole_0(context,
                        partialProofData,
                        _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_6.toValue(0n),
                                                                                                              alignment: _descriptor_6.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value));
    this._folder_1(context,
                   partialProofData,
                   ((context, partialProofData, t_0, l_0) =>
                    {
                      if (!this._equal_9(l_0, new Uint8Array(32))) {
                        __compactRuntime.queryLedgerState(context,
                                                          partialProofData,
                                                          [
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_6.toValue(1n),
                                                                                      alignment: _descriptor_6.alignment() } }] } },
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_6.toValue(0n),
                                                                                      alignment: _descriptor_6.alignment() } }] } },
                                                           { dup: { n: 2 } },
                                                           { idx: { cached: false,
                                                                    pushPath: false,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_6.toValue(1n),
                                                                                      alignment: _descriptor_6.alignment() } }] } },
                                                           { push: { storage: true,
                                                                     value: __compactRuntime.StateValue.newCell(__compactRuntime.leafHash(
                                                                                                                  { value: _descriptor_0.toValue(l_0),
                                                                                                                    alignment: _descriptor_0.alignment() }
                                                                                                                )).encode() } },
                                                           { ins: { cached: false,
                                                                    n: 1 } },
                                                           { ins: { cached: true,
                                                                    n: 1 } },
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_6.toValue(1n),
                                                                                      alignment: _descriptor_6.alignment() } }] } },
                                                           { addi: { immediate: 1 } },
                                                           { ins: { cached: true,
                                                                    n: 1 } },
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_6.toValue(2n),
                                                                                      alignment: _descriptor_6.alignment() } }] } },
                                                           { dup: { n: 2 } },
                                                           { idx: { cached: false,
                                                                    pushPath: false,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_6.toValue(0n),
                                                                                      alignment: _descriptor_6.alignment() } }] } },
                                                           'root',
                                                           { push: { storage: true,
                                                                     value: __compactRuntime.StateValue.newNull().encode() } },
                                                           { ins: { cached: false,
                                                                    n: 1 } },
                                                           { ins: { cached: true,
                                                                    n: 2 } }]);
                        const tmp_0 = 1n;
                        __compactRuntime.queryLedgerState(context,
                                                          partialProofData,
                                                          [
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_6.toValue(2n),
                                                                                      alignment: _descriptor_6.alignment() } }] } },
                                                           { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                                                  { value: _descriptor_2.toValue(tmp_0),
                                                                                    alignment: _descriptor_2.alignment() }
                                                                                    .value
                                                                                )) } },
                                                           { ins: { cached: true,
                                                                    n: 1 } }]);
                      }
                      return t_0;
                    }),
                   [],
                   leaves_0);
    return [];
  }
  _createShow_0(context,
                partialProofData,
                showId_0,
                faceValue_0,
                capacity_0,
                perFanCap_0,
                seedCommit_0,
                beaconRound_0)
  {
    const id_0 = showId_0;
    __compactRuntime.assert(!_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_6.toValue(3n),
                                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'show already exists');
    __compactRuntime.assert(capacity_0 > 0n, 'capacity must be positive');
    __compactRuntime.assert(perFanCap_0 > 0n, 'per-fan cap must be positive');
    const tmp_0 = { organizer:
                      this._rolePk_0(this._roleSecret_0(context,
                                                        partialProofData)),
                    faceValue: faceValue_0,
                    capacity: capacity_0,
                    perFanCap: perFanCap_0,
                    phase: 0,
                    seedCommit: seedCommit_0,
                    beaconRound: beaconRound_0,
                    beacon: 0n,
                    seed: 0n,
                    entropy: 0n,
                    entries: 0n,
                    offset: 0n,
                    issued: 0n,
                    pool: 0n,
                    returned: 0n,
                    checkedIn: 0n,
                    revenue: 0n };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(3n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _closeEntries_0(context, partialProofData, showId_0) {
    const id_0 = showId_0;
    const s_0 = this._requireShow_0(context, partialProofData, id_0);
    this._requireRole_0(context, partialProofData, s_0.organizer);
    __compactRuntime.assert(s_0.phase === 0, 'entries are not open');
    const tmp_0 = { organizer: s_0.organizer,
                    faceValue: s_0.faceValue,
                    capacity: s_0.capacity,
                    perFanCap: s_0.perFanCap,
                    phase: 1,
                    seedCommit: s_0.seedCommit,
                    beaconRound: s_0.beaconRound,
                    beacon: s_0.beacon,
                    seed: s_0.seed,
                    entropy: s_0.entropy,
                    entries: s_0.entries,
                    offset: s_0.offset,
                    issued: s_0.issued,
                    pool: s_0.pool,
                    returned: s_0.returned,
                    checkedIn: s_0.checkedIn,
                    revenue: s_0.revenue };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(3n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _revealDraw_0(context, partialProofData, showId_0, seed_0, salt_0, beacon_0) {
    const id_0 = showId_0;
    const s_0 = this._requireShow_0(context, partialProofData, id_0);
    this._requireRole_0(context, partialProofData, s_0.organizer);
    __compactRuntime.assert(s_0.phase === 1, 'close entries before the draw');
    const sd_0 = seed_0;
    __compactRuntime.assert(this._equal_10(this._seedCommitment_0(sd_0, salt_0),
                                           s_0.seedCommit),
                            'seed does not match its commitment');
    const b_0 = beacon_0;
    const total_0 = ((t1) => {
                      if (t1 > 79228162514264337593543950335n) {
                        throw new __compactRuntime.CompactError('facevalue.compact line 313 char 17: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 79228162514264337593543950335');
                      }
                      return t1;
                    })(sd_0 + s_0.entropy + b_0);
    const n_0 = this._equal_11(s_0.entries, 0n) ? 1n : s_0.entries;
    const qr_0 = this._divRem_0(context, partialProofData, total_0, n_0);
    const q_0 = qr_0[0];
    const r_0 = qr_0[1];
    __compactRuntime.assert(this._equal_12(q_0 * n_0 + r_0, total_0),
                            'bad division');
    __compactRuntime.assert(r_0 < n_0, 'bad remainder');
    const tmp_0 = { organizer: s_0.organizer,
                    faceValue: s_0.faceValue,
                    capacity: s_0.capacity,
                    perFanCap: s_0.perFanCap,
                    phase: 2,
                    seedCommit: s_0.seedCommit,
                    beaconRound: s_0.beaconRound,
                    beacon: b_0,
                    seed: sd_0,
                    entropy: s_0.entropy,
                    entries: s_0.entries,
                    offset: r_0,
                    issued: s_0.issued,
                    pool: s_0.pool,
                    returned: s_0.returned,
                    checkedIn: s_0.checkedIn,
                    revenue: s_0.revenue };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(3n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _openSale_0(context, partialProofData, showId_0) {
    const id_0 = showId_0;
    const s_0 = this._requireShow_0(context, partialProofData, id_0);
    this._requireRole_0(context, partialProofData, s_0.organizer);
    __compactRuntime.assert(s_0.phase === 2, 'draw has not happened');
    let t_0, t_1;
    const unclaimed_0 = (t_0 = s_0.capacity,
                         (t_1 = s_0.issued,
                          (__compactRuntime.assert(t_0 >= t_1,
                                                   'result of subtraction would be negative'),
                           t_0 - t_1)));
    const tmp_0 = { organizer: s_0.organizer,
                    faceValue: s_0.faceValue,
                    capacity: s_0.capacity,
                    perFanCap: s_0.perFanCap,
                    phase: 3,
                    seedCommit: s_0.seedCommit,
                    beaconRound: s_0.beaconRound,
                    beacon: s_0.beacon,
                    seed: s_0.seed,
                    entropy: s_0.entropy,
                    entries: s_0.entries,
                    offset: s_0.offset,
                    issued: s_0.issued,
                    pool:
                      ((t1) => {
                        if (t1 > 4294967295n) {
                          throw new __compactRuntime.CompactError('facevalue.compact line 330 char 58: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                        }
                        return t1;
                      })(s_0.pool + unclaimed_0),
                    returned: s_0.returned,
                    checkedIn: s_0.checkedIn,
                    revenue: s_0.revenue };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(3n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _closeShow_0(context, partialProofData, showId_0) {
    const id_0 = showId_0;
    const s_0 = this._requireShow_0(context, partialProofData, id_0);
    this._requireRole_0(context, partialProofData, s_0.organizer);
    __compactRuntime.assert(s_0.phase !== 4, 'already closed');
    const tmp_0 = { organizer: s_0.organizer,
                    faceValue: s_0.faceValue,
                    capacity: s_0.capacity,
                    perFanCap: s_0.perFanCap,
                    phase: 4,
                    seedCommit: s_0.seedCommit,
                    beaconRound: s_0.beaconRound,
                    beacon: s_0.beacon,
                    seed: s_0.seed,
                    entropy: s_0.entropy,
                    entries: s_0.entries,
                    offset: s_0.offset,
                    issued: s_0.issued,
                    pool: s_0.pool,
                    returned: s_0.returned,
                    checkedIn: s_0.checkedIn,
                    revenue: s_0.revenue };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(3n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _withdraw_0(context, partialProofData, showId_0) {
    const id_0 = showId_0;
    const s_0 = this._requireShow_0(context, partialProofData, id_0);
    this._requireRole_0(context, partialProofData, s_0.organizer);
    __compactRuntime.assert(s_0.phase === 4, 'close the show first');
    let t_0;
    __compactRuntime.assert((t_0 = s_0.revenue, t_0 > 0n), 'nothing to withdraw');
    this._payOut_0(context, partialProofData, s_0.revenue);
    const tmp_0 = { organizer: s_0.organizer,
                    faceValue: s_0.faceValue,
                    capacity: s_0.capacity,
                    perFanCap: s_0.perFanCap,
                    phase: s_0.phase,
                    seedCommit: s_0.seedCommit,
                    beaconRound: s_0.beaconRound,
                    beacon: s_0.beacon,
                    seed: s_0.seed,
                    entropy: s_0.entropy,
                    entries: s_0.entries,
                    offset: s_0.offset,
                    issued: s_0.issued,
                    pool: s_0.pool,
                    returned: s_0.returned,
                    checkedIn: s_0.checkedIn,
                    revenue: 0n };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(3n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _enterDraw_0(context, partialProofData, showId_0) {
    const id_0 = showId_0;
    const s_0 = this._requireShow_0(context, partialProofData, id_0);
    __compactRuntime.assert(s_0.phase === 0, 'draw entries are closed');
    const fsk_0 = this._fanSecret_0(context, partialProofData);
    this._proveFan_0(context, partialProofData, fsk_0);
    const tag_0 = this._entryTag_0(id_0, fsk_0);
    __compactRuntime.assert(!_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_6.toValue(4n),
                                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tag_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'one entry per verified fan');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(4n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tag_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = this._entryKey_0(id_0, s_0.entries);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(5n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tag_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const r_0 = this._entryContribution_0(context, partialProofData);
    const tmp_1 = { organizer: s_0.organizer,
                    faceValue: s_0.faceValue,
                    capacity: s_0.capacity,
                    perFanCap: s_0.perFanCap,
                    phase: s_0.phase,
                    seedCommit: s_0.seedCommit,
                    beaconRound: s_0.beaconRound,
                    beacon: s_0.beacon,
                    seed: s_0.seed,
                    entropy:
                      ((t1) => {
                        if (t1 > 18446744073709551615n) {
                          throw new __compactRuntime.CompactError('facevalue.compact line 371 char 14: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                        }
                        return t1;
                      })(s_0.entropy + r_0),
                    entries:
                      ((t1) => {
                        if (t1 > 4294967295n) {
                          throw new __compactRuntime.CompactError('facevalue.compact line 370 char 14: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                        }
                        return t1;
                      })(s_0.entries + 1n),
                    offset: s_0.offset,
                    issued: s_0.issued,
                    pool: s_0.pool,
                    returned: s_0.returned,
                    checkedIn: s_0.checkedIn,
                    revenue: s_0.revenue };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(3n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_1),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _claimTicket_0(context, partialProofData, showId_0, slot_0, coin_0) {
    const id_0 = showId_0;
    const s_0 = this._requireShow_0(context, partialProofData, id_0);
    __compactRuntime.assert(s_0.phase === 2, 'not in the claim window');
    const fsk_0 = this._fanSecret_0(context, partialProofData);
    const tag_0 = this._entryTag_0(id_0, fsk_0);
    __compactRuntime.assert(!_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_6.toValue(6n),
                                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tag_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'seat already claimed');
    const idx_0 = this._entryIndexOf_0(context, partialProofData, id_0, tag_0);
    __compactRuntime.assert(idx_0 < s_0.entries, 'no such entry');
    let tmp_0;
    __compactRuntime.assert(this._equal_13((tmp_0 = this._entryKey_0(id_0, idx_0),
                                            _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                      partialProofData,
                                                                                                      [
                                                                                                       { dup: { n: 0 } },
                                                                                                       { idx: { cached: false,
                                                                                                                pushPath: false,
                                                                                                                path: [
                                                                                                                       { tag: 'value',
                                                                                                                         value: { value: _descriptor_6.toValue(5n),
                                                                                                                                  alignment: _descriptor_6.alignment() } }] } },
                                                                                                       { idx: { cached: false,
                                                                                                                pushPath: false,
                                                                                                                path: [
                                                                                                                       { tag: 'value',
                                                                                                                         value: { value: _descriptor_0.toValue(tmp_0),
                                                                                                                                  alignment: _descriptor_0.alignment() } }] } },
                                                                                                       { popeq: { cached: false,
                                                                                                                  result: undefined } }]).value)),
                                           tag_0),
                            'entry does not belong to this fan');
    let t_0;
    __compactRuntime.assert((t_0 = this._windowPosition_0(idx_0,
                                                          s_0.offset,
                                                          s_0.entries),
                             t_0 < s_0.capacity),
                            'not drawn');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(6n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tag_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    this._mintTicket_0(context, partialProofData, id_0, s_0, fsk_0, slot_0);
    this._takePayment_0(context, partialProofData, coin_0, s_0.faceValue);
    const tmp_1 = { organizer: s_0.organizer,
                    faceValue: s_0.faceValue,
                    capacity: s_0.capacity,
                    perFanCap: s_0.perFanCap,
                    phase: s_0.phase,
                    seedCommit: s_0.seedCommit,
                    beaconRound: s_0.beaconRound,
                    beacon: s_0.beacon,
                    seed: s_0.seed,
                    entropy: s_0.entropy,
                    entries: s_0.entries,
                    offset: s_0.offset,
                    issued:
                      ((t1) => {
                        if (t1 > 4294967295n) {
                          throw new __compactRuntime.CompactError('facevalue.compact line 391 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                        }
                        return t1;
                      })(s_0.issued + 1n),
                    pool: s_0.pool,
                    returned: s_0.returned,
                    checkedIn: s_0.checkedIn,
                    revenue:
                      ((t1) => {
                        if (t1 > 340282366920938463463374607431768211455n) {
                          throw new __compactRuntime.CompactError('facevalue.compact line 392 char 14: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                        }
                        return t1;
                      })(s_0.revenue + s_0.faceValue) };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(3n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_1),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _buyFromPool_0(context, partialProofData, showId_0, slot_0, coin_0) {
    const id_0 = showId_0;
    const s_0 = this._requireShow_0(context, partialProofData, id_0);
    __compactRuntime.assert(s_0.phase === 3, 'pool is not open');
    let t_0;
    __compactRuntime.assert((t_0 = s_0.pool, t_0 > 0n), 'no seats in the pool');
    const fsk_0 = this._fanSecret_0(context, partialProofData);
    this._proveFan_0(context, partialProofData, fsk_0);
    this._mintTicket_0(context, partialProofData, id_0, s_0, fsk_0, slot_0);
    this._takePayment_0(context, partialProofData, coin_0, s_0.faceValue);
    let t_1;
    const tmp_0 = { organizer: s_0.organizer,
                    faceValue: s_0.faceValue,
                    capacity: s_0.capacity,
                    perFanCap: s_0.perFanCap,
                    phase: s_0.phase,
                    seedCommit: s_0.seedCommit,
                    beaconRound: s_0.beaconRound,
                    beacon: s_0.beacon,
                    seed: s_0.seed,
                    entropy: s_0.entropy,
                    entries: s_0.entries,
                    offset: s_0.offset,
                    issued:
                      ((t1) => {
                        if (t1 > 4294967295n) {
                          throw new __compactRuntime.CompactError('facevalue.compact line 408 char 13: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                        }
                        return t1;
                      })(s_0.issued + 1n),
                    pool:
                      (t_1 = s_0.pool,
                       (__compactRuntime.assert(t_1 >= 1n,
                                                'result of subtraction would be negative'),
                        t_1 - 1n)),
                    returned: s_0.returned,
                    checkedIn: s_0.checkedIn,
                    revenue:
                      ((t1) => {
                        if (t1 > 340282366920938463463374607431768211455n) {
                          throw new __compactRuntime.CompactError('facevalue.compact line 409 char 14: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                        }
                        return t1;
                      })(s_0.revenue + s_0.faceValue) };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(3n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _returnTicket_0(context, partialProofData, showId_0, slot_0) {
    const id_0 = showId_0;
    const s_0 = this._requireShow_0(context, partialProofData, id_0);
    __compactRuntime.assert(s_0.phase === 2 || s_0.phase === 3,
                            'returns are closed');
    const fsk_0 = this._fanSecret_0(context, partialProofData);
    this._spendTicket_0(context, partialProofData, id_0, fsk_0, slot_0);
    this._payOut_0(context, partialProofData, s_0.faceValue);
    let t_0, t_1;
    const tmp_0 = { organizer: s_0.organizer,
                    faceValue: s_0.faceValue,
                    capacity: s_0.capacity,
                    perFanCap: s_0.perFanCap,
                    phase: s_0.phase,
                    seedCommit: s_0.seedCommit,
                    beaconRound: s_0.beaconRound,
                    beacon: s_0.beacon,
                    seed: s_0.seed,
                    entropy: s_0.entropy,
                    entries: s_0.entries,
                    offset: s_0.offset,
                    issued: s_0.issued,
                    pool:
                      ((t1) => {
                        if (t1 > 4294967295n) {
                          throw new __compactRuntime.CompactError('facevalue.compact line 423 char 11: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                        }
                        return t1;
                      })(s_0.pool + 1n),
                    returned:
                      ((t1) => {
                        if (t1 > 4294967295n) {
                          throw new __compactRuntime.CompactError('facevalue.compact line 424 char 15: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                        }
                        return t1;
                      })(s_0.returned + 1n),
                    checkedIn: s_0.checkedIn,
                    revenue:
                      (t_0 = s_0.revenue,
                       (t_1 = s_0.faceValue,
                        (__compactRuntime.assert(t_0 >= t_1,
                                                 'result of subtraction would be negative'),
                         t_0 - t_1))) };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(3n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _checkIn_0(context, partialProofData, showId_0, slot_0, passKey_0) {
    const id_0 = showId_0;
    const s_0 = this._requireShow_0(context, partialProofData, id_0);
    __compactRuntime.assert(s_0.phase === 2 || s_0.phase === 3,
                            'check-in is closed');
    const fsk_0 = this._fanSecret_0(context, partialProofData);
    this._spendTicket_0(context, partialProofData, id_0, fsk_0, slot_0);
    const pk_0 = passKey_0;
    __compactRuntime.assert(!_descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_6.toValue(10n),
                                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(pk_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'gate-pass key already registered');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(10n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(pk_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { organizer: s_0.organizer,
                    faceValue: s_0.faceValue,
                    capacity: s_0.capacity,
                    perFanCap: s_0.perFanCap,
                    phase: s_0.phase,
                    seedCommit: s_0.seedCommit,
                    beaconRound: s_0.beaconRound,
                    beacon: s_0.beacon,
                    seed: s_0.seed,
                    entropy: s_0.entropy,
                    entries: s_0.entries,
                    offset: s_0.offset,
                    issued: s_0.issued,
                    pool: s_0.pool,
                    returned: s_0.returned,
                    checkedIn:
                      ((t1) => {
                        if (t1 > 4294967295n) {
                          throw new __compactRuntime.CompactError('facevalue.compact line 441 char 44: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                        }
                        return t1;
                      })(s_0.checkedIn + 1n),
                    revenue: s_0.revenue };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(3n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _faucet_0(context, partialProofData, amount_0) {
    __compactRuntime.assert(amount_0 <= 10000000n,
                            'faucet limit is 10,000,000 tKRW');
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_6.toValue(13n),
                                                                  alignment: _descriptor_6.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_2.toValue(tmp_0),
                                                                alignment: _descriptor_2.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = this._evolveNonce_0(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                partialProofData,
                                                                                                [
                                                                                                 { dup: { n: 0 } },
                                                                                                 { idx: { cached: false,
                                                                                                          pushPath: false,
                                                                                                          path: [
                                                                                                                 { tag: 'value',
                                                                                                                   value: { value: _descriptor_6.toValue(13n),
                                                                                                                            alignment: _descriptor_6.alignment() } }] } },
                                                                                                 { popeq: { cached: true,
                                                                                                            result: undefined } }]).value),
                                      _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                partialProofData,
                                                                                                [
                                                                                                 { dup: { n: 0 } },
                                                                                                 { idx: { cached: false,
                                                                                                          pushPath: false,
                                                                                                          path: [
                                                                                                                 { tag: 'value',
                                                                                                                   value: { value: _descriptor_6.toValue(14n),
                                                                                                                            alignment: _descriptor_6.alignment() } }] } },
                                                                                                 { popeq: { cached: false,
                                                                                                            result: undefined } }]).value));
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(14n),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return this._mintShieldedToken_0(context,
                                     partialProofData,
                                     this._tkrwDomain_0(),
                                     amount_0,
                                     _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                               partialProofData,
                                                                                               [
                                                                                                { dup: { n: 0 } },
                                                                                                { idx: { cached: false,
                                                                                                         pushPath: false,
                                                                                                         path: [
                                                                                                                { tag: 'value',
                                                                                                                  value: { value: _descriptor_6.toValue(14n),
                                                                                                                           alignment: _descriptor_6.alignment() } }] } },
                                                                                                { popeq: { cached: false,
                                                                                                           result: undefined } }]).value),
                                     this._left_0(this._ownPublicKey_0(context,
                                                                       partialProofData)));
  }
  _folder_0(f, x, a0) {
    for (let i = 0; i < 20; i++) { x = f(x, a0[i]); }
    return x;
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_1(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 4; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_10(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_11(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_12(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_13(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get issuer() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_6.toValue(0n),
                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    fans: {
      isFull(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isFull: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(1n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(1n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(1048576n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'lt',
                                                                          'neg',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      checkRoot(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`checkRoot: expected 1 argument, received ${args_0.length}`);
        }
        const rt_0 = args_0[0];
        if (!(typeof(rt_0) === 'object' && typeof(rt_0.field) === 'bigint' && rt_0.field >= 0 && rt_0.field <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('checkRoot',
                                     'argument 1',
                                     'facevalue.compact line 56 char 1',
                                     'struct MerkleTreeDigest<field: Field>',
                                     rt_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(1n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(2n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(rt_0),
                                                                                                                                 alignment: _descriptor_16.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      root(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`root: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return ((result) => result             ? __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(result)             : undefined)(self_0.asArray()[0].asBoundedMerkleTree().rehash().root()?.value);
      },
      firstFree(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`first_free: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return __compactRuntime.CompactTypeField.fromValue(self_0.asArray()[1].asCell().value);
      },
      pathForLeaf(...args_0) {
        if (args_0.length !== 2) {
          throw new __compactRuntime.CompactError(`path_for_leaf: expected 2 arguments, received ${args_0.length}`);
        }
        const index_0 = args_0[0];
        const leaf_0 = args_0[1];
        if (!(typeof(index_0) === 'bigint' && index_0 >= 0 && index_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 1',
                                     'facevalue.compact line 56 char 1',
                                     'Field',
                                     index_0)
        }
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 2',
                                     'facevalue.compact line 56 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[1];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(20, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().pathForLeaf(    index_0,    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
      },
      findPathForLeaf(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`find_path_for_leaf: expected 1 argument, received ${args_0.length}`);
        }
        const leaf_0 = args_0[0];
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('find_path_for_leaf',
                                     'argument 1',
                                     'facevalue.compact line 56 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[1];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(20, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().findPathForLeaf(    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
      },
      history(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`history: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return self_0.asArray()[2].asMap().keys().map(  (elem) => __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    get enrolled() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_6.toValue(2n),
                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    shows: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(3n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(3n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'facevalue.compact line 59 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(3n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'facevalue.compact line 59 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(3n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[3];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_8.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    entryTags: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(4n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(4n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'facevalue.compact line 61 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(4n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[4];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    entryAt: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(5n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(5n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'facevalue.compact line 62 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(5n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'facevalue.compact line 62 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(5n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[5];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    claimed: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(6n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(6n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'facevalue.compact line 63 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(6n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[6];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    slots: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(7n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(7n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'facevalue.compact line 65 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(7n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[7];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    tickets: {
      isFull(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isFull: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(8n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(1n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(1048576n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'lt',
                                                                          'neg',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      checkRoot(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`checkRoot: expected 1 argument, received ${args_0.length}`);
        }
        const rt_0 = args_0[0];
        if (!(typeof(rt_0) === 'object' && typeof(rt_0.field) === 'bigint' && rt_0.field >= 0 && rt_0.field <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('checkRoot',
                                     'argument 1',
                                     'facevalue.compact line 66 char 1',
                                     'struct MerkleTreeDigest<field: Field>',
                                     rt_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(8n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(2n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(rt_0),
                                                                                                                                 alignment: _descriptor_16.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      root(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`root: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[8];
        return ((result) => result             ? __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(result)             : undefined)(self_0.asArray()[0].asBoundedMerkleTree().rehash().root()?.value);
      },
      firstFree(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`first_free: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[8];
        return __compactRuntime.CompactTypeField.fromValue(self_0.asArray()[1].asCell().value);
      },
      pathForLeaf(...args_0) {
        if (args_0.length !== 2) {
          throw new __compactRuntime.CompactError(`path_for_leaf: expected 2 arguments, received ${args_0.length}`);
        }
        const index_0 = args_0[0];
        const leaf_0 = args_0[1];
        if (!(typeof(index_0) === 'bigint' && index_0 >= 0 && index_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 1',
                                     'facevalue.compact line 66 char 1',
                                     'Field',
                                     index_0)
        }
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 2',
                                     'facevalue.compact line 66 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[8];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(20, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().pathForLeaf(    index_0,    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
      },
      findPathForLeaf(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`find_path_for_leaf: expected 1 argument, received ${args_0.length}`);
        }
        const leaf_0 = args_0[0];
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('find_path_for_leaf',
                                     'argument 1',
                                     'facevalue.compact line 66 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[8];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(20, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().findPathForLeaf(    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
      },
      history(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`history: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[8];
        return self_0.asArray()[2].asMap().keys().map(  (elem) => __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    spent: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(9n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(9n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'facevalue.compact line 67 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(9n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[9];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    passes: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(10n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(10n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'facevalue.compact line 68 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(10n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'facevalue.compact line 68 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_6.toValue(10n),
                                                                                                     alignment: _descriptor_6.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[10];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get treasury() {
      return _descriptor_11.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_6.toValue(11n),
                                                                                                    alignment: _descriptor_6.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value);
    },
    get hasTreasury() {
      return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_6.toValue(12n),
                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get mintCounter() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_6.toValue(13n),
                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    get mintNonce() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_6.toValue(14n),
                                                                                                   alignment: _descriptor_6.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  roleSecret: (...args) => undefined,
  fanSecret: (...args) => undefined,
  fanPath: (...args) => undefined,
  ticketPath: (...args) => undefined,
  entryContribution: (...args) => undefined,
  entryIndexOf: (...args) => undefined,
  divRem: (...args) => undefined
});
export const pureCircuits = {
  rolePk: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`rolePk: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('rolePk',
                                 'argument 1',
                                 'facevalue.compact line 96 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    return _dummyContract._rolePk_0(sk_0);
  },
  fanLeaf: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`fanLeaf: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const fsk_0 = args_0[0];
    if (!(fsk_0.buffer instanceof ArrayBuffer && fsk_0.BYTES_PER_ELEMENT === 1 && fsk_0.length === 32)) {
      __compactRuntime.typeError('fanLeaf',
                                 'argument 1',
                                 'facevalue.compact line 100 char 1',
                                 'Bytes<32>',
                                 fsk_0)
    }
    return _dummyContract._fanLeaf_0(fsk_0);
  },
  entryTag: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`entryTag: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const showId_0 = args_0[0];
    const fsk_0 = args_0[1];
    if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
      __compactRuntime.typeError('entryTag',
                                 'argument 1',
                                 'facevalue.compact line 104 char 1',
                                 'Bytes<32>',
                                 showId_0)
    }
    if (!(fsk_0.buffer instanceof ArrayBuffer && fsk_0.BYTES_PER_ELEMENT === 1 && fsk_0.length === 32)) {
      __compactRuntime.typeError('entryTag',
                                 'argument 2',
                                 'facevalue.compact line 104 char 1',
                                 'Bytes<32>',
                                 fsk_0)
    }
    return _dummyContract._entryTag_0(showId_0, fsk_0);
  },
  entryKey: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`entryKey: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const showId_0 = args_0[0];
    const index_0 = args_0[1];
    if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
      __compactRuntime.typeError('entryKey',
                                 'argument 1',
                                 'facevalue.compact line 108 char 1',
                                 'Bytes<32>',
                                 showId_0)
    }
    if (!(typeof(index_0) === 'bigint' && index_0 >= 0n && index_0 <= 4294967295n)) {
      __compactRuntime.typeError('entryKey',
                                 'argument 2',
                                 'facevalue.compact line 108 char 1',
                                 'Uint<0..4294967296>',
                                 index_0)
    }
    return _dummyContract._entryKey_0(showId_0, index_0);
  },
  slotNullifier: (...args_0) => {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`slotNullifier: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const showId_0 = args_0[0];
    const fsk_0 = args_0[1];
    const slot_0 = args_0[2];
    if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
      __compactRuntime.typeError('slotNullifier',
                                 'argument 1',
                                 'facevalue.compact line 114 char 1',
                                 'Bytes<32>',
                                 showId_0)
    }
    if (!(fsk_0.buffer instanceof ArrayBuffer && fsk_0.BYTES_PER_ELEMENT === 1 && fsk_0.length === 32)) {
      __compactRuntime.typeError('slotNullifier',
                                 'argument 2',
                                 'facevalue.compact line 114 char 1',
                                 'Bytes<32>',
                                 fsk_0)
    }
    if (!(typeof(slot_0) === 'bigint' && slot_0 >= 0n && slot_0 <= 255n)) {
      __compactRuntime.typeError('slotNullifier',
                                 'argument 3',
                                 'facevalue.compact line 114 char 1',
                                 'Uint<0..256>',
                                 slot_0)
    }
    return _dummyContract._slotNullifier_0(showId_0, fsk_0, slot_0);
  },
  ticketCommit: (...args_0) => {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`ticketCommit: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const showId_0 = args_0[0];
    const fsk_0 = args_0[1];
    const slot_0 = args_0[2];
    if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
      __compactRuntime.typeError('ticketCommit',
                                 'argument 1',
                                 'facevalue.compact line 120 char 1',
                                 'Bytes<32>',
                                 showId_0)
    }
    if (!(fsk_0.buffer instanceof ArrayBuffer && fsk_0.BYTES_PER_ELEMENT === 1 && fsk_0.length === 32)) {
      __compactRuntime.typeError('ticketCommit',
                                 'argument 2',
                                 'facevalue.compact line 120 char 1',
                                 'Bytes<32>',
                                 fsk_0)
    }
    if (!(typeof(slot_0) === 'bigint' && slot_0 >= 0n && slot_0 <= 255n)) {
      __compactRuntime.typeError('ticketCommit',
                                 'argument 3',
                                 'facevalue.compact line 120 char 1',
                                 'Uint<0..256>',
                                 slot_0)
    }
    return _dummyContract._ticketCommit_0(showId_0, fsk_0, slot_0);
  },
  ticketNullifier: (...args_0) => {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`ticketNullifier: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const showId_0 = args_0[0];
    const fsk_0 = args_0[1];
    const slot_0 = args_0[2];
    if (!(showId_0.buffer instanceof ArrayBuffer && showId_0.BYTES_PER_ELEMENT === 1 && showId_0.length === 32)) {
      __compactRuntime.typeError('ticketNullifier',
                                 'argument 1',
                                 'facevalue.compact line 126 char 1',
                                 'Bytes<32>',
                                 showId_0)
    }
    if (!(fsk_0.buffer instanceof ArrayBuffer && fsk_0.BYTES_PER_ELEMENT === 1 && fsk_0.length === 32)) {
      __compactRuntime.typeError('ticketNullifier',
                                 'argument 2',
                                 'facevalue.compact line 126 char 1',
                                 'Bytes<32>',
                                 fsk_0)
    }
    if (!(typeof(slot_0) === 'bigint' && slot_0 >= 0n && slot_0 <= 255n)) {
      __compactRuntime.typeError('ticketNullifier',
                                 'argument 3',
                                 'facevalue.compact line 126 char 1',
                                 'Uint<0..256>',
                                 slot_0)
    }
    return _dummyContract._ticketNullifier_0(showId_0, fsk_0, slot_0);
  },
  seedCommitment: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`seedCommitment: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const seed_0 = args_0[0];
    const salt_0 = args_0[1];
    if (!(typeof(seed_0) === 'bigint' && seed_0 >= 0n && seed_0 <= 4294967295n)) {
      __compactRuntime.typeError('seedCommitment',
                                 'argument 1',
                                 'facevalue.compact line 132 char 1',
                                 'Uint<0..4294967296>',
                                 seed_0)
    }
    if (!(salt_0.buffer instanceof ArrayBuffer && salt_0.BYTES_PER_ELEMENT === 1 && salt_0.length === 32)) {
      __compactRuntime.typeError('seedCommitment',
                                 'argument 2',
                                 'facevalue.compact line 132 char 1',
                                 'Bytes<32>',
                                 salt_0)
    }
    return _dummyContract._seedCommitment_0(seed_0, salt_0);
  },
  windowPosition: (...args_0) => {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`windowPosition: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const index_0 = args_0[0];
    const offset_0 = args_0[1];
    const n_0 = args_0[2];
    if (!(typeof(index_0) === 'bigint' && index_0 >= 0n && index_0 <= 4294967295n)) {
      __compactRuntime.typeError('windowPosition',
                                 'argument 1',
                                 'facevalue.compact line 140 char 1',
                                 'Uint<0..4294967296>',
                                 index_0)
    }
    if (!(typeof(offset_0) === 'bigint' && offset_0 >= 0n && offset_0 <= 4294967295n)) {
      __compactRuntime.typeError('windowPosition',
                                 'argument 2',
                                 'facevalue.compact line 140 char 1',
                                 'Uint<0..4294967296>',
                                 offset_0)
    }
    if (!(typeof(n_0) === 'bigint' && n_0 >= 0n && n_0 <= 4294967295n)) {
      __compactRuntime.typeError('windowPosition',
                                 'argument 3',
                                 'facevalue.compact line 140 char 1',
                                 'Uint<0..4294967296>',
                                 n_0)
    }
    return _dummyContract._windowPosition_0(index_0, offset_0, n_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
