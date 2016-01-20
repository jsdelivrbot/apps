include(../lib/js/angular/angular_app_init.js)
include(../lib/js/optinomic/data_module/service/api-service.js)
include(../lib/js/optinomic/data_module/service/scope-d-service.js)
include(../lib/js/optinomic/data_module/service/data-service.js)
include(../lib/js/optinomic/data_module/service/simplestatistics.js)
include(../lib/js/optinomic/data_module/directive/chart-timeline/timeline.js)
include(../lib/js/optinomic/data_module/directive/chart-tscore/tscore.js)
include(../lib/js/optinomic/data_module/directive/chart-stanine/stanine.js)
include(../lib/js/optinomic/data_module/directive/score-threshold/score-threshold.js)


document.addEventListener('WebComponentsReady', function () {
  angular.element(document).ready(function () {
    angular.bootstrap(document, ['optinomicApp']);
  });
});