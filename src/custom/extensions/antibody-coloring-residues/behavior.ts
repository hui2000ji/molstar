import { AntibodyColoringResidueProvider } from './prop';
import { AntibodyColoringResidueColorThemeProvider } from './color';
import { ParamDefinition as PD } from '../../../mol-util/param-definition';
import { PluginBehavior } from '../../../mol-plugin/behavior/behavior';

export const AntibodyColoringResidue = PluginBehavior.create<{
    autoAttach: boolean;
    showTooltip: boolean;
}>({
    name: 'antibody-coloring-residue-prop',
    category: 'custom-props',
    display: {
        name: 'Antibody/TCR',
        description: 'Data from backend.',
    },
    ctor: class extends PluginBehavior.Handler<{
        autoAttach: boolean;
        showTooltip: boolean;
    }> {
        private provider = AntibodyColoringResidueProvider;

        register(): void {
            this.ctx.customModelProperties.register(
                this.provider,
                this.params.autoAttach
            );

            this.ctx.representation.structure.themes.colorThemeRegistry.add(
                AntibodyColoringResidueColorThemeProvider
            );
        }

        update(p: { autoAttach: boolean; showTooltip: boolean }) {
            const updated = this.params.autoAttach !== p.autoAttach;
            this.params.autoAttach = p.autoAttach;
            this.params.showTooltip = p.showTooltip;
            this.ctx.customModelProperties.setDefaultAutoAttach(
                this.provider.descriptor.name,
                this.params.autoAttach
            );
            return updated;
        }

        unregister() {
            this.ctx.customModelProperties.unregister(
                AntibodyColoringResidueProvider.descriptor.name
            );
            this.ctx.representation.structure.themes.colorThemeRegistry.remove(
                AntibodyColoringResidueColorThemeProvider
            );
        }
    },
    params: () => ({
        autoAttach: PD.Boolean(false),
        showTooltip: PD.Boolean(true),
    }),
});
