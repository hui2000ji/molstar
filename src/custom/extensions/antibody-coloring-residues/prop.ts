import { Model } from "../../../mol-model/structure";
import { StructureElement } from "../../../mol-model/structure/structure";
import { ParamDefinition as PD } from "../../../mol-util/param-definition";
import { CustomProperty } from "../../../mol-model-props/common/custom-property";
import { CustomModelProperty } from "../../../mol-model-props/common/custom-model-property";
import { CustomPropertyDescriptor } from "../../../mol-model/custom-property";
import { batchGetSeqInfoApi } from "../../services/backend.api";
import { SeqInfoModel } from "../../services/model/common.model";
import { AntibodyColoringResidueColorThemeParams } from "./color";

type SequenceList = (SeqInfoModel | null)[] | undefined;

export function isApplicable(model?: Model): boolean {
  return !!model;
}

export function getSequenceArr(model: Model) {
  const arr = model.sequence.sequences.map((seq) => {
    const len = seq.sequence.length;
    const sequencArr: string[] = [];
    for (let i = 0; i < len; i++) {
      const s = seq.sequence.label.value(i);
      sequencArr.push(s);
    }

    return sequencArr.join("");
  });

  return arr;
}

export function expandEntityToChainArray(
  list: SeqInfoModel[],
  model: Model
): (SeqInfoModel | null)[] {
  const { entities, atomicHierarchy, properties, modelNum, sequence } = model;
  const { chains } = atomicHierarchy;
  const { missingResidues } = properties;
  const len = chains._rowCount;
  const expandedArr: (SeqInfoModel | null)[] = [];
  for (let i = 0; i < len; i++) {
    const entityId = chains.label_entity_id.value(i);
    const asymId = chains.label_asym_id.value(i);
    const entityIndex = entities.getEntityIndex(entityId);

    const chainItem = list[entityIndex];

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
    } else {
      expandedArr[i] = null;
    }
  }
  return expandedArr;
}

export async function fromServer(
  ctx: CustomProperty.Context,
  model: Model,
  props: AntibodyColoringResidueProps
): Promise<CustomProperty.Data<SequenceList>> {
  const seqs = getSequenceArr(model);
  const { data } = await batchGetSeqInfoApi({
    sequences: seqs,
    cdr_definition: props["CDR def."],
  });
  const res = expandEntityToChainArray(data.list, model);
  return { value: res };
}

export const AntibodyColoringResidueParams = {
  ...AntibodyColoringResidueColorThemeParams,
  timeStamp: PD.Numeric(0),
};

export type Params = typeof AntibodyColoringResidueParams;
export type AntibodyColoringResidueProps = PD.Values<Params>;

export const AntibodyColoringResidueProvider: CustomModelProperty.Provider<
  Params,
  SequenceList
> = CustomModelProperty.createProvider({
  label: "Antibody/TCR",
  descriptor: CustomPropertyDescriptor({
    name: "antibody_coloring_residue",
  }),
  type: "static",
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

export function getResidueInfo(e: StructureElement.Location) {
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
  const prop = AntibodyColoringResidueProvider.get(e.unit.model).value;
  if (!prop) {
    return undefined;
  }
  const item = prop[cIndex];
  return item ? item.aa_list[index] : undefined;
}
