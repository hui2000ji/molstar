"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntibodyColoringResidueNorthProvider = exports.AntibodyColoringResidueParams = exports.fromServer = void 0;
var tslib_1 = require("tslib");
var param_definition_1 = require("../../../../mol-util/param-definition");
var custom_model_property_1 = require("../../../../mol-model-props/common/custom-model-property");
var custom_property_1 = require("../../../../mol-model/custom-property");
var backend_api_1 = require("../../../services/backend.api");
var util_1 = require("../util");
function fromServer(ctx, model, props) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var seqs, data, res;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    seqs = (0, util_1.getSequenceArr)(model);
                    return [4 /*yield*/, (0, backend_api_1.batchGetSeqInfoApi)({
                            sequences: seqs,
                            cdr_definition: 'north',
                        })];
                case 1:
                    data = (_a.sent()).data;
                    res = (0, util_1.expandEntityToChainArray)(data.list, model);
                    console.log('fromServer north -->', props, data, res);
                    return [2 /*return*/, { value: res }];
            }
        });
    });
}
exports.fromServer = fromServer;
exports.AntibodyColoringResidueParams = {};
exports.AntibodyColoringResidueNorthProvider = custom_model_property_1.CustomModelProperty.createProvider({
    label: 'Antibody/TCR_north',
    descriptor: (0, custom_property_1.CustomPropertyDescriptor)({
        name: 'antibody_coloring_residue_north',
    }),
    type: 'static',
    defaultParams: exports.AntibodyColoringResidueParams,
    getParams: function (data) {
        return exports.AntibodyColoringResidueParams;
    },
    isApplicable: function (data) { return (0, util_1.isApplicable)(data); },
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
