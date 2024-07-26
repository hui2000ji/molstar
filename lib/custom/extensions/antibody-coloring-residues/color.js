import { isApplicable, getResidueInfo, AntibodyColoringResidueProvider, } from './prop';
import { Bond, StructureElement } from '../../../mol-model/structure';
import { Color } from '../../../mol-util/color';
import { ParamDefinition as PD } from '../../../mol-util/param-definition';
import { isPolymer } from '../../../mol-model/structure/model/types';
import { ColorThemeCategory } from '../../../mol-theme/color/categories';
var ResidueColors = [
    Color.fromRgb(0, 0, 255),
    Color.fromRgb(0, 255, 255),
    Color.fromRgb(255, 165, 0),
    Color.fromRgb(255, 255, 0),
    Color.fromRgb(128, 0, 128),
    Color.fromRgb(255, 255, 255), // white
];
function residueMapColor(props, data) {
    var hChain = props['VH/Vα FR'];
    var lChain = props['VL/Vβ FR'];
    var hCdr = props['VH/Vα CDR'];
    var lCdr = props['VL/Vβ CDR'];
    var other = props['Other polymer'];
    if (!data) {
        return Color(other);
    }
    else if (data.chain_type === null) {
        return Color(other);
    }
    else if ((data.chain_type === 'H' || data.chain_type === 'A') &&
        data.is_cdr) {
        return Color(hCdr);
    }
    else if (data.chain_type === 'H' || data.chain_type === 'A') {
        return Color(hChain);
    }
    else if ((data.chain_type === 'L' ||
        data.chain_type === 'B' ||
        data.chain_type === 'K') &&
        data.is_cdr) {
        return Color(lCdr);
    }
    else if (data.chain_type === 'L' ||
        data.chain_type === 'B' ||
        data.chain_type === 'K') {
        return Color(lChain);
    }
    else {
        return Color(other);
    }
}
export var AntibodyColoringResidueColorThemeParams = {
    'CDR def.': PD.Select('imgt', [
        ['kabat', 'Kabat'],
        ['imgt', 'Imgt'],
        ['chothia', 'Chothia'],
        ['north', 'North'],
    ]),
    'VH/Vα FR': PD.Color(ResidueColors[0], {
        label: 'VH/Vα FR',
        description: 'heavy chain non-CDR color',
    }),
    'VL/Vβ FR': PD.Color(ResidueColors[2], {
        label: 'VL/Vβ FR',
        description: 'heavy chain CDR color',
    }),
    'VH/Vα CDR': PD.Color(ResidueColors[1], {
        label: 'VH/Vα CDR',
        description: 'light chain non-CDR color',
    }),
    'VL/Vβ CDR': PD.Color(ResidueColors[3], {
        label: 'VL/Vβ CDR',
        description: 'light chain CDR color',
    }),
    'Other polymer': PD.Color(ResidueColors[4], {
        label: 'Other polymer',
        description: 'other-polymer color',
    }),
    'Non-polymer': PD.Color(ResidueColors[5], {
        label: 'Non-polymer',
        description: 'non-polymer color',
    }),
};
var preVal = '';
export function AntibodyColoringResidueColorTheme(ctx, props) {
    var color;
    var other = props['Other polymer'];
    var nonPolymer = props['Non-polymer'];
    if (ctx.structure &&
        !ctx.structure.isEmpty &&
        ctx.structure.models[0].customProperties.has(AntibodyColoringResidueProvider.descriptor)) {
        var l_1 = StructureElement.Location.create(ctx.structure);
        var model_1 = ctx.structure.model;
        color = function (location) {
            if (StructureElement.Location.is(location)) {
                var moleculeType = model_1.atomicHierarchy.derived.residue.moleculeType[model_1.atomicHierarchy.residueAtomSegments.index[location.element]];
                if (isPolymer(moleculeType)) {
                    return residueMapColor(props, getResidueInfo(location));
                }
                else {
                    return Color(nonPolymer);
                }
            }
            else if (Bond.isLocation(location)) {
                l_1.unit = location.aUnit;
                l_1.element = location.aUnit.elements[location.aIndex];
                return residueMapColor(props, getResidueInfo(l_1));
            }
            return Color(other);
        };
    }
    else {
        color = function () { return Color(other); };
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
export var AntibodyColoringResidueColorThemeProvider = {
    name: 'antibody-coloring-residue',
    label: 'Antibody/TCR',
    category: ColorThemeCategory.Residue,
    factory: AntibodyColoringResidueColorTheme,
    getParams: function (ctx) {
        return AntibodyColoringResidueColorThemeParams;
    },
    defaultValues: PD.getDefaultValues(AntibodyColoringResidueColorThemeParams),
    isApplicable: function (ctx) { var _a; return isApplicable((_a = ctx.structure) === null || _a === void 0 ? void 0 : _a.models[0]); },
    ensureCustomProperties: {
        attach: function (ctx, data, prop) {
            if (data.structure && prop) {
                if (preVal !== prop['CDR def.']) {
                    preVal = prop['CDR def.'];
                    return AntibodyColoringResidueProvider.attach(ctx, data.structure.models[0], { timeStamp: Date.now(), 'CDR def.': prop['CDR def.'] }, true);
                }
                else {
                    return Promise.resolve();
                }
            }
            else {
                return Promise.resolve();
            }
        },
        detach: function (data) {
            return (data.structure &&
                AntibodyColoringResidueProvider.ref(data.structure.models[0], false));
        },
    },
};
