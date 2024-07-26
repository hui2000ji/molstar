import { __awaiter, __generator } from "tslib";
import { getLocalStorage } from './utils/common.util';
import { BACKEND_HOST } from '../config/global.config';
var tokenInfo = getLocalStorage('token');
export var batchGetSeqInfoApi = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("".concat(BACKEND_HOST, "/api/util/batch_seq_info"), {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        Authorization: tokenInfo.token,
                    },
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
