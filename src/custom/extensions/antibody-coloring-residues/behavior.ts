import { AntibodyColoringResidueColorThemeProvider } from './color';
import { ParamDefinition as PD } from '../../../mol-util/param-definition';
import { PluginBehavior } from '../../../mol-plugin/behavior/behavior';
import { AntibodyColoringResidueKabatProvider } from './provider/kabat-prop';
import { AntibodyColoringResidueChothiaProvider } from './provider/chothia-prop';
import { AntibodyColoringResidueImgtProvider } from './provider/imgt-prop';
import { AntibodyColoringResidueNorthProvider } from './provider/north-prop';

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

        private kabatProvider = AntibodyColoringResidueKabatProvider;

        private chothiaProvider = AntibodyColoringResidueChothiaProvider;

        private imgtProvider = AntibodyColoringResidueImgtProvider;

        private northProvider = AntibodyColoringResidueNorthProvider;

        register(): void {
            this.ctx.customModelProperties.register(
                this.kabatProvider,
                this.params.autoAttach
            );

            this.ctx.customModelProperties.register(
                this.chothiaProvider,
                this.params.autoAttach
            );

            this.ctx.customModelProperties.register(
                this.imgtProvider,
                this.params.autoAttach
            );

            this.ctx.customModelProperties.register(
                this.northProvider,
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
                this.kabatProvider.descriptor.name,
                this.params.autoAttach
            );

            this.ctx.customModelProperties.setDefaultAutoAttach(
                this.chothiaProvider.descriptor.name,
                this.params.autoAttach
            );

            this.ctx.customModelProperties.setDefaultAutoAttach(
                this.imgtProvider.descriptor.name,
                this.params.autoAttach
            );

            this.ctx.customModelProperties.setDefaultAutoAttach(
                this.northProvider.descriptor.name,
                this.params.autoAttach
            );
            return updated;
        }

        unregister() {
            this.ctx.customModelProperties.unregister(
                AntibodyColoringResidueKabatProvider.descriptor.name
            );

            this.ctx.customModelProperties.unregister(
                AntibodyColoringResidueChothiaProvider.descriptor.name
            );

            this.ctx.customModelProperties.unregister(
                AntibodyColoringResidueImgtProvider.descriptor.name
            );

            this.ctx.customModelProperties.unregister(
                AntibodyColoringResidueNorthProvider.descriptor.name
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
