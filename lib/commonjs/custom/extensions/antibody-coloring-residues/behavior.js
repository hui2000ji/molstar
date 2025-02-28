"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntibodyColoringResidue = void 0;
const color_1 = require("./color");
const param_definition_1 = require("../../../mol-util/param-definition");
const behavior_1 = require("../../../mol-plugin/behavior/behavior");
const kabat_prop_1 = require("./provider/kabat-prop");
const chothia_prop_1 = require("./provider/chothia-prop");
const imgt_prop_1 = require("./provider/imgt-prop");
const north_prop_1 = require("./provider/north-prop");
exports.AntibodyColoringResidue = behavior_1.PluginBehavior.create({
    name: 'antibody-coloring-residue-prop',
    category: 'custom-props',
    display: {
        name: 'Antibody/TCR',
        description: 'Data from backend.',
    },
    ctor: class extends behavior_1.PluginBehavior.Handler {
        constructor() {
            super(...arguments);
            this.kabatProvider = kabat_prop_1.AntibodyColoringResidueKabatProvider;
            this.chothiaProvider = chothia_prop_1.AntibodyColoringResidueChothiaProvider;
            this.imgtProvider = imgt_prop_1.AntibodyColoringResidueImgtProvider;
            this.northProvider = north_prop_1.AntibodyColoringResidueNorthProvider;
        }
        register() {
            this.ctx.customModelProperties.register(this.kabatProvider, this.params.autoAttach);
            this.ctx.customModelProperties.register(this.chothiaProvider, this.params.autoAttach);
            this.ctx.customModelProperties.register(this.imgtProvider, this.params.autoAttach);
            this.ctx.customModelProperties.register(this.northProvider, this.params.autoAttach);
            this.ctx.representation.structure.themes.colorThemeRegistry.add(color_1.AntibodyColoringResidueColorThemeProvider);
        }
        update(p) {
            const updated = this.params.autoAttach !== p.autoAttach;
            this.params.autoAttach = p.autoAttach;
            this.params.showTooltip = p.showTooltip;
            this.ctx.customModelProperties.setDefaultAutoAttach(this.kabatProvider.descriptor.name, this.params.autoAttach);
            this.ctx.customModelProperties.setDefaultAutoAttach(this.chothiaProvider.descriptor.name, this.params.autoAttach);
            this.ctx.customModelProperties.setDefaultAutoAttach(this.imgtProvider.descriptor.name, this.params.autoAttach);
            this.ctx.customModelProperties.setDefaultAutoAttach(this.northProvider.descriptor.name, this.params.autoAttach);
            return updated;
        }
        unregister() {
            this.ctx.customModelProperties.unregister(kabat_prop_1.AntibodyColoringResidueKabatProvider.descriptor.name);
            this.ctx.customModelProperties.unregister(chothia_prop_1.AntibodyColoringResidueChothiaProvider.descriptor.name);
            this.ctx.customModelProperties.unregister(imgt_prop_1.AntibodyColoringResidueImgtProvider.descriptor.name);
            this.ctx.customModelProperties.unregister(north_prop_1.AntibodyColoringResidueNorthProvider.descriptor.name);
            this.ctx.representation.structure.themes.colorThemeRegistry.remove(color_1.AntibodyColoringResidueColorThemeProvider);
        }
    },
    params: () => ({
        autoAttach: param_definition_1.ParamDefinition.Boolean(false),
        showTooltip: param_definition_1.ParamDefinition.Boolean(true),
    }),
});
