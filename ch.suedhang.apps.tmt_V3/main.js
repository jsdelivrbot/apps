/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService, scopeDService) {

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
                $scope.initZScore();
                $scope.setExport();

            };

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();





    $scope.setExport = function() {


        // ------------------------------------------------
        // Export - Pakete definieren
        // i n c l u d e _ a s _ j s _ s t r i n g 
        // => (export.sql) muss sich in /includes befinden
        // ------------------------------------------------


        // Hinzufügen gespeicherter SQL-Dateien in /includes
        var module_packages = [];
        var data_query = {};

        data_query = {
            name: 'WHQOL-Example (with stay)',
            sql: include_as_js_string(
                export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);

    };



    $scope.initZScore = function() {
        $scope.d.zScore = {};
        $scope.d.zScore.init = false;

        // Toggles | Grafiken
        $scope.d.zScore.toggles = {
            "show_clinicsample": false,
            "show_text": true
        };

        // Klinische Stichprobe
        $scope.d.zScore.normgruppe_klinik = {};
        $scope.d.zScore.normgruppe_klinik.selected_pg_id = 0;



        // ToDo: 'Echte Daten setzen'
        // TMT - A

        $scope.d.zScore.tmt_a = {};

        $scope.d.zScore.tmt_a.eintritt = {
            "zscore": 1.2,
            "zscore_min": -5.2,
            "zscore_max": 3.1,
            "text_left": "Eintritt",
            "text_left_caption": "21.4.2016",
            "text_right": "TMT A",
            "text_right_caption": "",
            "clinicsample_start": -2,
            "clinicsample_end": 1.8
        };

        $scope.d.zScore.tmt_a.austritt = {
            "zscore": 3.2,
            "zscore_min": -5.2,
            "zscore_max": 3.1,
            "text_left": "Austritt",
            "text_left_caption": "21.5.2016",
            "text_right": "TMT A",
            "text_right_caption": "",
            "clinicsample_start": -2,
            "clinicsample_end": 1.8,
            "marker_1_score": -3.4,
            "marker_1_text": "Zeitabbruch"
        };


        // TMT - B

        $scope.d.zScore.tmt_b = {};

        $scope.d.zScore.tmt_b.eintritt = {
            "zscore": -1.2,
            "zscore_min": -5.2,
            "zscore_max": 3.1,
            "text_left": "Eintritt",
            "text_left_caption": "21.4.2016",
            "text_right": "TMT A",
            "text_right_caption": "",
            "clinicsample_start": -2,
            "clinicsample_end": 1.8
        };

        $scope.d.zScore.tmt_b.austritt = {
            "zscore": -5.2,
            "zscore_min": -5.2,
            "zscore_max": 3.1,
            "text_left": "Austritt",
            "text_left_caption": "21.5.2016",
            "text_right": "TMT A",
            "text_right_caption": "",
            "clinicsample_start": -2,
            "clinicsample_end": 1.8,
            "marker_1_score": -3.4,
            "marker_1_text": "Zeitabbruch"
        };

        $scope.d.zScore.tmt_b_a_quotient = {
            "zscore": 0.44,
            "zscore_min": -3,
            "zscore_max": 3,
            "text_left": "Quotient B/A",
            "text_left_caption": "Zeit",
            "text_right": "2.07",
            "text_right_caption": "Quotient",
            "clinicsample_start": -0.5,
            "clinicsample_end": 0.5
        };



        // Check if Eintritt & Austrittsmessung vorhanden
        var all_calculations = $scope.d.dataMain.calculations[0].calculation_results;
        var messungen_info = {
            "eintritt": false,
            "austritt": false,
            "anderer": false,
            "ein_und_austritt": false,
            "count": all_calculations.length
        };

        all_calculations.forEach(function(current_calc, myCalcIndex) {
            if (current_calc.Messzeitpunkt.Messzeitpunkt === 1) {
                messungen_info.eintritt = true;
            };
            if (current_calc.Messzeitpunkt.Messzeitpunkt === 2) {
                messungen_info.austritt = true;
            };
            if (current_calc.Messzeitpunkt.Messzeitpunkt === 3) {
                messungen_info.anderer = true;
            };
        });

        if ((messungen_info.eintritt) && (messungen_info.austritt)) {
            messungen_info.ein_und_austritt = true;
        };

        $scope.d.zScore.messungen_info = messungen_info;


        $scope.d.zScore.init = true;

        // Bei Änderunge ausführen.
        $scope.setZScore();
    };


    $scope.setZScore = function() {


        // Grafiken anpassen gemäss | Toggles
        $scope.d.zScore.tmt_a.eintritt.show_text = $scope.d.zScore.toggles.show_text;
        $scope.d.zScore.tmt_a.eintritt.show_clinicsample = $scope.d.zScore.toggles.show_clinicsample;
        $scope.d.zScore.tmt_a.austritt.show_text = $scope.d.zScore.toggles.show_text;
        $scope.d.zScore.tmt_a.austritt.show_clinicsample = $scope.d.zScore.toggles.show_clinicsample;
        $scope.d.zScore.tmt_b_a_quotient.show_text = $scope.d.zScore.toggles.show_text;
        $scope.d.zScore.tmt_b_a_quotient.show_clinicsample = $scope.d.zScore.toggles.show_clinicsample;
        $scope.d.zScore.tmt_b.eintritt.show_text = $scope.d.zScore.toggles.show_text;
        $scope.d.zScore.tmt_b.eintritt.show_clinicsample = $scope.d.zScore.toggles.show_clinicsample;
        $scope.d.zScore.tmt_b.austritt.show_text = $scope.d.zScore.toggles.show_text;
        $scope.d.zScore.tmt_b.austritt.show_clinicsample = $scope.d.zScore.toggles.show_clinicsample;
        $scope.d.zScore.tmt_b_a_quotient.show_numbers = true;



        if ($scope.d.zScore.messungen_info.ein_und_austritt) {
            $scope.d.zScore.tmt_a.eintritt.show_numbers = false;
            $scope.d.zScore.tmt_a.austritt.show_numbers = true;
            $scope.d.zScore.tmt_b.eintritt.show_numbers = false;
            $scope.d.zScore.tmt_b.austritt.show_numbers = true;
        } else {
            $scope.d.zScore.tmt_a.eintritt.show_numbers = true;
            $scope.d.zScore.tmt_a.austritt.show_numbers = false;
            $scope.d.zScore.tmt_b.eintritt.show_numbers = true;
            $scope.d.zScore.tmt_b.austritt.show_numbers = false;
        };

        console.log('setZScore', $scope.d.zScore);
    };



});
