"use strict";
/**
 * Copyright (c) 2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var linear_algebra_1 = require("../../linear-algebra");
var polygon_1 = require("../polygon");
describe('pointInPolygon', function () {
    it('basic', function () {
        var polygon = [
            -1, -1,
            1, -1,
            1, 1,
            -1, 1
        ];
        expect((0, polygon_1.pointInPolygon)(linear_algebra_1.Vec2.create(0, 0), polygon, 4)).toBe(true);
        expect((0, polygon_1.pointInPolygon)(linear_algebra_1.Vec2.create(2, 2), polygon, 4)).toBe(false);
    });
});
