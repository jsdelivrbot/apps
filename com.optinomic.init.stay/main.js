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


            $scope.d.haveData = true;
            // Run App-Functions:
            $scope.appInit();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    // -----------------------------------
    // Init
    // -----------------------------------
    $scope.appInit = function() {

        // Data
        $scope.d.nodeTree = 'init_stay';

        var current_pid = $scope.d.dataMain.params.PID;
        var current_sid = $scope.d.dataMain.params.stay_id;

        // Data-Model

        $scope.d.init_stay = {
            "treatment": [{
                "id": 0,
                "name": "Stationär",
                "description": "Stationärer Aufenthalt",
                "departments": [{
                    "id": 1,
                    "name": "EAS",
                    "description": "Entzugs- und Abklärungsstation",
                    "current_patient": {
                        "used": false
                    }
                }, {
                    "id": 2,
                    "name": "EP",
                    "description": "Entwöhnungsprogramm",
                    "current_patient": {
                        "used": false
                    }
                }]
            }, {
                "id": 1,
                "name": "Teilstationär",
                "description": "Teilstätionärer Aufenthalt",
                "departments": [{
                    "id": 1,
                    "name": "Tagesklinik",
                    "description": "Tagesklinik",
                    "current_patient": {
                        "used": false
                    }
                }]
            }, {
                "id": 2,
                "name": "Ambulant",
                "description": "Ambulanter Aufenthalt",
                "departments": [{
                    "id": 1,
                    "name": "Tagesklinik",
                    "description": "Tagesklinik",
                    "current_patient": {
                        "used": false
                    }
                }]
            }]
        };

        // Set Default: treatment_id = Array Position
        $scope.d.init_stay.selected = {
            "pid": current_pid,
            "sid": current_sid,
            "treatment_id": 0,
            "treatment": {}
        };

        // For saving the history
        $scope.d.init_stay.history_states = [];

        // Set Default
        $scope.changeTreatment();

        // Get Stored Data
        $scope.getInit();
    };



    // -----------------------------------
    // Button - Functions
    // -----------------------------------

    $scope.setCurrentTreatment = function(item) {
        $scope.d.init_stay.selected = item;
    };


    $scope.changeTreatment = function() {
        var treatment_id = $scope.d.init_stay.selected.treatment_id;
        $scope.d.init_stay.selected.treatment = $scope.d.init_stay.treatment[treatment_id];
        console.log('changeTreatment: ', $scope.d.init_stay.selected);
    };


    // -----------------------------------
    // Data - Functions
    // -----------------------------------

    $scope.saveInit = function() {

        var nodeTree = $scope.d.nodeTree;
        var history = $scope.d.init_stay.history_states;
        var data = $scope.d.init_stay.selected;


        // -------------------------------------
        // Build History - Array
        // -------------------------------------

        history.forEach(function(item, myindex) {
            item.current = false;
        });

        var date = new Date();
        var history_obj = {
            'data': data,
            'nodeTree': nodeTree,
            'current': true,
            'datestamp': date,
            'sort': $filter("amDateFormat")(date, 'YYYYMMDDHHmm'),
            'date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
            'time': $filter("amDateFormat")(date, 'HH:mm')
        };

        history.push(history_obj);


        console.log('(?) saveInit', nodeTree, history, data);
        // Save History - Array
        var api_call = dataService.saveAnnotationsData('patient', nodeTree, history);
        api_call.then(function(data) {

            var text = '(✓) ' + nodeTree + ': Erfolgreich gespeichert.';
            //console.log(text, angular.toJson(current_array_to_save, true));

            // Update Entrys
            $scope.d.functions.showSimpleToast(text);
            $scope.getInit();
        });
    };



    $scope.getInit = function() {

        var nodeTree = $scope.d.nodeTree;

        // -------------------------------------
        // Get History - Array
        // -------------------------------------

        var api_call = dataService.getAnnotationsData('patient', nodeTree);
        api_call.then(function(data) {

            console.log('(✓) getInit - data: ', data);


            $scope.d.init_stay.history_states = angular.copy(data);

            $scope.d.init_stay.history_states.forEach(function(item, myindex) {
                item.data.name = (myindex + 1) + '.) ' + item.data.treatment.name;

                // Check if 'current'?  Y:Save
                if (item.data.current) {
                    $scope.setCurrentTreatment(item.data);
                    console.log('(✓) setCurrentTreatment: ', item.data.data);
                };
            });

            console.log('(✓) getInit: ', $scope.d.init_stay.history_states);


        });
    };


});
