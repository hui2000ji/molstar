import { BatchSeqInfoParamsModel, Page, List, SeqInfoModel } from './model/common.model';
export declare const batchGetSeqInfoApi: (params: BatchSeqInfoParamsModel) => Promise<Page<List<SeqInfoModel>>>;
