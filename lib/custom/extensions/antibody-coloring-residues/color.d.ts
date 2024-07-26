import { ColorTheme } from '../../../mol-theme/color';
import type { ThemeDataContext } from '../../../mol-theme/theme';
import { ParamDefinition as PD } from '../../../mol-util/param-definition';
export declare const AntibodyColoringResidueColorThemeParams: {
    'CDR def.': PD.Select<string>;
    'VH/V\u03B1 FR': PD.Color;
    'VL/V\u03B2 FR': PD.Color;
    'VH/V\u03B1 CDR': PD.Color;
    'VL/V\u03B2 CDR': PD.Color;
    'Other polymer': PD.Color;
    'Non-polymer': PD.Color;
};
type Params = typeof AntibodyColoringResidueColorThemeParams;
export declare function AntibodyColoringResidueColorTheme(ctx: ThemeDataContext, props: PD.Values<Params>): ColorTheme<Params>;
export declare const AntibodyColoringResidueColorThemeProvider: ColorTheme.Provider<Params, 'antibody-coloring-residue'>;
export {};
