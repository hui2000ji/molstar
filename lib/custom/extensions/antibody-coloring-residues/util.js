import { AntibodyColoringResidueKabatProvider } from './provider/kabat-prop';
import { AntibodyColoringResidueChothiaProvider } from './provider/chothia-prop';
import { AntibodyColoringResidueImgtProvider } from './provider/imgt-prop';
import { AntibodyColoringResidueNorthProvider } from './provider/north-prop';
import { PROTEIN_LETTERS_3TO1_EXTENDED, NUCLEIC_LETTERS_3TO1_EXTENDED } from '../../config/common.config';
export function isApplicable(model) {
    return !!model;
}
export function getSequenceArr(model) {
    var entityIdMapIndex = {};
    var arr = model.sequence.sequences.map(function (seq, i) {
        entityIdMapIndex[seq.entityId] = i;
        var len = seq.sequence.length;
        var sequencArr = [];
        for (var i_1 = 0; i_1 < len; i_1++) {
            var s = seq.sequence.label.value(i_1);
            if (s.length > 1) {
                var resi = PROTEIN_LETTERS_3TO1_EXTENDED[s] || NUCLEIC_LETTERS_3TO1_EXTENDED[s] || 'X';
                sequencArr.push(resi);
            }
            else {
                sequencArr.push(s);
            }
        }
        return sequencArr.join('');
    });
    return [arr, entityIdMapIndex];
}
export function expandEntityToChainArray(list, model, entityIdMapIndex) {
    var atomicHierarchy = model.atomicHierarchy, properties = model.properties, modelNum = model.modelNum, sequence = model.sequence;
    var chains = atomicHierarchy.chains;
    var missingResidues = properties.missingResidues;
    var len = chains._rowCount;
    var expandedArr = [];
    var _loop_1 = function (i) {
        var entityId = chains.label_entity_id.value(i);
        var asymId = chains.label_asym_id.value(i);
        var chainItem = list[entityIdMapIndex[entityId]];
        var currentSequence = sequence.sequences.find(function (item) {
            return item.entityId === entityId;
        });
        if (chainItem && currentSequence) {
            if (currentSequence.sequence.length !== chainItem.aa_list.length) {
                throw Error("sequence Length not equal aa_list's Length");
            }
            var newList = chainItem.aa_list.filter(function (r, idx) {
                var seqId = currentSequence.sequence.seqId.value(idx);
                var flag = missingResidues.has(modelNum, asymId, seqId);
                return !flag;
            });
            expandedArr[i] = {
                sequence: chainItem.sequence,
                aa_list: newList,
            };
        }
        else {
            expandedArr[i] = null;
        }
    };
    for (var i = 0; i < len; i++) {
        _loop_1(i);
    }
    return expandedArr;
}
export function getResidueInfo(e, cdr_definition) {
    var model = e.structure.model;
    var _a = model.atomicHierarchy, residueAtomSegments = _a.residueAtomSegments, chainAtomSegments = _a.chainAtomSegments;
    // 寻找当前原子所在 residue 的 index
    var rIndex = residueAtomSegments.index[e.element];
    // 寻找开始原子的索引
    var eStartIndex = residueAtomSegments.offsets[rIndex];
    // 寻找开始原子所属的链索引
    var cIndex = chainAtomSegments.index[eStartIndex];
    var cStartIndex = chainAtomSegments.offsets[cIndex];
    var rStart = residueAtomSegments.index[cStartIndex];
    var index = rIndex - rStart;
    var prop;
    if (cdr_definition === 'kabat') {
        prop = AntibodyColoringResidueKabatProvider.get(e.unit.model).value;
    }
    else if (cdr_definition === 'imgt') {
        prop = AntibodyColoringResidueImgtProvider.get(e.unit.model).value;
    }
    else if (cdr_definition === 'chothia') {
        prop = AntibodyColoringResidueChothiaProvider.get(e.unit.model).value;
    }
    else if (cdr_definition === 'north') {
        prop = AntibodyColoringResidueNorthProvider.get(e.unit.model).value;
    }
    if (!prop) {
        return undefined;
    }
    var item = prop[cIndex];
    return item ? item.aa_list[index] : undefined;
}
