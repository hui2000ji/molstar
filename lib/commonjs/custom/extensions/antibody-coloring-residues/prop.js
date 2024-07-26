"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResidueInfo = exports.AntibodyColoringResidueProvider = exports.AntibodyColoringResidueParams = exports.fromServer = exports.expandEntityToChainArray = exports.getSequenceArr = exports.isApplicable = void 0;
var tslib_1 = require("tslib");
var param_definition_1 = require("../../../mol-util/param-definition");
var custom_model_property_1 = require("../../../mol-model-props/common/custom-model-property");
var custom_property_1 = require("../../../mol-model/custom-property");
var backend_api_1 = require("../../services/backend.api");
var color_1 = require("./color");
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
function fromServer(ctx, model, props) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var seqs, data, res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    seqs = getSequenceArr(model);
                    return [4 /*yield*/, (0, backend_api_1.batchGetSeqInfoApi)({
                            sequences: seqs,
                            cdr_definition: props['CDR def.'],
                        })];
                case 1:
                    data = (_a.sent()).data;
                    res = expandEntityToChainArray(data.list, model);
                    return [2 /*return*/, { value: res }];
            }
        });
    });
}
exports.fromServer = fromServer;
exports.AntibodyColoringResidueParams = tslib_1.__assign(tslib_1.__assign({}, color_1.AntibodyColoringResidueColorThemeParams), { timeStamp: param_definition_1.ParamDefinition.Numeric(0), 'CDR def.': param_definition_1.ParamDefinition.Text('') });
exports.AntibodyColoringResidueProvider = custom_model_property_1.CustomModelProperty.createProvider({
    label: 'Antibody/TCR',
    descriptor: (0, custom_property_1.CustomPropertyDescriptor)({
        name: 'antibody_coloring_residue',
    }),
    type: 'static',
    defaultParams: exports.AntibodyColoringResidueParams,
    getParams: function (data) {
        return exports.AntibodyColoringResidueParams;
    },
    isApplicable: function (data) { return isApplicable(data); },
    obtain: function (ctx, data, props) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var p, res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p = tslib_1.__assign(tslib_1.__assign({}, param_definition_1.ParamDefinition.getDefaultValues(exports.AntibodyColoringResidueParams)), props);
                    return [4 /*yield*/, fromServer(ctx, data, p)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    }); },
});
function getResidueInfo(e) {
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
    var prop = exports.AntibodyColoringResidueProvider.get(e.unit.model).value;
    if (!prop) {
        return undefined;
    }
    var item = prop[cIndex];
    return item ? item.aa_list[index] : undefined;
}
exports.getResidueInfo = getResidueInfo;
