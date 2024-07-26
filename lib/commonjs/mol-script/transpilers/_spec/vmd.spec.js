"use strict";
/**
 * Copyright (c) 2020-2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @author Panagiotis Tourlas <panagiot_tourlov@hotmail.com>
 * @author Koya Sakuma <koya.sakuma.work@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var u = tslib_1.__importStar(require("./utils"));
var parser_1 = require("../vmd/parser");
var keywords_1 = require("../vmd/keywords");
var properties_1 = require("../vmd/properties");
var operators_1 = require("../vmd/operators");
var general = {
    supported: [
        // trimming
        '    name CA   ',
        'name CA   ',
        '    name CA',
    ],
    unsupported: [
        // variables
        'name $atomname',
        'protein and @myselection',
        // values outside of comparisons
        'foobar',
        '34',
        'name',
        'abs(-42)',
        'abs(21+21)',
        'sqr(3)',
        'sqr(x)',
        'sqr(x+33)',
        'protein or foobar',
        '34 and protein',
        'name or protein',
    ]
};
describe('vmd general', function () {
    general.supported.forEach(function (str) {
        it(str, function () {
            (0, parser_1.transpiler)(str);
            // compile(expr);
        });
    });
    general.unsupported.forEach(function (str) {
        it(str, function () {
            var transpileStr = function () { return (0, parser_1.transpiler)(str); };
            expect(transpileStr).toThrow();
            expect(transpileStr).not.toThrowError(RangeError);
        });
    });
});
describe('vmd keywords', function () { return u.testKeywords(keywords_1.keywords, parser_1.transpiler); });
describe('vmd operators', function () { return u.testOperators(operators_1.operators, parser_1.transpiler); });
describe('vmd properties', function () { return u.testProperties(properties_1.properties, parser_1.transpiler); });
