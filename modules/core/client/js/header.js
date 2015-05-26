if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require("angular2/angular2");
var LayoutHeader = (function () {
    function LayoutHeader() {
    }
    LayoutHeader = __decorate([
        angular2_1.Component({
            selector: 'header'
        }),
        angular2_1.View({
            templateUrl: "./modules/core/client/views/header.client.view.html"
        })
    ], LayoutHeader);
    return LayoutHeader;
})();
exports.LayoutHeader = LayoutHeader;
