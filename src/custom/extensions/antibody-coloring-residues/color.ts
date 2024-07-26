import {
    isApplicable,
    getResidueInfo,
    AntibodyColoringResidueProvider,
} from './prop';
import type { Location } from '../../../mol-model/location';
import { Bond, StructureElement } from '../../../mol-model/structure';
import { ColorTheme } from '../../../mol-theme/color';
import type { LocationColor } from '../../../mol-theme/color';
import type { ThemeDataContext } from '../../../mol-theme/theme';
import { Color } from '../../../mol-util/color';
import { ParamDefinition as PD } from '../../../mol-util/param-definition';
import { CustomProperty } from '../../../mol-model-props/common/custom-property';
import { ResidueModel } from '../../services/model/common.model';
import { isPolymer } from '../../../mol-model/structure/model/types';
import { ColorThemeCategory } from '../../../mol-theme/color/categories';

const ResidueColors = [
    Color.fromRgb(0, 0, 255), // blue
    Color.fromRgb(0, 255, 255), // cyan
    Color.fromRgb(255, 165, 0), // orange
    Color.fromRgb(255, 255, 0), // yellow
    Color.fromRgb(128, 0, 128), // purple
    Color.fromRgb(255, 255, 255), // white
];

function residueMapColor(props: PD.Values<Params>, data?: ResidueModel) {
    const hChain = props['VH/Vα FR'];
    const lChain = props['VL/Vβ FR'];
    const hCdr = props['VH/Vα CDR'];
    const lCdr = props['VL/Vβ CDR'];
    const other = props['Other polymer'];

    if (!data) {
        return Color(other);
    } else if (data.chain_type === null) {
        return Color(other);
    } else if (
        (data.chain_type === 'H' || data.chain_type === 'A') &&
    data.is_cdr
    ) {
        return Color(hCdr);
    } else if (data.chain_type === 'H' || data.chain_type === 'A') {
        return Color(hChain);
    } else if (
        (data.chain_type === 'L' ||
      data.chain_type === 'B' ||
      data.chain_type === 'K') &&
    data.is_cdr
    ) {
        return Color(lCdr);
    } else if (
        data.chain_type === 'L' ||
    data.chain_type === 'B' ||
    data.chain_type === 'K'
    ) {
        return Color(lChain);
    } else {
        return Color(other);
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
    'Other polymer': PD.Color(ResidueColors[4], {
        label: 'Other polymer',
        description: 'other-polymer color',
    }),
    'Non-polymer': PD.Color(ResidueColors[5], {
        label: 'Non-polymer',
        description: 'non-polymer color',
    }),
};

type Params = typeof AntibodyColoringResidueColorThemeParams;

let preVal = '';

export function AntibodyColoringResidueColorTheme(
    ctx: ThemeDataContext,
    props: PD.Values<Params>
): ColorTheme<Params> {
    let color: LocationColor;

    const other = props['Other polymer'];
    const nonPolymer = props['Non-polymer'];

    if (
        ctx.structure &&
    !ctx.structure.isEmpty &&
    ctx.structure.models[0].customProperties.has(
        AntibodyColoringResidueProvider.descriptor
    )
    ) {
        const l = StructureElement.Location.create(ctx.structure);

        const model = ctx.structure.model;

        color = (location: Location) => {
            if (StructureElement.Location.is(location)) {
                const moleculeType =
          model.atomicHierarchy.derived.residue.moleculeType[
              model.atomicHierarchy.residueAtomSegments.index[location.element]
          ];

                if (isPolymer(moleculeType)) {
                    return residueMapColor(props, getResidueInfo(location));
                } else {
                    return Color(nonPolymer);
                }
            } else if (Bond.isLocation(location)) {
                l.unit = location.aUnit;
                l.element = location.aUnit.elements[location.aIndex];
                return residueMapColor(props, getResidueInfo(l));
            }

            return Color(other);
        };
    } else {
        color = () => Color(other);
    }

    return {
        factory: AntibodyColoringResidueColorTheme,
        granularity: 'group',
        preferSmoothing: true,
        color: color,
        props: props,
        description:
      'Assigns residue colors according to the data from backend server.',
    };
}


export const AntibodyColoringResidueColorThemeProvider: ColorTheme.Provider<
Params,
'antibody-coloring-residue'
> = {
    name: 'antibody-coloring-residue',
    label: 'Antibody/TCR',
    category: ColorThemeCategory.Residue,
    factory: AntibodyColoringResidueColorTheme,
    getParams: (ctx) => {
        return AntibodyColoringResidueColorThemeParams;
    },
    defaultValues: PD.getDefaultValues(AntibodyColoringResidueColorThemeParams),
    isApplicable: (ctx: ThemeDataContext) =>
        isApplicable(ctx.structure?.models[0]),
    ensureCustomProperties: {
        attach: (ctx: CustomProperty.Context, data: ThemeDataContext, prop) => {
            if (data.structure && prop) {
                if (preVal !== prop['CDR def.']) {
                    preVal = prop['CDR def.'];
                    return AntibodyColoringResidueProvider.attach(
                        ctx,
                        data.structure.models[0],
                        { timeStamp: Date.now(), 'CDR def.': prop['CDR def.'] },
                        true
                    );
                } else {
                    return Promise.resolve();
                }
            } else {
                return Promise.resolve();
            }


        },
        detach: (data) => {
            return (
                data.structure &&
        AntibodyColoringResidueProvider.ref(data.structure.models[0], false)
            );
        },
    },
};
