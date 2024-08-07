"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntibodyColoringResidueColorThemeProvider = exports.AntibodyColoringResidueColorTheme = exports.AntibodyColoringResidueColorThemeParams = void 0;
var structure_1 = require("../../../mol-model/structure");
var color_1 = require("../../../mol-util/color");
var param_definition_1 = require("../../../mol-util/param-definition");
var types_1 = require("../../../mol-model/structure/model/types");
var categories_1 = require("../../../mol-theme/color/categories");
var util_1 = require("./util");
var kabat_prop_1 = require("./provider/kabat-prop");
var chothia_prop_1 = require("./provider/chothia-prop");
var imgt_prop_1 = require("./provider/imgt-prop");
var north_prop_1 = require("./provider/north-prop");
var ResidueColors = [
    color_1.Color.fromRgb(0, 0, 255),
    color_1.Color.fromRgb(0, 255, 255),
    color_1.Color.fromRgb(255, 165, 0),
    color_1.Color.fromRgb(255, 255, 0),
    color_1.Color.fromRgb(128, 0, 128),
    color_1.Color.fromRgb(255, 255, 255), // white
];
function residueMapColor(props, data) {
    var hChain = props['VH/Vα FR'];
    var lChain = props['VL/Vβ FR'];
    var hCdr = props['VH/Vα CDR'];
    var lCdr = props['VL/Vβ CDR'];
    var other = props['Other polymer'];
    if (!data) {
        return (0, color_1.Color)(other);
    }
    else if (data.chain_type === null) {
        return (0, color_1.Color)(other);
    }
    else if ((data.chain_type === 'H' || data.chain_type === 'A') &&
        data.is_cdr) {
        return (0, color_1.Color)(hCdr);
    }
    else if (data.chain_type === 'H' || data.chain_type === 'A') {
        return (0, color_1.Color)(hChain);
    }
    else if ((data.chain_type === 'L' ||
        data.chain_type === 'B' ||
        data.chain_type === 'K') &&
        data.is_cdr) {
        return (0, color_1.Color)(lCdr);
    }
    else if (data.chain_type === 'L' ||
        data.chain_type === 'B' ||
        data.chain_type === 'K') {
        return (0, color_1.Color)(lChain);
    }
    else {
        return (0, color_1.Color)(other);
    }
}
exports.AntibodyColoringResidueColorThemeParams = {
    'CDR def.': param_definition_1.ParamDefinition.Select('imgt', [
        ['kabat', 'Kabat'],
        ['imgt', 'Imgt'],
        ['chothia', 'Chothia'],
        ['north', 'North'],
    ]),
    'VH/Vα FR': param_definition_1.ParamDefinition.Color(ResidueColors[0], {
        label: 'VH/Vα FR',
        description: 'heavy chain non-CDR color',
    }),
    'VL/Vβ FR': param_definition_1.ParamDefinition.Color(ResidueColors[2], {
        label: 'VL/Vβ FR',
        description: 'heavy chain CDR color',
    }),
    'VH/Vα CDR': param_definition_1.ParamDefinition.Color(ResidueColors[1], {
        label: 'VH/Vα CDR',
        description: 'light chain non-CDR color',
    }),
    'VL/Vβ CDR': param_definition_1.ParamDefinition.Color(ResidueColors[3], {
        label: 'VL/Vβ CDR',
        description: 'light chain CDR color',
    }),
    'Other polymer': param_definition_1.ParamDefinition.Color(ResidueColors[4], {
        label: 'Other polymer',
        description: 'other-polymer color',
    }),
    'Non-polymer': param_definition_1.ParamDefinition.Color(ResidueColors[5], {
        label: 'Non-polymer',
        description: 'non-polymer color',
    }),
};
function AntibodyColoringResidueColorTheme(ctx, props) {
    var color;
    var other = props['Other polymer'];
    var nonPolymer = props['Non-polymer'];
    var cdr_definition = props['CDR def.'];
    var descriptor;
    if (cdr_definition === 'kabat') {
        descriptor = kabat_prop_1.AntibodyColoringResidueKabatProvider.descriptor;
    }
    else if (cdr_definition === 'imgt') {
        descriptor = imgt_prop_1.AntibodyColoringResidueImgtProvider.descriptor;
    }
    else if (cdr_definition === 'chothia') {
        descriptor = chothia_prop_1.AntibodyColoringResidueChothiaProvider.descriptor;
    }
    else {
        descriptor = north_prop_1.AntibodyColoringResidueNorthProvider.descriptor;
    }
    console.log('AntibodyColoringResidueColorTheme-->', props, ctx.structure &&
        !ctx.structure.isEmpty &&
        ctx.structure.models[0].customProperties.has(descriptor));
    if (ctx.structure &&
        !ctx.structure.isEmpty &&
        ctx.structure.models[0].customProperties.has(descriptor)) {
        var l_1 = structure_1.StructureElement.Location.create(ctx.structure);
        var model_1 = ctx.structure.model;
        color = function (location) {
            if (structure_1.StructureElement.Location.is(location)) {
                var moleculeType = model_1.atomicHierarchy.derived.residue.moleculeType[model_1.atomicHierarchy.residueAtomSegments.index[location.element]];
                if ((0, types_1.isPolymer)(moleculeType)) {
                    return residueMapColor(props, (0, util_1.getResidueInfo)(location, props['CDR def.']));
                }
                else {
                    return (0, color_1.Color)(nonPolymer);
                }
            }
            else if (structure_1.Bond.isLocation(location)) {
                l_1.unit = location.aUnit;
                l_1.element = location.aUnit.elements[location.aIndex];
                return residueMapColor(props, (0, util_1.getResidueInfo)(l_1, props['CDR def.']));
            }
            return (0, color_1.Color)(other);
        };
    }
    else {
        color = function () { return (0, color_1.Color)(other); };
    }
    return {
        factory: AntibodyColoringResidueColorTheme,
        granularity: 'group',
        preferSmoothing: true,
        color: color,
        props: props,
        description: 'Assigns residue colors according to the data from backend server.',
    };
}
exports.AntibodyColoringResidueColorTheme = AntibodyColoringResidueColorTheme;
exports.AntibodyColoringResidueColorThemeProvider = {
    name: 'antibody-coloring-residue',
    label: 'Antibody/TCR',
    category: categories_1.ColorThemeCategory.Residue,
    factory: AntibodyColoringResidueColorTheme,
    getParams: function (ctx) {
        return exports.AntibodyColoringResidueColorThemeParams;
    },
    defaultValues: param_definition_1.ParamDefinition.getDefaultValues(exports.AntibodyColoringResidueColorThemeParams),
    isApplicable: function (ctx) { var _a; return (0, util_1.isApplicable)((_a = ctx.structure) === null || _a === void 0 ? void 0 : _a.models[0]); },
    ensureCustomProperties: {
        attach: function (ctx, data, prop) {
            console.log('attach-->', prop, data);
            if (data.structure && prop) {
                var cdr_definition = prop['CDR def.'];
                if (cdr_definition) {
                    if (cdr_definition === 'kabat') {
                        return kabat_prop_1.AntibodyColoringResidueKabatProvider.attach(ctx, data.structure.models[0], void 0, true);
                    }
                    else if (cdr_definition === 'imgt') {
                        return imgt_prop_1.AntibodyColoringResidueImgtProvider.attach(ctx, data.structure.models[0], void 0, true);
                    }
                    else if (cdr_definition === 'chothia') {
                        return chothia_prop_1.AntibodyColoringResidueChothiaProvider.attach(ctx, data.structure.models[0], void 0, true);
                    }
                    else {
                        return north_prop_1.AntibodyColoringResidueNorthProvider.attach(ctx, data.structure.models[0], void 0, true);
                    }
                    // return AntibodyColoringResidueProvider.attach(
                    //     ctx,
                    //     data.structure.models[0],
                    //     // { timeStamp: Date.now(), 'CDR def.': prop['CDR def.'] },
                    //     void 0,
                    //     true
                    // );
                }
                else {
                    return Promise.resolve();
                }
            }
            else {
                return Promise.resolve();
            }
        },
        detach: function (data, prop) {
            console.log('detach-->', prop);
            if (data.structure) {
                kabat_prop_1.AntibodyColoringResidueKabatProvider.ref(data.structure.models[0], false);
                chothia_prop_1.AntibodyColoringResidueChothiaProvider.ref(data.structure.models[0], false);
                imgt_prop_1.AntibodyColoringResidueImgtProvider.ref(data.structure.models[0], false);
                north_prop_1.AntibodyColoringResidueNorthProvider.ref(data.structure.models[0], false);
            }
        },
    },
};
