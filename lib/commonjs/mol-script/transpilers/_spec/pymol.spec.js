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
var parser_1 = require("../pymol/parser");
var keywords_1 = require("../pymol/keywords");
var properties_1 = require("../pymol/properties");
var operators_1 = require("../pymol/operators");
var general = {
    supported: [
        // macros
        '10/cb',
        'a/10-12/ca',
        'lig/b/6+8/c+o',
        // trimming
        '    name CA   ',
        'name CA   ',
        '    name CA',
    ],
    unsupported: [
        // macros
        'pept/enz/c/3/n',
        'pept/enz///n',
        '/pept/lig/',
        '/pept/lig/a',
        '/pept/lig/a/10',
        '/pept/lig/a/10/ca',
        '/pept//a/10',
        // object
        'foobar',
        'protein and bazbar',
    ]
};
describe('pymol general', function () {
    general.supported.forEach(function (str) {
        it(str, function () {
            (0, parser_1.transpiler)(str);
            //          compile(expr);
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
// check against builder output
// 'not (resi 42 or chain A)'
// '!resi 42 or chain A'
// 'b >= 0.3',
// 'b != 0.3',
// 'b>0.3',
// 'b <0.3',
// 'b <= 0.3',
// 'b = 1',
// 'fc.=.1',
describe('pymol keywords', function () { return u.testKeywords(keywords_1.keywords, parser_1.transpiler); });
describe('pymol operators', function () { return u.testOperators(operators_1.operators, parser_1.transpiler); });
describe('pymol properties', function () { return u.testProperties(properties_1.properties, parser_1.transpiler); });
