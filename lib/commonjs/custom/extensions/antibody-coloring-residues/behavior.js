"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntibodyColoringResidue = void 0;
var tslib_1 = require("tslib");
var color_1 = require("./color");
var param_definition_1 = require("../../../mol-util/param-definition");
var behavior_1 = require("../../../mol-plugin/behavior/behavior");
var kabat_prop_1 = require("./provider/kabat-prop");
var chothia_prop_1 = require("./provider/chothia-prop");
var imgt_prop_1 = require("./provider/imgt-prop");
var north_prop_1 = require("./provider/north-prop");
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
            _this.kabatProvider = kabat_prop_1.AntibodyColoringResidueKabatProvider;
            _this.chothiaProvider = chothia_prop_1.AntibodyColoringResidueChothiaProvider;
            _this.imgtProvider = imgt_prop_1.AntibodyColoringResidueImgtProvider;
            _this.northProvider = north_prop_1.AntibodyColoringResidueNorthProvider;
            return _this;
        }
        class_1.prototype.register = function () {
            this.ctx.customModelProperties.register(this.kabatProvider, this.params.autoAttach);
            this.ctx.customModelProperties.register(this.chothiaProvider, this.params.autoAttach);
            this.ctx.customModelProperties.register(this.imgtProvider, this.params.autoAttach);
            this.ctx.customModelProperties.register(this.northProvider, this.params.autoAttach);
            this.ctx.representation.structure.themes.colorThemeRegistry.add(color_1.AntibodyColoringResidueColorThemeProvider);
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
            this.ctx.customModelProperties.unregister(kabat_prop_1.AntibodyColoringResidueKabatProvider.descriptor.name);
            this.ctx.customModelProperties.unregister(chothia_prop_1.AntibodyColoringResidueChothiaProvider.descriptor.name);
            this.ctx.customModelProperties.unregister(imgt_prop_1.AntibodyColoringResidueImgtProvider.descriptor.name);
            this.ctx.customModelProperties.unregister(north_prop_1.AntibodyColoringResidueNorthProvider.descriptor.name);
            this.ctx.representation.structure.themes.colorThemeRegistry.remove(color_1.AntibodyColoringResidueColorThemeProvider);
        };
        return class_1;
    }(behavior_1.PluginBehavior.Handler)),
    params: function () { return ({
        autoAttach: param_definition_1.ParamDefinition.Boolean(false),
        showTooltip: param_definition_1.ParamDefinition.Boolean(true),
    }); },
});
