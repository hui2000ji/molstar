"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntibodyColoringResidueKabatProvider = exports.AntibodyColoringResidueParams = void 0;
exports.fromServer = fromServer;
const param_definition_1 = require("../../../../mol-util/param-definition");
const custom_model_property_1 = require("../../../../mol-model-props/common/custom-model-property");
const custom_property_1 = require("../../../../mol-model/custom-property");
const backend_api_1 = require("../../../services/backend.api");
const util_1 = require("../util");
async function fromServer(ctx, model, props) {
    const [seqs, entityIdMapIndex] = (0, util_1.getSequenceArr)(model);
    const { data } = await (0, backend_api_1.batchGetSeqInfoApi)({
        sequences: seqs,
        cdr_definition: 'kabat',
    });
    const res = (0, util_1.expandEntityToChainArray)(data.list, model, entityIdMapIndex);
    return { value: res };
}
exports.AntibodyColoringResidueParams = {};
exports.AntibodyColoringResidueKabatProvider = custom_model_property_1.CustomModelProperty.createProvider({
    label: 'Antibody/TCR_kabat',
    descriptor: (0, custom_property_1.CustomPropertyDescriptor)({
        name: 'antibody_coloring_residue_kabat',
    }),
    type: 'static',
    defaultParams: exports.AntibodyColoringResidueParams,
    getParams: (data) => {
        return exports.AntibodyColoringResidueParams;
    },
    isApplicable: (data) => (0, util_1.isApplicable)(data),
    obtain: async (ctx, data, props) => {
        const p = {
            ...param_definition_1.ParamDefinition.getDefaultValues(exports.AntibodyColoringResidueParams),
            ...props,
        };
        const res = await fromServer(ctx, data, p);
        return res;
    },
});
