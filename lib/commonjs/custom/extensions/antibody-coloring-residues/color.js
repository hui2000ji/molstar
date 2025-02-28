"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntibodyColoringResidueColorThemeProvider = exports.AntibodyColoringResidueColorThemeParams = void 0;
exports.AntibodyColoringResidueColorTheme = AntibodyColoringResidueColorTheme;
const structure_1 = require("../../../mol-model/structure");
const color_1 = require("../../../mol-util/color");
const param_definition_1 = require("../../../mol-util/param-definition");
const types_1 = require("../../../mol-model/structure/model/types");
const categories_1 = require("../../../mol-theme/color/categories");
const util_1 = require("./util");
const kabat_prop_1 = require("./provider/kabat-prop");
const chothia_prop_1 = require("./provider/chothia-prop");
const imgt_prop_1 = require("./provider/imgt-prop");
const north_prop_1 = require("./provider/north-prop");
const chain_id_1 = require("../../../mol-theme/color/chain-id");
const unit_index_1 = require("../../../mol-theme/color/unit-index");
const entity_id_1 = require("../../../mol-theme/color/entity-id");
const entity_source_1 = require("../../../mol-theme/color/entity-source");
const operator_name_1 = require("../../../mol-theme/color/operator-name");
const model_index_1 = require("../../../mol-theme/color/model-index");
const structure_index_1 = require("../../../mol-theme/color/structure-index");
const uniform_1 = require("../../../mol-theme/color/uniform");
const DefaultColor = (0, color_1.Color)(0xFFFFFF);
const ResidueColors = [
    color_1.Color.fromRgb(0, 0, 255), // blue
    color_1.Color.fromRgb(0, 255, 255), // cyan
    color_1.Color.fromRgb(255, 165, 0), // orange
    color_1.Color.fromRgb(255, 255, 0), // yellow
    color_1.Color.fromRgb(128, 0, 128), // purple
    color_1.Color.fromRgb(255, 255, 255), // white
];
function residueMapColor(ctx, location, props, data) {
    var _a;
    const hChain = props['VH/Vα FR'];
    const lChain = props['VL/Vβ FR'];
    const hCdr = props['VH/Vα CDR'];
    const lCdr = props['VL/Vβ CDR'];
    // const other = props['Other polymer'];
    const otherPolymerColor = (_a = getOhterPolymerTheme(ctx, props['Other polymer'])) === null || _a === void 0 ? void 0 : _a.color;
    if (!data) {
        // return Color(other);
        return otherPolymerColor(location, false);
    }
    else if (data.chain_type === null) {
        // return Color(other);
        return otherPolymerColor(location, false);
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
        // return Color(other);
        return otherPolymerColor(location, false);
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
    // 'Other polymer': PD.Color(ResidueColors[4], {
    //     label: 'Other polymer',
    //     description: 'other-polymer color',
    // }),
    'Other polymer': param_definition_1.ParamDefinition.MappedStatic('chain-id', {
        'chain-id': param_definition_1.ParamDefinition.Group(chain_id_1.ChainIdColorThemeParams),
        'unit-index': param_definition_1.ParamDefinition.Group(unit_index_1.UnitIndexColorThemeParams, { label: 'Chain Instance' }),
        'entity-id': param_definition_1.ParamDefinition.Group(entity_id_1.EntityIdColorThemeParams),
        'entity-source': param_definition_1.ParamDefinition.Group(entity_source_1.EntitySourceColorThemeParams),
        'operator-name': param_definition_1.ParamDefinition.Group(operator_name_1.OperatorNameColorThemeParams),
        'model-index': param_definition_1.ParamDefinition.Group(model_index_1.ModelIndexColorThemeParams),
        'structure-index': param_definition_1.ParamDefinition.Group(structure_index_1.StructureIndexColorThemeParams),
        'uniform': param_definition_1.ParamDefinition.Group(uniform_1.UniformColorThemeParams),
    }, { description: 'Use chain-id coloring for antibody atoms.' }),
    'Non-polymer': param_definition_1.ParamDefinition.Color(ResidueColors[5], {
        label: 'Non-polymer',
        description: 'non-polymer color',
    }),
};
function getOhterPolymerTheme(ctx, props) {
    switch (props.name) {
        case 'chain-id': return (0, chain_id_1.ChainIdColorTheme)(ctx, props.params);
        case 'unit-index': return (0, unit_index_1.UnitIndexColorTheme)(ctx, props.params);
        case 'entity-id': return (0, entity_id_1.EntityIdColorTheme)(ctx, props.params);
        case 'entity-source': return (0, entity_source_1.EntitySourceColorTheme)(ctx, props.params);
        case 'operator-name': return (0, operator_name_1.OperatorNameColorTheme)(ctx, props.params);
        case 'model-index': return (0, model_index_1.ModelIndexColorTheme)(ctx, props.params);
        case 'structure-index': return (0, structure_index_1.StructureIndexColorTheme)(ctx, props.params);
        case 'uniform': return (0, uniform_1.UniformColorTheme)(ctx, props.params);
    }
}
function AntibodyColoringResidueColorTheme(ctx, props) {
    var _a;
    let color;
    // const other = props['Other polymer'];
    const nonPolymer = props['Non-polymer'];
    const cdr_definition = props['CDR def.'];
    const otherPolymerColor = (_a = getOhterPolymerTheme(ctx, props['Other polymer'])) === null || _a === void 0 ? void 0 : _a.color;
    let descriptor;
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
    if (ctx.structure &&
        !ctx.structure.isEmpty &&
        ctx.structure.models[0].customProperties.has(descriptor)) {
        const l = structure_1.StructureElement.Location.create(ctx.structure);
        const model = ctx.structure.model;
        color = (location) => {
            if (structure_1.StructureElement.Location.is(location)) {
                const moleculeType = model.atomicHierarchy.derived.residue.moleculeType[model.atomicHierarchy.residueAtomSegments.index[location.element]];
                if ((0, types_1.isPolymer)(moleculeType)) {
                    return residueMapColor(ctx, location, props, (0, util_1.getResidueInfo)(location, props['CDR def.']));
                }
                else {
                    return (0, color_1.Color)(nonPolymer);
                }
            }
            else if (structure_1.Bond.isLocation(location)) {
                l.unit = location.aUnit;
                l.element = location.aUnit.elements[location.aIndex];
                return residueMapColor(ctx, location, props, (0, util_1.getResidueInfo)(l, props['CDR def.']));
            }
            // return Color(other);
            return otherPolymerColor(location, false);
        };
    }
    else {
        color = () => (0, color_1.Color)(DefaultColor);
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
exports.AntibodyColoringResidueColorThemeProvider = {
    name: 'antibody-coloring-residue',
    label: 'Antibody/TCR',
    category: categories_1.ColorThemeCategory.Residue,
    factory: AntibodyColoringResidueColorTheme,
    getParams: (ctx) => {
        return exports.AntibodyColoringResidueColorThemeParams;
    },
    defaultValues: param_definition_1.ParamDefinition.getDefaultValues(exports.AntibodyColoringResidueColorThemeParams),
    isApplicable: (ctx) => { var _a; return (0, util_1.isApplicable)((_a = ctx.structure) === null || _a === void 0 ? void 0 : _a.models[0]); },
    ensureCustomProperties: {
        attach: (ctx, data, prop) => {
            if (data.structure && prop) {
                const cdr_definition = prop['CDR def.'];
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
                }
                else {
                    return Promise.resolve();
                }
            }
            else {
                return Promise.resolve();
            }
        },
        detach: (data) => {
            if (data.structure) {
                kabat_prop_1.AntibodyColoringResidueKabatProvider.ref(data.structure.models[0], false);
                chothia_prop_1.AntibodyColoringResidueChothiaProvider.ref(data.structure.models[0], false);
                imgt_prop_1.AntibodyColoringResidueImgtProvider.ref(data.structure.models[0], false);
                north_prop_1.AntibodyColoringResidueNorthProvider.ref(data.structure.models[0], false);
            }
        },
    },
};
