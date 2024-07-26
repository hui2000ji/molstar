import { __extends } from "tslib";
import { AntibodyColoringResidueProvider } from './prop';
import { AntibodyColoringResidueColorThemeProvider } from './color';
import { ParamDefinition as PD } from '../../../mol-util/param-definition';
import { PluginBehavior } from '../../../mol-plugin/behavior/behavior';
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
            _this.provider = AntibodyColoringResidueProvider;
            return _this;
        }
        class_1.prototype.register = function () {
            this.ctx.customModelProperties.register(this.provider, this.params.autoAttach);
            this.ctx.representation.structure.themes.colorThemeRegistry.add(AntibodyColoringResidueColorThemeProvider);
        };
        class_1.prototype.update = function (p) {
            var updated = this.params.autoAttach !== p.autoAttach;
            this.params.autoAttach = p.autoAttach;
            this.params.showTooltip = p.showTooltip;
            this.ctx.customModelProperties.setDefaultAutoAttach(this.provider.descriptor.name, this.params.autoAttach);
            return updated;
        };
        class_1.prototype.unregister = function () {
            this.ctx.customModelProperties.unregister(AntibodyColoringResidueProvider.descriptor.name);
            this.ctx.representation.structure.themes.colorThemeRegistry.remove(AntibodyColoringResidueColorThemeProvider);
        };
        return class_1;
    }(PluginBehavior.Handler)),
    params: function () { return ({
        autoAttach: PD.Boolean(false),
        showTooltip: PD.Boolean(true),
    }); },
});
