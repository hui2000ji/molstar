"use strict";
/**
 * Copyright (c) 2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var linear_algebra_1 = require("../../linear-algebra");
var plane3d_1 = require("../primitives/plane3d");
describe('plane3d', function () {
    it('fromNormalAndCoplanarPoint', function () {
        var normal = linear_algebra_1.Vec3.create(1, 1, 1);
        linear_algebra_1.Vec3.normalize(normal, normal);
        var p = (0, plane3d_1.Plane3D)();
        plane3d_1.Plane3D.fromNormalAndCoplanarPoint(p, normal, linear_algebra_1.Vec3.zero());
        expect(p.normal).toEqual(normal);
        expect(p.constant).toBe(-0);
    });
    it('fromCoplanarPoints', function () {
        var a = linear_algebra_1.Vec3.create(2.0, 0.5, 0.25);
        var b = linear_algebra_1.Vec3.create(2.0, -0.5, 1.25);
        var c = linear_algebra_1.Vec3.create(2.0, -3.5, 2.2);
        var p = (0, plane3d_1.Plane3D)();
        plane3d_1.Plane3D.fromCoplanarPoints(p, a, b, c);
        expect(p.normal).toEqual(linear_algebra_1.Vec3.create(1, 0, 0));
        expect(p.constant).toBe(-2);
    });
    it('distanceToPoint', function () {
        var p = plane3d_1.Plane3D.create(linear_algebra_1.Vec3.create(2, 0, 0), -2);
        plane3d_1.Plane3D.normalize(p, p);
        expect(plane3d_1.Plane3D.distanceToPoint(p, linear_algebra_1.Vec3.create(0, 0, 0))).toBe(-1);
        expect(plane3d_1.Plane3D.distanceToPoint(p, linear_algebra_1.Vec3.create(4, 0, 0))).toBe(3);
        expect(plane3d_1.Plane3D.distanceToPoint(p, plane3d_1.Plane3D.projectPoint((0, linear_algebra_1.Vec3)(), p, linear_algebra_1.Vec3.zero()))).toBe(0);
    });
});
