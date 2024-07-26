"use strict";
/**
 * Copyright (c) 2020-2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 * @author Koya Sakuma <koya.sakuma.work@gmail.com>
 * Adapted from MolQL project
**/
Object.defineProperty(exports, "__esModule", { value: true });
var all_1 = require("../all");
function testTranspilerExamples(name, transpiler) {
    describe("".concat(name, " examples"), function () {
        var examples = require("../".concat(name, "/examples")).examples;
        var _loop_1 = function (e) {
            it(e.name, function () {
                // check if it transpiles and compiles/typechecks.
                transpiler(e.value);
            });
        };
        //        console.log(examples);
        for (var _i = 0, examples_1 = examples; _i < examples_1.length; _i++) {
            var e = examples_1[_i];
            _loop_1(e);
        }
    });
}
testTranspilerExamples('pymol', all_1._transpiler.pymol);
testTranspilerExamples('vmd', all_1._transpiler.vmd);
testTranspilerExamples('jmol', all_1._transpiler.jmol);
