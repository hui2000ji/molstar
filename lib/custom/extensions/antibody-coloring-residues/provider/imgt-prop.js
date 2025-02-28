import { ParamDefinition as PD } from '../../../../mol-util/param-definition';
import { CustomModelProperty } from '../../../../mol-model-props/common/custom-model-property';
import { CustomPropertyDescriptor } from '../../../../mol-model/custom-property';
import { batchGetSeqInfoApi } from '../../../services/backend.api';
import { isApplicable, getSequenceArr, expandEntityToChainArray } from '../util';
export async function fromServer(ctx, model, props) {
    const [seqs, entityIdMapIndex] = getSequenceArr(model);
    const { data } = await batchGetSeqInfoApi({
        sequences: seqs,
        cdr_definition: 'imgt',
    });
    const res = expandEntityToChainArray(data.list, model, entityIdMapIndex);
    return { value: res };
}
export const AntibodyColoringResidueParams = {};
export const AntibodyColoringResidueImgtProvider = CustomModelProperty.createProvider({
    label: 'Antibody/TCR_imgt',
    descriptor: CustomPropertyDescriptor({
        name: 'antibody_coloring_residue_imgt',
    }),
    type: 'static',
    defaultParams: AntibodyColoringResidueParams,
    getParams: (data) => {
        return AntibodyColoringResidueParams;
    },
    isApplicable: (data) => isApplicable(data),
    obtain: async (ctx, data, props) => {
        const p = {
            ...PD.getDefaultValues(AntibodyColoringResidueParams),
            ...props,
        };
        const res = await fromServer(ctx, data, p);
        return res;
    },
});
