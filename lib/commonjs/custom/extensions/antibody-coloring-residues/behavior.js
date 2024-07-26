"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntibodyColoringResidue = void 0;
var tslib_1 = require("tslib");
var prop_1 = require("./prop");
var color_1 = require("./color");
var param_definition_1 = require("../../../mol-util/param-definition");
var behavior_1 = require("../../../mol-plugin/behavior/behavior");
exports.AntibodyColoringResidue = behavior_1.PluginBehavior.create({
    name: 'antibody-coloring-residue-prop',
    category: 'custom-props',
    display: {
        name: 'Antibody/TCR',
        description: 'Data from backend.',
    },
    ctor: /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.provider = prop_1.AntibodyColoringResidueProvider;
            return _this;
        }
        class_1.prototype.register = function () {
            this.ctx.customModelProperties.register(this.provider, this.params.autoAttach);
            this.ctx.representation.structure.themes.colorThemeRegistry.add(color_1.AntibodyColoringResidueColorThemeProvider);
        };
        class_1.prototype.update = function (p) {
            var updated = this.params.autoAttach !== p.autoAttach;
            this.params.autoAttach = p.autoAttach;
            this.params.showTooltip = p.showTooltip;
            this.ctx.customModelProperties.setDefaultAutoAttach(this.provider.descriptor.name, this.params.autoAttach);
            return updated;
        };
        class_1.prototype.unregister = function () {
            this.ctx.customModelProperties.unregister(prop_1.AntibodyColoringResidueProvider.descriptor.name);
            this.ctx.representation.structure.themes.colorThemeRegistry.remove(color_1.AntibodyColoringResidueColorThemeProvider);
        };
        return class_1;
    }(behavior_1.PluginBehavior.Handler)),
    params: function () { return ({
        autoAttach: param_definition_1.ParamDefinition.Boolean(false),
        showTooltip: param_definition_1.ParamDefinition.Boolean(true),
    }); },
});
