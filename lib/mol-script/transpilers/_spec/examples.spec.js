/**
 * Copyright (c) 2020-2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 * @author Koya Sakuma <koya.sakuma.work@gmail.com>
 * Adapted from MolQL project
**/
import { _transpiler as transpilers } from '../all';
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
testTranspilerExamples('pymol', transpilers.pymol);
testTranspilerExamples('vmd', transpilers.vmd);
testTranspilerExamples('jmol', transpilers.jmol);
