"use strict";
/**
 * Copyright (c) 2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var marker_data_1 = require("../marker-data");
describe('marker-data', function () {
    it('getMarkersAverage', function () {
        expect((0, marker_data_1.getMarkersAverage)(new Uint8Array([0, 0, 0, 0]), 3)).toBe(0);
        expect((0, marker_data_1.getMarkersAverage)(new Uint8Array([0, 0, 1, 0]), 3)).toBe(1 / 3);
        expect((0, marker_data_1.getMarkersAverage)(new Uint8Array([0, 0, 0, 0]), 4)).toBe(0);
        expect((0, marker_data_1.getMarkersAverage)(new Uint8Array([0, 0, 1, 0]), 4)).toBe(1 / 4);
    });
});
