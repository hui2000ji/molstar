"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchGetSeqInfoApi = void 0;
var tslib_1 = require("tslib");
var common_util_1 = require("./utils/common.util");
var global_config_1 = require("../config/global.config");
var tokenInfo = (0, common_util_1.getLocalStorage)('token');
var batchGetSeqInfoApi = function (params) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var response, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("".concat(global_config_1.BACKEND_HOST, "/api/util/batch_seq_info"), {
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
exports.batchGetSeqInfoApi = batchGetSeqInfoApi;
