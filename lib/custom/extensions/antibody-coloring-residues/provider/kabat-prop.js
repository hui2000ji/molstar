import { __assign, __awaiter, __generator } from "tslib";
import { ParamDefinition as PD } from '../../../../mol-util/param-definition';
import { CustomModelProperty } from '../../../../mol-model-props/common/custom-model-property';
import { CustomPropertyDescriptor } from '../../../../mol-model/custom-property';
import { batchGetSeqInfoApi } from '../../../services/backend.api';
import { isApplicable, getSequenceArr, expandEntityToChainArray } from '../util';
export function fromServer(ctx, model, props) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, seqs, entityIdMapIndex, data, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getSequenceArr(model), seqs = _a[0], entityIdMapIndex = _a[1];
                    return [4 /*yield*/, batchGetSeqInfoApi({
                            sequences: seqs,
                            cdr_definition: 'kabat',
                        })];
                case 1:
                    data = (_b.sent()).data;
                    res = expandEntityToChainArray(data.list, model, entityIdMapIndex);
                    return [2 /*return*/, { value: res }];
            }
        });
    });
}
export var AntibodyColoringResidueParams = {};
export var AntibodyColoringResidueKabatProvider = CustomModelProperty.createProvider({
    label: 'Antibody/TCR_kabat',
    descriptor: CustomPropertyDescriptor({
        name: 'antibody_coloring_residue_kabat',
    }),
    type: 'static',
    defaultParams: AntibodyColoringResidueParams,
    getParams: function (data) {
        return AntibodyColoringResidueParams;
    },
    isApplicable: function (data) { return isApplicable(data); },
    obtain: function (ctx, data, props) { return __awaiter(void 0, void 0, void 0, function () {
        var p, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p = __assign(__assign({}, PD.getDefaultValues(AntibodyColoringResidueParams)), props);
                    return [4 /*yield*/, fromServer(ctx, data, p)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    }); },
});
