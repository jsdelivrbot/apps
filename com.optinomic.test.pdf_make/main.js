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


            // Get all Templates
            $scope.d.templates = $scope.getTemplates();


            $scope.d.appData = {};

            $scope.loadAppData('ch.suedhang.apps.actinfo_ein', false);
            $scope.loadAppData('ch.suedhang.apps.actinfo_aus', false);
            $scope.loadAppData('ch.suedhang.apps.case.new', false);
            $scope.loadAppData('ch.suedhang.apps.aase-g', false);
            $scope.loadAppData('ch.suedhang.apps.tmt_V3', false);
            $scope.loadAppData('ch.suedhang.apps.bscl_anq', false);
            $scope.loadAppData('ch.suedhang.apps.bdi', false);
            $scope.loadAppData('ch.suedhang.apps.isk', false);
            $scope.loadAppData('ch.suedhang.apps.sci', false);
            $scope.loadAppData('com.optinomic.apps.whoqol', false);


            $scope.d.loader = {
                "actions": 10,
                "count": 0,
                "done": false
            };


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();





    // -----------------------------------
    // PDF-Make - Init
    // -----------------------------------

    $scope.getTemplates = function() {

        var d = {};


        // --------------------------------
        // Variablen
        // --------------------------------
        d.klinik = $scope.d.dataMain.config.data.customer.contact.name + '\n' + $scope.d.dataMain.config.data.customer.contact.slogan;


        d.patient = $scope.d.dataMain.patient.data.ansprache + ' ' + $scope.d.dataMain.patient.data.last_name + ' ' + $scope.d.dataMain.patient.data.first_name + ' (' + $scope.d.dataMain.patient.data.extras.birthday_age + ')';

        d.patient_adress = '';
        d.patient_adress = d.patient_adress + $scope.d.dataMain.patient.data.ansprache + '\n';
        d.patient_adress = d.patient_adress + $scope.d.dataMain.patient.data.last_name + ' ' + $scope.d.dataMain.patient.data.first_name + '\n';
        d.patient_adress = d.patient_adress + $scope.d.dataMain.patient.data.address1 + '\n';
        d.patient_adress = d.patient_adress + $scope.d.dataMain.patient.data.zip_code + ' ' + $scope.d.dataMain.patient.data.city;


        // --------------------------------
        // PDF - Templates
        // --------------------------------


        d.patientAddress_clinicLogo = {
            "alignment": 'left',
            "columns": [{
                "text": d.patient_adress
            }, {
                "width": 220,
                "image": 'data:image/png;base64,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'
            }]
        };


        // --------------------------------
        // PDF - Template-Functions
        // --------------------------------


        d.spacer = function(space) {

            space = space === undefined ? 10 : space;

            return {
                "text": '',
                "margin": [0, space, 0, space]
            };
        };

        d.title = function(title, subtitle) {

            title = title === undefined ? '' : title;
            subtitle = subtitle === undefined ? '' : subtitle;

            return {
                stack: [
                    // second column consists of paragraphs
                    {
                        text: title,
                        style: 'title'
                    }, {
                        text: subtitle,
                        style: 'caption'

                    }
                ],
                "margin": [0, 0, 0, 24]
            };
        };

        d.heading = function(style, text) {

            text = text === undefined ? '' : text;
            style = style === undefined ? 'h1' : style;

            if ((style !== 'h1') && (style !== 'h2') && (style !== 'h3')) {
                style = '';
            };

            return {
                "text": text,
                "style": style
            };
        };

        d.text = function(text) {

            text = text === undefined ? 'Optinomic' : text;

            return {
                "text": text,
                "style": 'p'
            };
        };

        d.caption = function(text) {

            text = text === undefined ? 'Optinomic' : text;

            return {
                "text": text,
                "style": 'caption'
            };
        };

        d.pageBreak = function(when) {
            when = when === undefined ? 'after' : when;
            return { "fontSize": 0, "text": '', "pageOrientation": "portrait", "pageBreak": when };
        };


        d.z_score = function(data, options) {
            var default_data = {
                "zscore": 1.2,
                "zscore_color": '#C5CAE9',
                "clinicsample_start": -2,
                "clinicsample_end": 1.8
            };

            var default_options = {
                "width": 280,
                "zscore_min": -3,
                "zscore_max": 3,
                "clinicsample_color": "#C5CAE9"
            };

            var grey = {
                "50": "#FAFAFA",
                "100": "#F5F5F5",
                "200": "#EEEEEE",
                "300": "#E0E0E0",
                "400": "#BDBDBD",
                "500": "#9E9E9E",
                "600": "#757575",
                "700": "#616161",
                "800": "#424242",
                "900": "#212121"
            };

            data = data === undefined ? default_data : data;
            options = options === undefined ? default_options : options;


            // Calculate

            options.count_steps = 0;
            if (options.zscore_min <= 0) {
                options.count_steps = Math.abs(options.zscore_min) + Math.abs(options.zscore_max);
            } else {
                options.count_steps = Math.abs(options.zscore_max) - Math.abs(options.zscore_min);
            };

            options.step_1 = options.width / options.count_steps;

            var get_x = function(value) {
                return Math.abs(options.zscore_min - value) * options.step_1
            };


            var canvas = [];
            var obj_to_push = {};

            // Basic Chart
            obj_to_push = {
                "type": "rect",
                "x": get_x(data.clinicsample_start),
                "y": 0,
                "w": get_x(data.clinicsample_end),
                "h": 30,
                "lineColor": grey["400"],
                "color": data.zscore_color
            };
            canvas.push(obj_to_push);

            obj_to_push = {
                "type": "rect",
                "x": 0,
                "y": 0,
                "w": options.width,
                "h": 30,
                "lineColor": grey["300"]
            };
            canvas.push(obj_to_push);

            for (i = 0; i < options.count_steps; i++) {
                var my_x = get_x(options.zscore_min + i + 1);
                obj_to_push = {
                    "type": "line",
                    "x1": my_x,
                    "y1": 0,
                    "x2": my_x,
                    "y2": 30,
                    "lineWidth": 1,
                    "lineColor": grey["300"]
                };
                canvas.push(obj_to_push);

                obj_to_push = {
                    "type": "line",
                    "x1": my_x,
                    "y1": 25,
                    "x2": my_x,
                    "y2": 35,
                    "lineWidth": 1,
                    "lineColor": grey["500"]
                };
                canvas.push(obj_to_push);

            };


            obj_to_push = {
                "type": "line",
                "x1": get_x(data.zscore),
                "y1": 15,
                "x2": get_x(0),
                "y2": 15,
                "lineWidth": 15,
                "lineColor": "#3F51B5"
            };
            canvas.push(obj_to_push);

            console.log(JSON.stringify(canvas, null, 2));

            return { "canvas": canvas };
        };



        // --------------------------------
        // Default Definition
        // --------------------------------

        d.default_definition = {
            "pageSize": 'A4',
            "pageOrientation": 'portrait',
            "info": {
                "title": "Optinomic | Druckvorlage",
                "author": d.klinik,
                "subject": d.patient,
                "keywords": d.patient + ', ' + d.klinik + ', Optinomic'
            },
            "header": {
                "columns": [
                    { "text": d.patient, "alignment": 'left', "style": 'header' },
                    { "text": d.klinik, "alignment": 'right', "style": 'header' }
                ]
            },
            "footer": function(currentPage, pageCount) {
                var obj = {
                    "columns": [
                        { "text": $scope.d.current_doc.name, "alignment": 'left', "style": 'footer' },
                        { "text": 'Seite ' + currentPage.toString() + '/' + pageCount.toString(), "alignment": 'right', "style": 'footer' }
                    ]
                };
                return obj;
            },
            "content": [],
            "styles": {
                "header": {
                    "fontSize": 11,
                    "bold": false,
                    "color": '#9E9E9E',
                    "margin": [40, 20, 40, 40]
                },
                "footer": {
                    "fontSize": 11,
                    "bold": false,
                    "color": '#9E9E9E',
                    "margin": [40, 0, 40, 40]
                },
                "title": {
                    "fontSize": 36,
                    "bold": false,
                    "color": '#616161',
                    "alignment": "left",
                    "margin": [0, 40, 0, 0]
                },
                "caption": {
                    "fontSize": 11,
                    "bold": false,
                    "color": '#9E9E9E',
                    "alignment": "left",
                    "margin": [3, 0, 0, 0]
                },
                "h1": {
                    "fontSize": 18,
                    "bold": false,
                    "color": '#424242',
                    "alignment": "left",
                    "margin": [0, 40, 0, 24]
                },
                "h2": {
                    "fontSize": 15,
                    "bold": false,
                    "color": '#212121',
                    "alignment": "left",
                    "margin": [0, 20, 0, 12]
                },
                "h3": {
                    "bold": true,
                    "color": '#212121',
                    "alignment": "left",
                    "margin": [0, 0, 0, 6]
                },
                "p": {
                    "color": '#212121',
                    "alignment": "left",
                    "margin": [0, 0, 0, 6]
                }
            }
        };

        return d;
    };

    $scope.setAssessmentCredentials = function(patient) {
        var assessment = {};
        assessment.login_pid = patient.data.cis_pid + '';

        // Password = YYYYMMDD
        var pw = 'Fehler';

        // console.log('?', patient.data.birthdate);

        if ((patient.data.birthdate !== '') && (patient.data.birthdate !== null) && (patient.data.birthdate !== undefined)) {
            pw = patient.data.birthdate;
            pw = pw.substring(0, 10);
            pw = pw.replace('-', '');
            pw = pw.replace('-', '');
        };

        assessment.login_pw = pw;

        return assessment;
    };

    $scope.pdf_make_init = function() {



        $scope.d.docDefinition = angular.copy($scope.d.templates.default_definition);

        // All Doc's here
        $scope.d.docs = [];
        var doc = {};

        // ----------------------------
        // Doc: Notizen
        // ----------------------------
        doc = {
            "id": 0,
            "name": "Notizen",
            "description": "Ein leeres Blatt für Gesprächsnotizen.",
            "content": []
        };

        var date = $filter("amDateFormat")(new Date(), 'DD.MM.YYYY');
        doc.content.push($scope.d.templates.text("Datum: " + date));

        // Safe
        $scope.d.docs.push(doc);


        // ----------------------------
        // Doc: Patienten-Assessment
        // ----------------------------
        doc = {
            "id": 2,
            "name": "Patienten-Assessment",
            "description": "Drucken der Zugangsdaten sowie einer Kurzeinführung für das Optinomic Patienten-Assessment.",
            "content": []
        };

        var zugangsdaten = $scope.setAssessmentCredentials($scope.d.dataMain.patient);

        var text_1 = "Sie finden im Patienten-Assessment einige Fragebögen, in denen Sie Aussagen zu verschiedenen Themen und Zeiträumen einschätzen sollen. Am Anfang jedes Fragebogens finden Sie eine kurze Anleitung. Lesen Sie diese bitte sorgfältig durch. Achten Sie dabei auf die rot markierten Angaben zu den Zeiträumen, auf die sich die Fragen und Aussagen beziehen. Diese können von Fragebogen zu Fragebogen unterschiedlich sein.";
        var text_2 = "Alle Fragebögen enthalten Aussagen. Ihre Aufgabe ist zu bewerten, inwieweit diese Aussagen auf Sie bzw. Ihre Situation zutreffen. Antworten Sie möglichst spontan – es gibt keine richtigen oder falschen Antworten. Wichtig ist, dass die jeweilige Antwort für Sie persönlich stimmt. Wir bitten Sie, die aufgeführten Fragebögen in der bestehenden Reihenfolge lückenlos zu bearbeiten. Zum starten JEDES EINZELNEN Fragebogens klicken Sie am rechten Rand des angegebenen Fragebogens auf „START“.";
        var text_3 = "Falls Sie Fragen nicht verstehen oder etwas unklar ist, wenden Sie sich an die anwesende Betreuungsperson.";


        doc.content.push($scope.d.templates.spacer(20));
        doc.content.push($scope.d.templates.patientAddress_clinicLogo);
        doc.content.push($scope.d.templates.spacer(20));
        doc.content.push($scope.d.templates.title(doc.name, $scope.d.templates.patient));

        doc.content.push($scope.d.templates.text(text_1));
        doc.content.push($scope.d.templates.text(text_2));
        doc.content.push($scope.d.templates.text(text_3));
        doc.content.push($scope.d.templates.heading('h1', 'Persönliche Zugangsdaten'));

        var credentials = {
            table: {
                widths: [60, '*'],
                body: [
                    [{ text: 'Login', color: 'grey', margin: [0, 6, 0, 6] }, { text: zugangsdaten.login_pid, fontSize: 16, margin: [0, 6, 0, 6] }],
                    [{ text: 'Passwort', color: 'grey', margin: [0, 6, 0, 6] }, { text: zugangsdaten.login_pw, fontSize: 16, margin: [0, 6, 0, 6] }]
                ]
            },
            layout: 'noBorders'
        };
        doc.content.push(credentials);

        // Safe
        $scope.d.docs.push(doc);


        // ----------------------------
        // Doc: Eintritts-Assessment
        // ----------------------------
        doc = {
            "id": 1,
            "name": "Eintritts-Assessment",
            "description": "Eintritts-Assessment der Klinik Südhang.",
            "content": []
        };
        doc.content.push($scope.d.templates.spacer(10));
        doc.content.push($scope.d.templates.patientAddress_clinicLogo);
        doc.content.push($scope.d.templates.spacer(20));
        doc.content.push($scope.d.templates.title(doc.name, $scope.d.templates.patient));
        doc.content = $scope.loadAppPDF(doc.content, 'ch.suedhang.apps.actinfo_ein');
        doc.content = $scope.loadAppPDF(doc.content, 'ch.suedhang.apps.case.new');

        doc.content.push($scope.d.templates.pageBreak());

        var bloc = {
            "alignment": 'left',
            "columns": [{
                stack: $scope.loadAppPDF([], 'ch.suedhang.apps.case.new'),
                "margin": [0, 0, 0, 6]
            }, {
                stack: $scope.loadAppPDF([], 'ch.suedhang.apps.case.new'),
                "margin": [0, 0, 0, 6]
            }],
            "columnGap": 24
        };

        doc.content.push(bloc);

        doc.content.push($scope.d.templates.pageBreak());
        doc.content.push($scope.d.templates.z_score());


        // Safe
        $scope.d.docs.push(doc);




        console.log('(DONE) pdf_make_init', $scope.d.docs);
    };


    // -----------------------------------
    // App - Functions
    // -----------------------------------

    $scope.checkDataLoaded = function(actions, count) {
        var return_boolean = false;
        if (count >= actions) {
            return_boolean = true;
        }
        return return_boolean;
    };

    $scope.loadAppPDF = function(content, app_identifier) {

        var pdf_array = angular.copy($scope.d.appData[app_identifier].pdf);

        pdf_array.forEach(function(d, arrayID) {
            content.push(d);
        });
        // console.log('After', content);

        return content;
    };

    $scope.loadAppData = function(app_identifier, load_full) {
        // -----------------------------------
        // Get Data: d.dataMain
        // -----------------------------------

        var dataPromiseApp = dataService.getMainAppData(app_identifier, load_full);
        dataPromiseApp.then(function(data) {
            $scope.d.loader.count = $scope.d.loader.count + 1;


            // Finishing: Console Info & Init = done.
            $scope.d.haveData = true;
            console.log('Loaded, ', app_identifier, $scope.d.appData);

            // Save Data to $scope.d
            $scope.d.appData[app_identifier] = {
                "data": data,
                "pdf": []
            };
            var run = $scope.getAppFunctionsAPI();
            $scope.d.appData.api = run;


            var pdf = $scope.d.appData[app_identifier].pdf

            if (app_identifier === 'ch.suedhang.apps.actinfo_ein') {
                pdf.push($scope.d.templates.heading('h2', 'ActInfo | Eintrittsfragebogen'));


                var act_info_ein_block = {
                    "alignment": 'left',
                    "columns": [{
                        "stack": [],
                        "margin": [0, 0, 0, 6]
                    }, {
                        "stack": [],
                        "margin": [0, 0, 0, 6]
                    }],
                    "columnGap": 24
                };



                var col_1 = act_info_ein_block.columns["0"].stack;
                col_1.push($scope.d.templates.text('Folgende Substanzen konsumierte ' + $scope.d.dataMain.patient.data.extras.anrede + ' vor dem aktuellen Entzug in der angegebenen Häufigkeit:'));

                var actinfo_ein_problemsubstanzen_tables = run.actinfo_ein_get_problemsubstanzen_table(data.survey_responses_group["0"]);
                actinfo_ein_problemsubstanzen_tables.forEach(function(table, myTableID) {
                    var table_to_push = {
                        "table": {
                            "widths": ['*', '*'],
                            "body": [
                                [{ text: 'Substanz', color: 'grey', fontSize: 11, margin: [0, 6, 0, 0] }, { text: 'Häufigkeit', color: 'grey', fontSize: 11, margin: [0, 6, 0, 0] }],
                            ]
                        },
                        "layout": 'lightHorizontalLines'
                    };

                    table.problemsubstanzen.forEach(function(ps, myTableID) {
                        var substanz = [{ text: ps.substanz, fontSize: 11, margin: [0, 3, 0, 3] }, { text: ps.label, fontSize: 11, margin: [0, 3, 0, 3] }];
                        table_to_push.table.body.push(substanz);
                    });
                    col_1.push(table_to_push);
                });

                var col_2 = act_info_ein_block.columns["1"].stack;
                col_2.push($scope.d.templates.heading('h3', 'Alkoholabhängigkeit (AUDIT)'));
                col_2.push($scope.d.templates.text('Grafik?'));

                col_2.push($scope.d.templates.heading('h3', 'Nikotinabhängigkeit'));
                col_2.push($scope.d.templates.text('Bei Eintritt in die Entwöhnungsbehandlung bestand keine / eine Ausprägung Nikotinabhängigkeit.'));

                pdf.push(act_info_ein_block);
            };


            if (app_identifier === 'ch.suedhang.apps.case.new') {

                pdf.push($scope.d.templates.heading('h2', 'Abschätzung der Schwere einer Alkoholabhängigkeit (CASE)'));
                pdf.push(run.getCaseList());
                pdf.push($scope.d.templates.caption('Interpretation: Ab 15 Punkten ist eine stationäre Therapie indiziert.'));

            };

            if (app_identifier === 'ch.suedhang.apps.aase-g') {
                run.hello();
            };


            // doc.content.push($scope.d.templates.heading('h2', 'Brief Symptom Checklist (BSCL)'));
            // doc.content.push($scope.d.templates.text('Der BSCL misst die subjektiv empfundenen Beeinträchtigung durch körperliche und psychische Symptome einer Person innerhalb der letzten 7 Tage.'));


            // Run pdf_make_init when all Data loaded
            if ($scope.checkDataLoaded($scope.d.loader.actions, $scope.d.loader.count)) {
                $scope.pdf_make_init();
                $scope.d.loader.done = true;
            };

        });
    };

    $scope.getAppFunctionsAPI = function() {
        var d = {};

        // 'ch.suedhang.apps.actinfo_ein'
        d.actinfo_ein_get_problemsubstanzen_table = function(results) {
            // var results = $scope.d.dataMain.survey_responses_group[0];

            var problemsubstanzen_label = {
                "answer_options": [{
                    "1": "täglich",
                    "2": "4-6 Tage pro Woche",
                    "3": "2-3 Tage pro Woche",
                    "4": "1 Tag pro Woche oder weniger",
                    "5": "kein Konsum",
                    "999": "nicht bekannt"
                }, {
                    "0": "0 bis 10 Zigaretten pro Tag",
                    "1": "11-20 Zigaretten pro Tag",
                    "2": "21-30 Zigaretten pro Tag",
                    "3": "31 und mehr Zigaretten pro Tag",
                    "999": "nicht bekannt"
                }]
            };

            var tables = [];


            // Problemsubstanzen ermitteln
            results.forEach(function(result, myindex) {
                console.log('ch.suedhang.apps.actinfo_ein ==== ', result);

                var response = result.entity.data.response;
                result.problemsubstanzen = [];

                var substanz = '';
                var answer_option = 0;
                var answer = 0;
                var my_result = {};
                var text = '';
                var obj_to_push = {};


                // Alkohol
                if (response['QNED0701[VNED070a]'] === 'Y') {
                    substanz = 'Alkohol'
                    answer_option = 0;
                    answer = parseInt(response.VNED073a);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                // Optiate
                if (response['QNED0702[VNED070ba]'] === 'Y') {
                    substanz = 'Heroin (Opiat)'
                    answer_option = 0;
                    answer = parseInt(response.VNED073ba);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0702[VNED070bb]'] === 'Y') {
                    substanz = 'Methadon (Opiat)'
                    answer_option = 0;
                    answer = parseInt(response.VNED073bb);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0702[VNED070bc]'] === 'Y') {
                    substanz = 'Buprenorphin (Opiat)'
                    answer_option = 0;
                    answer = parseInt(response.VNED073bc);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0702[VNED070bd]'] === 'Y') {
                    substanz = 'Fentanyl (Opiat)'
                    answer_option = 0;
                    answer = parseInt(response.VNED073bc);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0702[VNED070be]'] === 'Y') {
                    substanz = 'Andere Opioide' + response.VNED071be
                    answer_option = 0;
                    answer = parseInt(response.VNED073bd);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                // Kokain
                if (response['QNED0703[VNED070ca]'] === 'Y') {
                    substanz = 'Kokain-Pulver'
                    answer_option = 0;
                    answer = parseInt(response.VNED073ca);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0703[VNED070cb]'] === 'Y') {
                    substanz = 'Crack-Kokain'
                    answer_option = 0;
                    answer = parseInt(response.VNED073cb);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0703[VNED070cc]'] === 'Y') {
                    substanz = 'Anderer Kokain-Typ ' + response.VNED071cc
                    answer_option = 0;
                    answer = parseInt(response.VNED073cc);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                // Andere Stimulanzien
                if (response['QNED0704[VNED070da]'] === 'Y') {
                    substanz = 'Amphetamine'
                    answer_option = 0;
                    answer = parseInt(response.VNED073da);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0704[VNED070db]'] === 'Y') {
                    substanz = 'Methamphetamine (Crystal Meth, Ice, Thai-Pillen)'
                    answer_option = 0;
                    answer = parseInt(response.VNED073db);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0704[VNED070dc]'] === 'Y') {
                    substanz = 'MDMA und verwandte Stoffe (Ecstasy)'
                    answer_option = 0;
                    answer = parseInt(response.VNED073dc);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0704[VNED070dd]'] === 'Y') {
                    substanz = 'Synthetische Cathinone (Mephedron, Methylon, Methcathinon/Ephedron, MDPV, Methedron)'
                    answer_option = 0;
                    answer = parseInt(response.VNED073dd);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0704[VNED070de]'] === 'Y') {
                    substanz = 'Andere Stimulanzien ' + response.VNED071de
                    answer_option = 0;
                    answer = parseInt(response.VNED073de);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                // Hypnotika/Sedativa

                if (response['QNED0705[VNED070ea]'] === 'Y') {
                    substanz = 'Barbiturate (missbräuchlich)'
                    answer_option = 0;
                    answer = parseInt(response.VNED073ea);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0705[VNED070eb]'] === 'Y') {
                    substanz = 'Benzodiazepine (missbräuchlich)'
                    answer_option = 0;
                    answer = parseInt(response.VNED073eb);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0705[VNED070ec]'] === 'Y') {
                    substanz = 'GHB/GBL (K.O.-Tropfen)'
                    answer_option = 0;
                    answer = parseInt(response.VNED073ec);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0705[VNED070ed]'] === 'Y') {
                    substanz = 'Andere Schlaf-/Beruhigungsmittel ' + response.VNED071ed
                    answer_option = 0;
                    answer = parseInt(response.VNED073ed);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                // Halluzinogene

                if (response['QNED0706[VNED070fa]'] === 'Y') {
                    substanz = 'LSD'
                    answer_option = 0;
                    answer = parseInt(response.VNED073fa);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0706[VNED070fb]'] === 'Y') {
                    substanz = 'Ketamin'
                    answer_option = 0;
                    answer = parseInt(response.VNED073fb);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0706[VNED070fc]'] === 'Y') {
                    substanz = 'Andere Halluzinogene ' + response.VNED071fc
                    answer_option = 0;
                    answer = parseInt(response.VNED073fc);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                // Weitere Substanzen
                if (response['QNED0707[VNED070g]'] === 'Y') {
                    substanz = 'Flüchtige Stoffe'
                    answer_option = 0;
                    answer = parseInt(response.VNED073g);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0707[VNED070h]'] === 'Y') {
                    substanz = 'Cannabis'
                    answer_option = 0;
                    answer = parseInt(response.VNED073h);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0707[VNED070i]'] === 'Y') {
                    substanz = 'Tabak'
                    answer_option = 0;
                    answer = parseInt(response.VNED073i);
                    var answer_tabak = parseInt(response.VZET020);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    var my_tabak_result = problemsubstanzen_label.answer_options[1];
                    text = substanz + ': ' + my_result[answer] + ' (' + my_tabak_result[answer_tabak] + ')';

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer] + ' (' + my_tabak_result[answer_tabak] + ')'
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };

                if (response['QNED0707[VNED070j]'] === 'Y') {
                    substanz = response.VNED071j
                    answer_option = 0;
                    answer = parseInt(response.VNED073j);

                    my_result = problemsubstanzen_label.answer_options[answer_option];
                    text = substanz + ': ' + my_result[answer];

                    obj_to_push = {
                        "substanz": substanz,
                        "label": my_result[answer]
                    };

                    result.problemsubstanzen.push(obj_to_push);
                };


                var table_to_push = {
                    "problemsubstanzen": result.problemsubstanzen,
                    "datum": $filter("amDateFormat")(result.entity.data.response.VMEB001, 'DD.MM.YYYY')
                };

                tables.push(table_to_push);
            });

            return tables;
        };

        // 'ch.suedhang.apps.case.new'
        d.getCaseList = function() {

            var survey_responses = $scope.d.appData["ch.suedhang.apps.case.new"].data.survey_responses;

            var list_array = [];
            survey_responses.forEach(function(response, responseID) {

                var date = $filter("amDateFormat")(response.entity.data.filled, 'DD.MM.YYYY');
                var score = response.calculations["0"].calculation_result.score;
                var text = "Am " + date + " wies der Patient im CASE " + score + " Punkte auf."
                list_array.push(text);
            });

            return {
                "ul": list_array,
                "margin": [0, 0, 0, 6]
            };
        };


        // 'ch.suedhang.apps.aase-g'
        d.hello = function() {
            console.log('(HELLO) World!');
        };








        return d;
    };


    // -----------------------------------
    // PDF-Make - Handles
    // -----------------------------------

    $scope.pdf_open = function(doc) {
        console.log('(!) pdf_open', doc);
        $scope.d.current_doc = doc
        $scope.d.docDefinition.content = doc.content;

        pdfMake.createPdf($scope.d.docDefinition).open();
    };

    $scope.pdf_download = function(doc) {
        console.log('(!) pdf_download', doc);
        $scope.d.current_doc = doc
        $scope.d.docDefinition.content = doc.content;

        var datestamp = $filter("amDateFormat")(new Date(), 'YYYY_MM_DD__')
        var filename = datestamp + doc.name + '__' + $scope.d.dataMain.patient.data.last_name + '_' + $scope.d.dataMain.patient.data.first_name;
        filename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        filename = filename + '.pdf';

        pdfMake.createPdf($scope.d.docDefinition).download(filename);
    };

    // To Inline in Page |  No needed for now.
    $scope.pdf_create = function() {
        const pdfDocGenerator = pdfMake.createPdf($scope.d.docDefinition);
        pdfDocGenerator.getDataUrl((dataUrl) => {
            const targetElement = document.querySelector('#iframeContainer');
            const iframe = document.createElement('iframe');
            iframe.src = dataUrl;
            targetElement.appendChild(iframe);
        });
    };





});
