import { Bond, StructureElement } from '../../../mol-model/structure';
import { Color } from '../../../mol-util/color';
import { ParamDefinition as PD } from '../../../mol-util/param-definition';
import { isPolymer } from '../../../mol-model/structure/model/types';
import { ColorThemeCategory } from '../../../mol-theme/color/categories';
import { isApplicable, getResidueInfo } from './util';
import { AntibodyColoringResidueKabatProvider } from './provider/kabat-prop';
import { AntibodyColoringResidueChothiaProvider } from './provider/chothia-prop';
import { AntibodyColoringResidueImgtProvider } from './provider/imgt-prop';
import { AntibodyColoringResidueNorthProvider } from './provider/north-prop';
import { ChainIdColorTheme, ChainIdColorThemeParams } from '../../../mol-theme/color/chain-id';
import { UnitIndexColorTheme, UnitIndexColorThemeParams } from '../../../mol-theme/color/unit-index';
import { EntityIdColorTheme, EntityIdColorThemeParams } from '../../../mol-theme/color/entity-id';
import { EntitySourceColorTheme, EntitySourceColorThemeParams } from '../../../mol-theme/color/entity-source';
import { OperatorNameColorThemeParams, OperatorNameColorTheme } from '../../../mol-theme/color/operator-name';
import { ModelIndexColorTheme, ModelIndexColorThemeParams } from '../../../mol-theme/color/model-index';
import { StructureIndexColorTheme, StructureIndexColorThemeParams } from '../../../mol-theme/color/structure-index';
import { UniformColorTheme, UniformColorThemeParams } from '../../../mol-theme/color/uniform';
const DefaultColor = Color(0xFFFFFF);
const ResidueColors = [
    Color.fromRgb(0, 0, 255), // blue
    Color.fromRgb(0, 255, 255), // cyan
    Color.fromRgb(255, 165, 0), // orange
    Color.fromRgb(255, 255, 0), // yellow
    Color.fromRgb(128, 0, 128), // purple
    Color.fromRgb(255, 255, 255), // white
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
        // return Color(other);
        return otherPolymerColor(location, false);
    }
}
export const AntibodyColoringResidueColorThemeParams = {
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
    // 'Other polymer': PD.Color(ResidueColors[4], {
    //     label: 'Other polymer',
    //     description: 'other-polymer color',
    // }),
    'Other polymer': PD.MappedStatic('chain-id', {
        'chain-id': PD.Group(ChainIdColorThemeParams),
        'unit-index': PD.Group(UnitIndexColorThemeParams, { label: 'Chain Instance' }),
        'entity-id': PD.Group(EntityIdColorThemeParams),
        'entity-source': PD.Group(EntitySourceColorThemeParams),
        'operator-name': PD.Group(OperatorNameColorThemeParams),
        'model-index': PD.Group(ModelIndexColorThemeParams),
        'structure-index': PD.Group(StructureIndexColorThemeParams),
        'uniform': PD.Group(UniformColorThemeParams),
    }, { description: 'Use chain-id coloring for antibody atoms.' }),
    'Non-polymer': PD.Color(ResidueColors[5], {
        label: 'Non-polymer',
        description: 'non-polymer color',
    }),
};
function getOhterPolymerTheme(ctx, props) {
    switch (props.name) {
        case 'chain-id': return ChainIdColorTheme(ctx, props.params);
        case 'unit-index': return UnitIndexColorTheme(ctx, props.params);
        case 'entity-id': return EntityIdColorTheme(ctx, props.params);
        case 'entity-source': return EntitySourceColorTheme(ctx, props.params);
        case 'operator-name': return OperatorNameColorTheme(ctx, props.params);
        case 'model-index': return ModelIndexColorTheme(ctx, props.params);
        case 'structure-index': return StructureIndexColorTheme(ctx, props.params);
        case 'uniform': return UniformColorTheme(ctx, props.params);
    }
}
export function AntibodyColoringResidueColorTheme(ctx, props) {
    var _a;
    let color;
    // const other = props['Other polymer'];
    const nonPolymer = props['Non-polymer'];
    const cdr_definition = props['CDR def.'];
    const otherPolymerColor = (_a = getOhterPolymerTheme(ctx, props['Other polymer'])) === null || _a === void 0 ? void 0 : _a.color;
    let descriptor;
    if (cdr_definition === 'kabat') {
        descriptor = AntibodyColoringResidueKabatProvider.descriptor;
    }
    else if (cdr_definition === 'imgt') {
        descriptor = AntibodyColoringResidueImgtProvider.descriptor;
    }
    else if (cdr_definition === 'chothia') {
        descriptor = AntibodyColoringResidueChothiaProvider.descriptor;
    }
    else {
        descriptor = AntibodyColoringResidueNorthProvider.descriptor;
    }
    if (ctx.structure &&
        !ctx.structure.isEmpty &&
        ctx.structure.models[0].customProperties.has(descriptor)) {
        const l = StructureElement.Location.create(ctx.structure);
        const model = ctx.structure.model;
        color = (location) => {
            if (StructureElement.Location.is(location)) {
                const moleculeType = model.atomicHierarchy.derived.residue.moleculeType[model.atomicHierarchy.residueAtomSegments.index[location.element]];
                if (isPolymer(moleculeType)) {
                    return residueMapColor(ctx, location, props, getResidueInfo(location, props['CDR def.']));
                }
                else {
                    return Color(nonPolymer);
                }
            }
            else if (Bond.isLocation(location)) {
                l.unit = location.aUnit;
                l.element = location.aUnit.elements[location.aIndex];
                return residueMapColor(ctx, location, props, getResidueInfo(l, props['CDR def.']));
            }
            // return Color(other);
            return otherPolymerColor(location, false);
        };
    }
    else {
        color = () => Color(DefaultColor);
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
export const AntibodyColoringResidueColorThemeProvider = {
    name: 'antibody-coloring-residue',
    label: 'Antibody/TCR',
    category: ColorThemeCategory.Residue,
    factory: AntibodyColoringResidueColorTheme,
    getParams: (ctx) => {
        return AntibodyColoringResidueColorThemeParams;
    },
    defaultValues: PD.getDefaultValues(AntibodyColoringResidueColorThemeParams),
    isApplicable: (ctx) => { var _a; return isApplicable((_a = ctx.structure) === null || _a === void 0 ? void 0 : _a.models[0]); },
    ensureCustomProperties: {
        attach: (ctx, data, prop) => {
            if (data.structure && prop) {
                const cdr_definition = prop['CDR def.'];
                if (cdr_definition) {
                    if (cdr_definition === 'kabat') {
                        return AntibodyColoringResidueKabatProvider.attach(ctx, data.structure.models[0], void 0, true);
                    }
                    else if (cdr_definition === 'imgt') {
                        return AntibodyColoringResidueImgtProvider.attach(ctx, data.structure.models[0], void 0, true);
                    }
                    else if (cdr_definition === 'chothia') {
                        return AntibodyColoringResidueChothiaProvider.attach(ctx, data.structure.models[0], void 0, true);
                    }
                    else {
                        return AntibodyColoringResidueNorthProvider.attach(ctx, data.structure.models[0], void 0, true);
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
                AntibodyColoringResidueKabatProvider.ref(data.structure.models[0], false);
                AntibodyColoringResidueChothiaProvider.ref(data.structure.models[0], false);
                AntibodyColoringResidueImgtProvider.ref(data.structure.models[0], false);
                AntibodyColoringResidueNorthProvider.ref(data.structure.models[0], false);
            }
        },
    },
};
