/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

    // -----------------------------------
    // Init
    // -----------------------------------

    // Data-Sharing (do not remove)
    $scope.d = scopeDService;


    // -----------------------------------
    // Functions
    // -----------------------------------

    $scope.loadMainData = function() {
        // -----------------------------------
        // Get Data: d.dataMain
        // -----------------------------------
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);
                $scope.d.haveData = true;


                // Run App-Functions:
                $scope.setDataView();
                $scope.setCurrentResultDate();

            };

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();




    // -----------------------------------
    // Navigation
    // -----------------------------------

    $scope.d.navigator = 0;

    $scope.setCurrentResultDate = function() {
        var date = $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data.filled;

        $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data.filled_date = {
            'filled_datestamp': date,
            'filled_date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
            'filled_time': $filter("amDateFormat")(date, 'HH:mm')
        };

        //console.log('setCurrentResultDate', $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data);
    };


    $scope.prev = function() {
        var count = $scope.d.dataMain.calculations[0].calculation_results.length - 1;

        if ($scope.d.navigator === 0) {
            $scope.d.navigator = count;
        } else {
            $scope.d.navigator = $scope.d.navigator - 1
        };
        $scope.setCurrentResultDate();
    };

    $scope.next = function() {
        var count = $scope.d.dataMain.calculations[0].calculation_results.length - 1;

        if (count === $scope.d.navigator) {
            $scope.d.navigator = 0;
        } else {
            $scope.d.navigator = $scope.d.navigator + 1
        };
        $scope.setCurrentResultDate();

    };


    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------
    $scope.setDataView = function() {

        // If we have multiple surveys - make sure to take the right 'responses'.
        var currentResultGroup = 0;
        $scope.d.dataMain.survey_responses_group_definitions.forEach(function(current_group_def, myindex) {
            if (current_group_def.survey === 'aus_survey') {
                currentResultGroup = current_group_def.id;
            };
        });

        // Loop trough all responses from selected 'survey-group' above and save respnses in survey_responses_array
        $scope.d.dataMain.survey_responses_array = [];
        $scope.d.dataMain.survey_responses_group[currentResultGroup].forEach(function(current_result, myindex) {
            var my_response = current_result.entity.data.response;

            // If ng-survey survey @ some more info to 'response'.
            my_response.filled = current_result.entity.data.filled;
            my_response.survey_name = current_result.event.survey_name;

            $scope.d.dataMain.survey_responses_array.push(my_response);
        });
        var resultsArray = $scope.d.dataMain.survey_responses_array;


        // Init Responses
        $scope.d.grid = {};
        $scope.d.grid.rowData = $scope.d.functions.enrichResults(resultsArray);

        // automatic
        $scope.d.grid.columnDefs = $scope.d.functions.createColumnDefs($scope.d.grid.rowData, true);


        // DataView - Options
        $scope.d.grid.options = {
            headerHeight: 45,
            rowHeight: 28,
            rowData: $scope.d.grid.rowData,
            columnDefs: $scope.d.grid.columnDefs,
            //pinnedColumnCount: 1,
            dontUseScrolls: false,
            enableFilter: true,
            rowSelection: 'single',
            enableColResize: true,
            enableCellExpressions: true,
            enableSorting: true,
            showToolPanel: false
        };


        //console.log('dataGRID: ', $scope.d.grid);
    };


});
