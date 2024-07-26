"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var array_encoder_1 = require("../binary-cif/array-encoder");
var decoder_1 = require("../binary-cif/decoder");
var E = array_encoder_1.ArrayEncoding;
test('fixedPoint2', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var fixedPoint2, x, y, z, xEnc, yEnc, zEnc, xDec, yDec, zDec;
    return tslib_1.__generator(this, function (_a) {
        fixedPoint2 = E.by(E.fixedPoint(100)).and(E.delta).and(E.integerPacking);
        x = [1.092, 1.960, 0.666, 0.480, 1.267];
        y = [7.428, 7.026, 6.851, 7.524, 8.333];
        z = [26.270, 26.561, 25.573, 27.055, 25.881];
        xEnc = fixedPoint2.encode(new Float32Array(x));
        yEnc = fixedPoint2.encode(new Float32Array(y));
        zEnc = fixedPoint2.encode(new Float32Array(z));
        expect(xEnc.data.length).toEqual(6);
        expect(yEnc.data.length).toEqual(5);
        expect(zEnc.data.length).toEqual(6);
        xDec = (0, decoder_1.decode)(xEnc);
        yDec = (0, decoder_1.decode)(yEnc);
        zDec = (0, decoder_1.decode)(zEnc);
        x.forEach(function (a, i) { return expect(xDec[i]).toBeCloseTo(a, 2); });
        y.forEach(function (a, i) { return expect(yDec[i]).toBeCloseTo(a, 2); });
        z.forEach(function (a, i) { return expect(zDec[i]).toBeCloseTo(a, 2); });
        return [2 /*return*/];
    });
}); });
