import { Model } from '../../../mol-model/structure';
import { SeqInfoModel } from '../../services/model/common.model';
import { StructureElement } from '../../../mol-model/structure/structure';
export type SequenceList = (SeqInfoModel | null)[] | undefined;
export declare function isApplicable(model?: Model): boolean;
export declare function getSequenceArr(model: Model): [string[], Record<string, number>];
export declare function expandEntityToChainArray(list: SeqInfoModel[], model: Model, entityIdMapIndex: Record<string, number>): (SeqInfoModel | null)[];
export declare function getResidueInfo(e: StructureElement.Location, cdr_definition: string): import("../../services/model/common.model").ResidueModel | undefined;
