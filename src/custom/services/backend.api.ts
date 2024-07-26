import {
  BatchSeqInfoParamsModel,
  Page,
  List,
  SeqInfoModel,
  TokenModel,
} from "./model/common.model";
import { getLocalStorage } from "./utils/common.util";
import { BACKEND_HOST } from "../config/global.config";

const tokenInfo = getLocalStorage("token") as TokenModel;

export const batchGetSeqInfoApi = async (params: BatchSeqInfoParamsModel) => {
  const response = await fetch(`${BACKEND_HOST}/api/util/batch_seq_info`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: tokenInfo.token,
    },
  });

  const data = await response.json();

  return data as Page<List<SeqInfoModel>>;
};
