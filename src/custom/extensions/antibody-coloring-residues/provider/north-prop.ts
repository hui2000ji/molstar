import { Model } from '../../../../mol-model/structure';
import { ParamDefinition as PD } from '../../../../mol-util/param-definition';
import { CustomProperty } from '../../../../mol-model-props/common/custom-property';
import { CustomModelProperty } from '../../../../mol-model-props/common/custom-model-property';
import { CustomPropertyDescriptor } from '../../../../mol-model/custom-property';
import { batchGetSeqInfoApi } from '../../../services/backend.api';
import { isApplicable, getSequenceArr, expandEntityToChainArray, SequenceList } from '../util';

export async function fromServer(
    ctx: CustomProperty.Context,
    model: Model,
    props: AntibodyColoringResidueProps
): Promise<CustomProperty.Data<SequenceList>> {

    const [seqs, entityIdMapIndex] = getSequenceArr(model);
    const { data } = await batchGetSeqInfoApi({
        sequences: seqs,
        cdr_definition: 'north',
    });
    const res = expandEntityToChainArray(data.list, model, entityIdMapIndex);
    return { value: res };
}

export const AntibodyColoringResidueParams = {
};

export type Params = typeof AntibodyColoringResidueParams;
export type AntibodyColoringResidueProps = PD.Values<Params>;

export const AntibodyColoringResidueNorthProvider: CustomModelProperty.Provider<
Params,
SequenceList
> = CustomModelProperty.createProvider({
    label: 'Antibody/TCR_north',
    descriptor: CustomPropertyDescriptor({
        name: 'antibody_coloring_residue_north',
    }),
    type: 'static',
    defaultParams: AntibodyColoringResidueParams,
    getParams: (data: Model) => {
        return AntibodyColoringResidueParams;
    },
    isApplicable: (data: Model) => isApplicable(data),
    obtain: async (
        ctx: CustomProperty.Context,
        data: Model,
        props: Partial<AntibodyColoringResidueProps>
    ) => {
        const p = {
            ...PD.getDefaultValues(AntibodyColoringResidueParams),
            ...props,
        };

        const res = await fromServer(ctx, data, p);

        return res;
    },
});
