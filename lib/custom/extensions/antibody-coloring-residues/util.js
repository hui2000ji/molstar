import { AntibodyColoringResidueKabatProvider } from './provider/kabat-prop';
import { AntibodyColoringResidueChothiaProvider } from './provider/chothia-prop';
import { AntibodyColoringResidueImgtProvider } from './provider/imgt-prop';
import { AntibodyColoringResidueNorthProvider } from './provider/north-prop';
import { PROTEIN_LETTERS_3TO1_EXTENDED, NUCLEIC_LETTERS_3TO1_EXTENDED } from '../../config/common.config';
export function isApplicable(model) {
    return !!model;
}
export function getSequenceArr(model) {
    const entityIdMapIndex = {};
    const arr = model.sequence.sequences.map((seq, i) => {
        entityIdMapIndex[seq.entityId] = i;
        const len = seq.sequence.length;
        const sequencArr = [];
        for (let i = 0; i < len; i++) {
            const s = seq.sequence.label.value(i);
            if (s.length > 1) {
                const resi = PROTEIN_LETTERS_3TO1_EXTENDED[s] || NUCLEIC_LETTERS_3TO1_EXTENDED[s] || 'X';
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
    const { atomicHierarchy, properties, modelNum, sequence } = model;
    const { chains } = atomicHierarchy;
    const { missingResidues } = properties;
    const len = chains._rowCount;
    const expandedArr = [];
    for (let i = 0; i < len; i++) {
        const entityId = chains.label_entity_id.value(i);
        const asymId = chains.label_asym_id.value(i);
        const chainItem = list[entityIdMapIndex[entityId]];
        const currentSequence = sequence.sequences.find((item) => {
            return item.entityId === entityId;
        });
        if (chainItem && currentSequence) {
            if (currentSequence.sequence.length !== chainItem.aa_list.length) {
                throw Error("sequence Length not equal aa_list's Length");
            }
            const newList = chainItem.aa_list.filter((r, idx) => {
                const seqId = currentSequence.sequence.seqId.value(idx);
                const flag = missingResidues.has(modelNum, asymId, seqId);
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
    }
    return expandedArr;
}
export function getResidueInfo(e, cdr_definition) {
    const model = e.structure.model;
    const { residueAtomSegments, chainAtomSegments } = model.atomicHierarchy;
    // 寻找当前原子所在 residue 的 index
    const rIndex = residueAtomSegments.index[e.element];
    // 寻找开始原子的索引
    const eStartIndex = residueAtomSegments.offsets[rIndex];
    // 寻找开始原子所属的链索引
    const cIndex = chainAtomSegments.index[eStartIndex];
    const cStartIndex = chainAtomSegments.offsets[cIndex];
    const rStart = residueAtomSegments.index[cStartIndex];
    const index = rIndex - rStart;
    let prop;
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
    const item = prop[cIndex];
    return item ? item.aa_list[index] : undefined;
}
