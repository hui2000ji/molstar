/**
 * Copyright (c) 2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
import { Mat4 } from '../3d/mat4';
import { Euler } from '../3d/euler';
import { Quat } from '../3d/quat';
var t = [
    [Euler.create(0, 0, 0), 'XYZ'],
    [Euler.create(1, 0, 0), 'XYZ'],
    [Euler.create(0, 1, 0), 'ZYX'],
];
describe('Euler', function () {
    it('fromMat4', function () {
        for (var _i = 0, t_1 = t; _i < t_1.length; _i++) {
            var _a = t_1[_i], e = _a[0], o = _a[1];
            var m = Mat4.fromEuler(Mat4(), e, o);
            var e2 = Euler.fromMat4(Euler(), m, o);
            var m2 = Mat4.fromEuler(Mat4(), e2, o);
            expect(Mat4.areEqual(m, m2, 0.0001)).toBe(true);
        }
    });
    it('fromQuat', function () {
        for (var _i = 0, t_2 = t; _i < t_2.length; _i++) {
            var _a = t_2[_i], e = _a[0], o = _a[1];
            var q = Quat.fromEuler(Quat(), e, o);
            var e2 = Euler.fromQuat(Euler(), q, o);
            var q2 = Quat.fromEuler(Quat(), e2, o);
            expect(Quat.equals(q, q2)).toBe(true);
        }
    });
});
