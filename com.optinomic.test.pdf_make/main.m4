/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

    include(scripts/init.js)
    include(scripts/definitions.js)
    
    $scope.getAppFunctionsAPI = function() {
        var d = {};
    
        include(scripts/app_actinfo_ein.js)
        include(scripts/app_case.js)
    
        return d;
    };
    
    
    include(scripts/pdf_docs.js)
    
});
