"use strict";
/**
 * Copyright (c) 2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Gianluca Tomasello <giagitom@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var vec3_1 = require("../3d/vec3");
var principal_axes_1 = require("../matrix/principal-axes");
describe('PrincipalAxes', function () {
    it('same-cartesian-plane', function () {
        var positions = [
            0.1945, -0.0219, -0.0416,
            -0.0219, -0.0219, -0.0119,
        ];
        var pa = principal_axes_1.PrincipalAxes.ofPositions(positions);
        expect(vec3_1.Vec3.isFinite(pa.boxAxes.origin)).toBe(true);
        expect(vec3_1.Vec3.equals(pa.boxAxes.origin, pa.momentsAxes.origin)).toBe(true);
    });
    it('same-point', function () {
        var positions = [
            0.1945, -0.0219, -0.0416,
            0.1945, -0.0219, -0.0416,
        ];
        var pa = principal_axes_1.PrincipalAxes.ofPositions(positions);
        expect(vec3_1.Vec3.isFinite(pa.boxAxes.origin)).toBe(true);
        expect(vec3_1.Vec3.equals(pa.boxAxes.origin, pa.momentsAxes.origin)).toBe(true);
    });
});
