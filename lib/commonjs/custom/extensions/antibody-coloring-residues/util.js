"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResidueInfo = exports.expandEntityToChainArray = exports.getSequenceArr = exports.isApplicable = void 0;
var kabat_prop_1 = require("./provider/kabat-prop");
var chothia_prop_1 = require("./provider/chothia-prop");
var imgt_prop_1 = require("./provider/imgt-prop");
var north_prop_1 = require("./provider/north-prop");
function isApplicable(model) {
    return !!model;
}
exports.isApplicable = isApplicable;
function getSequenceArr(model) {
    var arr = model.sequence.sequences.map(function (seq) {
        var len = seq.sequence.length;
        var sequencArr = [];
        for (var i = 0; i < len; i++) {
            var s = seq.sequence.label.value(i);
            sequencArr.push(s);
        }
        return sequencArr.join('');
    });
    return arr;
}
exports.getSequenceArr = getSequenceArr;
function expandEntityToChainArray(list, model) {
    var entities = model.entities, atomicHierarchy = model.atomicHierarchy, properties = model.properties, modelNum = model.modelNum, sequence = model.sequence;
    var chains = atomicHierarchy.chains;
    var missingResidues = properties.missingResidues;
    var len = chains._rowCount;
    var expandedArr = [];
    var _loop_1 = function (i) {
        var entityId = chains.label_entity_id.value(i);
        var asymId = chains.label_asym_id.value(i);
        var entityIndex = entities.getEntityIndex(entityId);
        var chainItem = list[entityIndex];
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
exports.expandEntityToChainArray = expandEntityToChainArray;
function getResidueInfo(e, cdr_definition) {
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
        prop = kabat_prop_1.AntibodyColoringResidueKabatProvider.get(e.unit.model).value;
    }
    else if (cdr_definition === 'imgt') {
        prop = imgt_prop_1.AntibodyColoringResidueImgtProvider.get(e.unit.model).value;
    }
    else if (cdr_definition === 'chothia') {
        prop = chothia_prop_1.AntibodyColoringResidueChothiaProvider.get(e.unit.model).value;
    }
    else if (cdr_definition === 'north') {
        prop = north_prop_1.AntibodyColoringResidueNorthProvider.get(e.unit.model).value;
    }
    // const prop = AntibodyColoringResidueProvider.get(e.unit.model).value;
    if (!prop) {
        return undefined;
    }
    var item = prop[cIndex];
    return item ? item.aa_list[index] : undefined;
}
exports.getResidueInfo = getResidueInfo;
