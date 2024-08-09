import { ColorTheme } from '../../../mol-theme/color';
import type { ThemeDataContext } from '../../../mol-theme/theme';
import { Color } from '../../../mol-util/color';
import { ParamDefinition as PD } from '../../../mol-util/param-definition';
export declare const AntibodyColoringResidueColorThemeParams: {
    'CDR def.': PD.Select<string>;
    'VH/V\u03B1 FR': PD.Color;
    'VL/V\u03B2 FR': PD.Color;
    'VH/V\u03B1 CDR': PD.Color;
    'VL/V\u03B2 CDR': PD.Color;
    'Other polymer': PD.Mapped<PD.NamedParams<PD.Normalize<{
        value: Color;
        saturation: number;
        lightness: number;
    }>, "uniform"> | PD.NamedParams<PD.Normalize<{
        palette: PD.NamedParams<PD.Normalize<{
            maxCount: any;
            hue: any;
            chroma: any;
            luminance: any;
            sort: any;
            clusteringStepCount: any;
            minSampleCount: any;
            sampleCountFactor: any;
        }>, "generate"> | PD.NamedParams<PD.Normalize<{
            list: any;
        }>, "colors">;
        asymId: "auth" | "label";
    }>, "chain-id"> | PD.NamedParams<PD.Normalize<{
        palette: PD.NamedParams<PD.Normalize<{
            maxCount: any;
            hue: any;
            chroma: any;
            luminance: any;
            sort: any;
            clusteringStepCount: any;
            minSampleCount: any;
            sampleCountFactor: any;
        }>, "generate"> | PD.NamedParams<PD.Normalize<{
            list: any;
        }>, "colors">;
    }>, "entity-id"> | PD.NamedParams<PD.Normalize<{
        palette: PD.NamedParams<PD.Normalize<{
            maxCount: any;
            hue: any;
            chroma: any;
            luminance: any;
            sort: any;
            clusteringStepCount: any;
            minSampleCount: any;
            sampleCountFactor: any;
        }>, "generate"> | PD.NamedParams<PD.Normalize<{
            list: any;
        }>, "colors">;
    }>, "entity-source"> | PD.NamedParams<PD.Normalize<{
        palette: PD.NamedParams<PD.Normalize<{
            maxCount: any;
            hue: any;
            chroma: any;
            luminance: any;
            sort: any;
            clusteringStepCount: any;
            minSampleCount: any;
            sampleCountFactor: any;
        }>, "generate"> | PD.NamedParams<PD.Normalize<{
            list: any;
        }>, "colors">;
    }>, "model-index"> | PD.NamedParams<PD.Normalize<{
        palette: PD.NamedParams<PD.Normalize<{
            maxCount: any;
            hue: any;
            chroma: any;
            luminance: any;
            sort: any;
            clusteringStepCount: any;
            minSampleCount: any;
            sampleCountFactor: any;
        }>, "generate"> | PD.NamedParams<PD.Normalize<{
            list: any;
        }>, "colors">;
    }>, "structure-index"> | PD.NamedParams<PD.Normalize<{
        palette: PD.NamedParams<PD.Normalize<{
            maxCount: any;
            hue: any;
            chroma: any;
            luminance: any;
            sort: any;
            clusteringStepCount: any;
            minSampleCount: any;
            sampleCountFactor: any;
        }>, "generate"> | PD.NamedParams<PD.Normalize<{
            list: any;
        }>, "colors">;
    }>, "unit-index"> | PD.NamedParams<PD.Normalize<{
        palette: PD.NamedParams<PD.Normalize<{
            maxCount: any;
            hue: any;
            chroma: any;
            luminance: any;
            sort: any;
            clusteringStepCount: any;
            minSampleCount: any;
            sampleCountFactor: any;
        }>, "generate"> | PD.NamedParams<PD.Normalize<{
            list: any;
        }>, "colors">;
    }>, "operator-name">>;
    'Non-polymer': PD.Color;
};
type Params = typeof AntibodyColoringResidueColorThemeParams;
export declare function AntibodyColoringResidueColorTheme(ctx: ThemeDataContext, props: PD.Values<Params>): ColorTheme<Params>;
export declare const AntibodyColoringResidueColorThemeProvider: ColorTheme.Provider<Params, 'antibody-coloring-residue'>;
export {};
