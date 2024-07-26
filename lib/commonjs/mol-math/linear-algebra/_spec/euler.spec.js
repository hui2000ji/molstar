"use strict";
/**
 * Copyright (c) 2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var mat4_1 = require("../3d/mat4");
var euler_1 = require("../3d/euler");
var quat_1 = require("../3d/quat");
var t = [
    [euler_1.Euler.create(0, 0, 0), 'XYZ'],
    [euler_1.Euler.create(1, 0, 0), 'XYZ'],
    [euler_1.Euler.create(0, 1, 0), 'ZYX'],
];
describe('Euler', function () {
    it('fromMat4', function () {
        for (var _i = 0, t_1 = t; _i < t_1.length; _i++) {
            var _a = t_1[_i], e = _a[0], o = _a[1];
            var m = mat4_1.Mat4.fromEuler((0, mat4_1.Mat4)(), e, o);
            var e2 = euler_1.Euler.fromMat4((0, euler_1.Euler)(), m, o);
            var m2 = mat4_1.Mat4.fromEuler((0, mat4_1.Mat4)(), e2, o);
            expect(mat4_1.Mat4.areEqual(m, m2, 0.0001)).toBe(true);
        }
    });
    it('fromQuat', function () {
        for (var _i = 0, t_2 = t; _i < t_2.length; _i++) {
            var _a = t_2[_i], e = _a[0], o = _a[1];
            var q = quat_1.Quat.fromEuler((0, quat_1.Quat)(), e, o);
            var e2 = euler_1.Euler.fromQuat((0, euler_1.Euler)(), q, o);
            var q2 = quat_1.Quat.fromEuler((0, quat_1.Quat)(), e2, o);
            expect(quat_1.Quat.equals(q, q2)).toBe(true);
        }
    });
});
