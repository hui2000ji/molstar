/**
 * Copyright (c) 2020-2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @author Panagiotis Tourlas <panangiot_tourlov@hotmail.com>
 * @author Koya Sakuma <koya.sakuma.work@gmail.com>
 */
export function testKeywords(keywords, transpiler) {
    var _loop_1 = function (name_1) {
        it(name_1, function () {
            var k = keywords[name_1];
            if (k.map) {
                var expr = transpiler(name_1);
                expect(expr).toEqual(k.map());
            }
            else {
                var transpile = function () { return transpiler(name_1); };
                expect(transpile).toThrow();
                expect(transpile).not.toThrowError(RangeError);
            }
        });
    };
    for (var name_1 in keywords) {
        _loop_1(name_1);
    }
}
export function testProperties(properties, transpiler) {
    var _loop_2 = function (name_2) {
        var p = properties[name_2];
        p['@examples'].forEach(function (example) {
            it(name_2, function () {
                if (!p.isUnsupported) {
                    transpiler(example);
                }
                else {
                    var transpile = function () { return transpiler(example); };
                    expect(transpile).toThrow();
                    expect(transpile).not.toThrowError(RangeError);
                }
            });
        });
        it(name_2, function () {
            if (!p['@examples'].length) {
                throw Error("'".concat(name_2, "' property has no example(s)"));
            }
        });
    };
    for (var name_2 in properties) {
        _loop_2(name_2);
    }
}
export function testOperators(operators, transpiler) {
    operators.forEach(function (o) {
        o['@examples'].forEach(function (example) {
            it(o.name, function () {
                if (!o.isUnsupported) {
                    transpiler(example);
                }
                else {
                    var transpile = function () { return transpiler(example); };
                    expect(transpile).toThrow();
                    expect(transpile).not.toThrowError(RangeError);
                }
            });
        });
        it(o.name, function () {
            if (!o['@examples'].length) {
                throw Error("'".concat(o.name, "' operator has no example(s)"));
            }
        });
    });
}
