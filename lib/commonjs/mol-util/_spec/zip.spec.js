"use strict";
/**
 * Copyright (c) 2020-2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var zip_1 = require("../zip/zip");
var synchronous_1 = require("../../mol-task/execution/synchronous");
describe('zip', function () {
    it('roundtrip deflate/inflate', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var data, deflated, inflated;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = new Uint8Array([1, 2, 3, 4, 5, 6, 7]);
                    return [4 /*yield*/, (0, zip_1.deflate)(synchronous_1.SyncRuntimeContext, data)];
                case 1:
                    deflated = _a.sent();
                    return [4 /*yield*/, (0, zip_1.inflate)(synchronous_1.SyncRuntimeContext, deflated)];
                case 2:
                    inflated = _a.sent();
                    expect(inflated).toEqual(data);
                    return [2 /*return*/];
            }
        });
    }); });
    it('roundtrip zip/unzip', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var data, zipped, unzipped;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        'test.foo': new Uint8Array([1, 2, 3, 4, 5, 6, 7])
                    };
                    return [4 /*yield*/, (0, zip_1.zip)(synchronous_1.SyncRuntimeContext, data)];
                case 1:
                    zipped = _a.sent();
                    return [4 /*yield*/, (0, zip_1.unzip)(synchronous_1.SyncRuntimeContext, zipped)];
                case 2:
                    unzipped = _a.sent();
                    expect(unzipped).toEqual(data);
                    return [2 /*return*/];
            }
        });
    }); });
});
