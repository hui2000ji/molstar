import { __extends } from "tslib";
import { AntibodyColoringResidueColorThemeProvider } from './color';
import { ParamDefinition as PD } from '../../../mol-util/param-definition';
import { PluginBehavior } from '../../../mol-plugin/behavior/behavior';
import { AntibodyColoringResidueKabatProvider } from './provider/kabat-prop';
import { AntibodyColoringResidueChothiaProvider } from './provider/chothia-prop';
import { AntibodyColoringResidueImgtProvider } from './provider/imgt-prop';
import { AntibodyColoringResidueNorthProvider } from './provider/north-prop';
export var AntibodyColoringResidue = PluginBehavior.create({
    name: 'antibody-coloring-residue-prop',
    category: 'custom-props',
    display: {
        name: 'Antibody/TCR',
        description: 'Data from backend.',
    },
    ctor: /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.kabatProvider = AntibodyColoringResidueKabatProvider;
            _this.chothiaProvider = AntibodyColoringResidueChothiaProvider;
            _this.imgtProvider = AntibodyColoringResidueImgtProvider;
            _this.northProvider = AntibodyColoringResidueNorthProvider;
            return _this;
        }
        class_1.prototype.register = function () {
            this.ctx.customModelProperties.register(this.kabatProvider, this.params.autoAttach);
            this.ctx.customModelProperties.register(this.chothiaProvider, this.params.autoAttach);
            this.ctx.customModelProperties.register(this.imgtProvider, this.params.autoAttach);
            this.ctx.customModelProperties.register(this.northProvider, this.params.autoAttach);
            this.ctx.representation.structure.themes.colorThemeRegistry.add(AntibodyColoringResidueColorThemeProvider);
        };
        class_1.prototype.update = function (p) {
            var updated = this.params.autoAttach !== p.autoAttach;
            this.params.autoAttach = p.autoAttach;
            this.params.showTooltip = p.showTooltip;
            this.ctx.customModelProperties.setDefaultAutoAttach(this.kabatProvider.descriptor.name, this.params.autoAttach);
            this.ctx.customModelProperties.setDefaultAutoAttach(this.chothiaProvider.descriptor.name, this.params.autoAttach);
            this.ctx.customModelProperties.setDefaultAutoAttach(this.imgtProvider.descriptor.name, this.params.autoAttach);
            this.ctx.customModelProperties.setDefaultAutoAttach(this.northProvider.descriptor.name, this.params.autoAttach);
            return updated;
        };
        class_1.prototype.unregister = function () {
            this.ctx.customModelProperties.unregister(AntibodyColoringResidueKabatProvider.descriptor.name);
            this.ctx.customModelProperties.unregister(AntibodyColoringResidueChothiaProvider.descriptor.name);
            this.ctx.customModelProperties.unregister(AntibodyColoringResidueImgtProvider.descriptor.name);
            this.ctx.customModelProperties.unregister(AntibodyColoringResidueNorthProvider.descriptor.name);
            this.ctx.representation.structure.themes.colorThemeRegistry.remove(AntibodyColoringResidueColorThemeProvider);
        };
        return class_1;
    }(PluginBehavior.Handler)),
    params: function () { return ({
        autoAttach: PD.Boolean(false),
        showTooltip: PD.Boolean(true),
    }); },
});
