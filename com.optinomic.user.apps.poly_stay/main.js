/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, $q, dataService, scopeDService) {

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
            $scope.initApp();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    $scope.initApp = function() {
        var app = {
            "patients": {
                "odbc": false,
                "loaded": false,
                "data": []
            },
            "status": {
                "text": "Applikation initialisieren."
            }
        };

        $scope.d.app = app;

        $scope.getPatientList();
    };


    $scope.getPatientList = function() {
        // Init - Params

        $scope.d.app.status.text = "Patienten (in aktueller Behandlung) laden.";

        var patientListFilter = {
            "gender": '',
            "city": null,
            "zip_code": null,
            "age_over": null,
            "age_under": null,
            "in_stay": 'True',
            "lead_therapist": null,
            "cis_lead_doctor": null,
            "stay_start_before": null,
            "stay_start_after": null,
            "stay_stop_before": null,
            "stay_stop_after": null
        };


        var myAPI = dataService.getPatientsStays(patientListFilter);

        myAPI.then(function(data) {
            console.log('success: getPatientList', data);
            $scope.d.app.status.text = "Patienten (in aktueller Behandlung) geladen.";


            $scope.d.app.patients.loaded = true;
            $scope.d.app.patients.data = {};



            var dataPromiseODBC = $scope.getODBCData(data.patients);
            dataPromiseODBC.then(function(data) {
                $scope.d.app.patients.odbc = true;
                $scope.d.app.status.text = "Belegung aller Patienten ermittelt.";


                console.log('(YES) dataPromiseODBC', data);
                $scope.d.app.patients.data = data;


                var dataPromiseSaveAnnotation = $scope.saveODBCData(data);
                dataPromiseSaveAnnotation.then(function(data) {
                    $scope.d.app.patients.saved = true;
                    $scope.d.app.status.text = "Belegung aller Patienten gespeichert.";


                    console.log('(YES) dataPromiseSaveAnnotation', data);
                    $scope.d.app.patients.data = data;

                });

            });


        });


    };


    $scope.getODBCData = function(patients) {

        // Init - Params

        // Actions
        var actions = patients.length;
        var actions_count = 0;

        // Init
        var deferred = $q.defer();
        var api = '';
        var return_data = {};


        // Get poly_pid | poly_fid
        patients.forEach(function(patient, my_patient_index) {
            actions = actions + patient.data.stays.length;
            actions_count = actions_count + 1;




            patient.data.stays.forEach(function(stay, my_stay_index) {
                var cis_fid_str = stay.data.cis_fid.toString();
                cis_fid_str = cis_fid_str.substring(0, (cis_fid_str.length - 2));

                stay.poly_pid = parseInt(cis_fid_str.substring(0, (cis_fid_str.length - 2)));
                stay.poly_fid = parseInt(cis_fid_str.substring((cis_fid_str.length - 1), (cis_fid_str.length)));



                var sql = include_as_js_string(belegung_history_from_fid.sql);
                sql = sql.replace("%poly_pid%", stay.poly_pid);
                sql = sql.replace("%poly_fid%", stay.poly_fid);



                // INIT
                var format = 'json';
                var delimitter = ';';
                var including_headers = 'True';
                var direct = 'True';

                //dataService.runDataSource = function(my_query, my_source, my_delimiter, my_including_headers, my_format, my_direct)
                var api = dataService.runDataSource(sql, 'Polypoint', delimitter, including_headers, format, direct);
                var aODBC = dataService.getData(api);

                aODBC.then(function(data) {


                    stay.polypoint_belegung = data;


                    // Belegungstyp festlegen
                    stay.belegung = {
                        "art": [{
                            "id": 0,
                            "name": "Unbekannt"
                        }, {
                            "id": 1,
                            "name": "EAS"
                        }, {
                            "id": 2,
                            "name": "EP"
                        }, {
                            "id": 3,
                            "name": "EAS & EP"
                        }, {
                            "id": 4,
                            "name": "TK"
                        }],
                        "current": {}
                    };
                    // Init - Undefined
                    stay.belegung.current = stay.belegung.art[0];

                    // console.log('DEBUG data', data);

                    if (data) {
                        data.rows.forEach(function(bel, my_bel_index) {
                            if ((bel.ORG === "EAS") && (stay.belegung.current.id === 0)) {
                                stay.belegung.current = stay.belegung.art[1];
                            };
                            if ((bel.ORG === "EAS") && (stay.belegung.current.id === 2)) {
                                stay.belegung.current = stay.belegung.art[3];
                            };
                            if ((bel.ORG === "EP") && (stay.belegung.current.id === 0)) {
                                stay.belegung.current = stay.belegung.art[2];
                            };
                            if ((bel.ORG === "EP") && (stay.belegung.current.id === 1)) {
                                stay.belegung.current = stay.belegung.art[3];
                            };
                            if ((bel.ORG === "TK") && (stay.belegung.current.id === 0)) {
                                stay.belegung.current = stay.belegung.art[4];
                            };
                        });

                        stay.belegung.current.optinomic_pid = patient.data.pid;
                        stay.belegung.current.optinomic_fid = stay.id;

                        stay.belegung.current.polypoint_paid = data.rows[0].PAID;
                        stay.belegung.current.polypoint_pid = data.rows[0].PID;
                        stay.belegung.current.polypoint_faid = data.rows[0].FAID;
                        stay.belegung.current.polypoint_fid = data.rows[0].FID;

                        stay.belegung.current.versicherungsnummer = data.rows[0].VERSICHERUNGSNUMMER;
                        stay.belegung.current.eintritt = data.rows[0].EINTRITT;
                        stay.belegung.current.eintritt_zeit = data.rows[0].ZEITEINTRITT;
                        stay.belegung.current.austritt = data.rows[0].AUSTRITT;
                        stay.belegung.current.austritt_zeit = data.rows[0].ZEITAUSTRITT;
                        stay.belegung.current.org_current = data.rows[0].ORG_CURRENT;

                    } else {
                        stay.polypoint_belegung = null;
                    };

                    var init_name = stay.id + "__bel_"

                    stay.annotation_obj = {
                        "bel_selector": stay.belegung.current,
                        "bel_all": stay.polypoint_belegung
                    };

                    // Status setzen.
                    $scope.d.app.status.text = "Belegung der Patienten (" + my_patient_index + "/" + patients.length + ") ermitteln.";


                    // Deferred when done.
                    actions_count = actions_count + 1;
                    if (dataService.checkSuccess(actions, actions_count)) {
                        deferred.resolve(patients);
                    };


                }, function(error) {

                    stay.polypoint_belegung = error;

                    // Error
                    deferred.reject(return_data);
                    console.log('-- Error:', error);
                });


                // console.log('STAY: ', my_patient_index, my_stay_index, sql);

                // stay.polypoint_belegung = {};
                // stay.polypoint_belegung = $scope.runODBC(sql);


            });
        });

        return deferred.promise;
    };


    $scope.saveODBCData = function(patients) {

        // Init - Params

        // Actions
        var actions = patients.length;
        var actions_count = 0;

        // Init
        var deferred = $q.defer();
        var api = '';
        var return_data = {};


        // Get poly_pid | poly_fid
        patients.forEach(function(patient, my_patient_index) {

            var annotation_array = [];
            patient.data.stays.forEach(function(stay, my_stay_index) {
                annotation_array.push(stay.annotation_obj);
            });


            //dataService.runDataSource = function(my_query, my_source, my_delimiter, my_including_headers, my_format, my_direct)
            var api_write = dataService.putPatientModuleAnnotations(angular.toJson(annotation_array), patient.data.pid, 'com.optinomic.init.poly_stay');

            var aPromise = dataService.getData(api_write);
            aPromise.then(function(data) {

                // Deferred when done.
                actions_count = actions_count + 1;
                if (dataService.checkSuccess(actions, actions_count)) {
                    deferred.resolve(patients);
                };


                $scope.d.app.status.text = "Belegung der Patienten (" + my_patient_index + "/" + patients.length + ") gespeichert.";

                console.log('(✓) saveAnnotationsData =', annotation_array);
                deferred.resolve(return_data);

            }, function(error) {
                // Error
                deferred.reject(error);
                console.log('ERROR: saveAnnotationsData', error);
            });
        });


        return deferred.promise;

    };

    $scope.downloadODBC = function() {

        var fileName = $scope.d.odbc.current.package.name;
        fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        fileName = fileName + '.json';

        var data = $scope.d.odbc.current.data;

        dataService.saveData(data, fileName);
    };






});
