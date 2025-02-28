"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchGetSeqInfoApi = void 0;
const common_util_1 = require("./utils/common.util");
const global_config_1 = require("../config/global.config");
const tokenInfo = (0, common_util_1.getLocalStorage)('token');
const batchGetSeqInfoApi = async (params) => {
    const response = await fetch(`${global_config_1.BACKEND_HOST}/api/util/batch_seq_info`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: tokenInfo.token,
        },
    });
    const data = await response.json();
    return data;
};
exports.batchGetSeqInfoApi = batchGetSeqInfoApi;
