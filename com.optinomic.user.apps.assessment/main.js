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
        $scope.d.haveData = true;

        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;
            var current_template = $scope.d.dataMain.params.location.viewname;


            // Run App-Functions
            if (current_template === 'print_access') {
                $scope.appInit();
            };


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, current_template, $scope.d);

            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    $scope.appInit = function(selected_group) {

        $scope.d.app = {};
        $scope.d.app.selected_group = null;

        $scope.d.templates = $scope.getTemplates();

    };


    // -----------------------------------
    // PDF-Make - Init
    // -----------------------------------

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

    $scope.createPDF = function() {

        $scope.d.docDefinition = angular.copy($scope.d.templates.default_definition);

        var content = $scope.d.docDefinition.content;

        // Fill Content per Patient
        $scope.d.app.selected_group.patients.forEach(function(p, patientID) {

            var patient_full_name = p.data.extras.full_name;
            var patient_birthday_age = p.data.extras.birthday_age;



            var zugangsdaten = $scope.setAssessmentCredentials(p);

            var text_1 = "Sie finden im Patienten-Assessment einige Fragebögen, in denen Sie Aussagen zu verschiedenen Themen und Zeiträumen einschätzen sollen. Am Anfang jedes Fragebogens finden Sie eine kurze Anleitung. Lesen Sie diese bitte sorgfältig durch. Achten Sie dabei auf die rot markierten Angaben zu den Zeiträumen, auf die sich die Fragen und Aussagen beziehen. Diese können von Fragebogen zu Fragebogen unterschiedlich sein.";
            var text_2 = "Alle Fragebögen enthalten Aussagen. Ihre Aufgabe ist zu bewerten, inwieweit diese Aussagen auf Sie bzw. Ihre Situation zutreffen. Antworten Sie möglichst spontan – es gibt keine richtigen oder falschen Antworten. Wichtig ist, dass die jeweilige Antwort für Sie persönlich stimmt. Wir bitten Sie, die aufgeführten Fragebögen in der bestehenden Reihenfolge lückenlos zu bearbeiten. Zum starten JEDES EINZELNEN Fragebogens klicken Sie am rechten Rand des angegebenen Fragebogens auf „START“.";
            var text_3 = "Falls Sie Fragen nicht verstehen oder etwas unklar ist, wenden Sie sich an die anwesende Betreuungsperson.";

            // --------------------------------
            // PDF - Templates
            // --------------------------------




            content.push($scope.d.templates.spacer(10));
            content.push($scope.d.templates.patientAddress_clinicLogo);
            content.push($scope.d.templates.title('Patienten-Assessment', patient_full_name + ' (' + patient_birthday_age + ')'));
            content.push($scope.d.templates.text(text_1));
            content.push($scope.d.templates.text(text_2));
            content.push($scope.d.templates.text(text_3));
            content.push($scope.d.templates.heading('h1', 'Persönliche Zugangsdaten'));

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
            content.push(credentials);

            content.push($scope.d.templates.pageBreak());
        });

        content.push($scope.d.templates.heading('h1', ' Patienten- / Anwesenheitsliste'));
        var anwesenheit = {
            table: {
                widths: [40, '*'],
                body: [
                    [{ text: 'Anwesend', color: 'gray', fontSize: 9, margin: [0, 3, 0, 3] }, { text: ' Patient / Patientin', color: 'gray', margin: [0, 3, 0, 3] }]
                ]
            },
            layout: 'lightHorizontalLines'
        };

        // Fill Content per Patient
        $scope.d.app.selected_group.patients.forEach(function(p, patientID) {
            var patient_full_name = p.data.extras.full_name;
            var patient_birthday_age = p.data.extras.birthday_age;
            var patient_text = ['', { text: " " + patient_full_name + ' (' + patient_birthday_age + ')', margin: [0, 3, 0, 3] }]
            anwesenheit.table.body.push(patient_text);
        });
        content.push(anwesenheit);


    };

    $scope.getTemplates = function() {

        var d = {};


        // --------------------------------
        // Variablen
        // --------------------------------
        d.date = $filter("amDateFormat")(new Date(), 'DD.MM.YYYY');
        d.time = $filter("amDateFormat")(new Date(), 'HH:MM');

        d.klinik = $scope.d.dataMain.config.data.customer.contact.name + "\n" + $scope.d.dataMain.config.data.customer.contact.slogan;


        d.patient = $scope.d.dataMain.patient.data.ansprache + " " + $scope.d.dataMain.patient.data.last_name + " " + $scope.d.dataMain.patient.data.first_name + " (" + $scope.d.dataMain.patient.data.extras.birthday_age + ")";

        d.patient_adress = " ";
        d.patient_adress = d.patient_adress + $scope.d.dataMain.patient.data.ansprache + "\n ";
        d.patient_adress = d.patient_adress + $scope.d.dataMain.patient.data.last_name + " " + $scope.d.dataMain.patient.data.first_name + "\n";
        d.patient_adress = d.patient_adress + $scope.d.dataMain.patient.data.address1 + "\n ";
        d.patient_adress = d.patient_adress + $scope.d.dataMain.patient.data.zip_code + " " + $scope.d.dataMain.patient.data.city;


        // --------------------------------
        // PDF - Templates
        // --------------------------------

        d.images = {
            "optinomic_trademark": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAYAAAA5Od+KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4AYYCwEA1TPlUgAAKCRJREFUeNrtXXd8VMX2P3Pv9p7NZje9JySk0pEigggiKDzAB09sPMXGz2d5CraHBWzPhqhYUFGfgKDgEwVUQJAeCAkkIYW0TTbZbO97t9y7d35/hKAoyKYHnt/Ph3rvzJ0z35yZMzPnnAH4E3/iT1x6QP3dgEsBeiMFPC7B/XFvqyzE4ph6rStSq/OgwlzlYB6XUAJCuM1AVeuNlHlEgYolOYQ2Z5DCdcUwtRsDYAL1Tzf/Se554PbSIBXPhf1F70ccK7UMNZp9Ixzu4EiXK5gZpFlVIBiSB4IhIAnEwxgIhAAwhiAGYMUiDosA2mRSnkUm5ZbKpbyi5ATJsTEj1KfdHoYeOSSqz+T4k9wzwBjDus31sGBOGnrprbIUk9U/2+EMzLI7AkO8FCOiGRZY9pf3L6SMGP/ynCQQ8HgElkl5RrmU96NaJdgcHyv+6e2PqzwVe/8CqJc1+k9yAaD4pAWG5UfCh+tP552ud97d0OSe6vbQaYFgCGF8YSLDQQfZJIlAJORQKiW/aFCa/MuEOMm60nKr6/VnR/WaXP/T5NqdAfjXyyUwfpRGWV5tX1Tb4Lzbag+kBGm2VzoGYwACAYhEnGBctPinwZmKf994fco+nd4bumK4use/9z9L7g97WmDqxI/hvc/+OvpoqfnZNiM1ifIxnL74Nsbtmhwh51lSk2SrRw+LejNIs7ab/pLWo9/5nyR3yzYtFOQoOZu2Nt5WXmV7qs3kSw6FcLeG364AYwCxiBNKjJNsG16geqLF4D310KIcUMj5PVL//xy5r6wuh/hYMafouOm+phbP8zZHQNKf7cEYgMslIC5adDQpXnKH3RGoyM6MgMULs7tdN9GfgvU1Dh41wvTJ8YqyStvLtY2uFf1NLEC7scYwLOj03pH1Wtf6/MHKGYsXTobqOkf36+5v4foKH66rgfzBSnLT1oZHa+qcK5xumuynvYULAiGAuBhxTXqy7K9mq7/snRev6NZy6X9Cc8urbHDHTZmc/37ftPh0vevJgUgsQPsQrTdQgxqa3GsKcpS5C+7bC7hjLdUF9KqIlI8BoYBEB44a5dW1zlSd3pPI45GDvRSjcnuCmCAQyCQ8CNJslUhIGhNixdqCHKV2WL7KjTEAQXS/eTq9F+bfswfmTE++4XCx6TOj2ScfiMT+GhwSQXam4ofpkxMXtLZ5rXcuGNSlenpFzA/X10BakkxWfNI8rKnFO8XtCV7t9tBp/kBITtMswbIYdfw8IoSAQMDyeCQW8EmbVMKtUSr4O1MSJbsmjYs90WqgqCkT4rrcljc+qAB1pCBr1379loYmd/etlD4AxgAiIQcPy498bcVjwx7ftU/PXNOFPuhRcrf+2AwxaqFkz8G2a+u0rruMZt8Yj5cRMwx7zrbchQTqeM7lElgu5bniokV7EuIk74wbqdlTWmEN3Xd757j5dFMtTJsUz3lh1cn3Kqrsd9AM26ny/QmMAVSRAseIAtWNbi+9a+pVcTDhiphO1dEji3aaYYFDInjj/VN53//U8mSrwTvL6QryWfYXMi82FP76OU2zyGz1y22OwCyd3ntli967bniBaiVAXgOLyyCcU5YDR43w7idVoGv1Tmtocs8N0myfr2O7A4QA7PaAoqbe+ej0yQkljc0eW2fr6Da5R0vNYLL4eGs+r5lzut61wmCmUhmmfUOgO52JEADLYrDaA0qPl77fQ9FXvbnmi6UIYKdW52aSE6R/WL66zgFzZiRLv/2x+f9cbnrAz7PnQ4jFYDT7Jh47Yb7hRIXtE72RgliNKOzy3bKWt+/WgUBACj75ovapk6dsa1oN3tSe3ulBCCBIs1CvdeUdPm5at+rDyvuS4iWcohLzBctgjOFAkRFKyqxTTRb/BJbtusXZn0AIgPIxXL2BuvNvf0lVfvVdY6fKd5ncPQfbIGdQhGDD1/VPFpWYl1jtAXFvCnpmmRCxv8jw/Cury+8bOUTFKa86/0i174gBHv9Hgcxs9d3lpWj+pai1v5bb5giMam2jZn69vQmaWz1hl+0SufuLDHDVmGhy3eb6pZU1jiUOV7BPOhAhAJPFLzl2wvL8Wx9XLsrLVsKpGvvv3is+aYFd+1qHmG3+0eylY0NdUGbKx3B0es+cL96dKKhrdIVdluzsx46XWeCq2duBINDs4hOW522OoKQvNQMhAI+X4TndwYL7H3i8ZOsPzU3FBz8++3zHbh3c+tcdMKgwapGuxTuZ7cYmwEBB+5kyklN+ZpvR7DPt2Lo6rHKd1tzvf2qBV58emV512vGszRGI6I8hDyEAg8kXf6LC+tzs6cmaX89FYjEXSspvkjucgUmX0tLnYvJ6vLTGbPVfufdQW9jlOkXuoWITPPFAAb+x2b3UYPLl9KfAoRCGRp1n/K59+lvnzkgBk8UHAAB1WhdUVNmTXW46/TJQ2rMIBlmw2PwjN390NVFSbgmrTNjkYoxhx24dvPVR5VitznNjkO5frUAIgKIY1KL3/t9nX9bmfLtTBwAAh44aoc3kK/D5mch+bWAPI8RicLnpgoNHjZF2RzCsMmGTW1Fth+eWDOVpdZ5FdmdgQKwbEQIwWX2Jx05Yrlv82CE4eMwIx8usYLH5MwNBtr88SnsNPj8TV1HjiKpvCs+oCpvcfUeM8P5n1Rk6vfcqhhk4410wyILLHVzw9drJMU5XEEp2zkQ+PxPDhgZOG3sKPn9I6PHSal2rN6z3wyIXYwy79rVCQ7P7Spc7GD2QNAJjAKs9kF1Sbhl1tNQMQZrlMyGcdjlYyb8Fy2KxPxBKpnxMWO+HRW7xSQts+fhqrpdirgkEQ/0t4zlACMDnY3gmi3/EM8uK4Ie9reBwhjcnXUpACIAJsdBmpMBqD4RVJixyna4g7DnUpnG56dyBuCnAhDB4KXoE9t4j0LV6gO5nY6+3wLLt0RDham5YBwcl5VZgWSxze4IR/S3g+YAxgM8XSvnv902Kphavvb8t+d4UNBhkgQlz/R6W5tI0CxEKfkoohKXhvN8foHyMxOmiIwoGR2AB//L0Hmr3XOGCSBjeYV5YvUD5GfD5mKgQi3vGobbHgYEkUaRCxkuYOS2JFYYp/KUGgkAgl/FALApPvrDe8vtD4KEYGLgGKAKaZqHV4AWxkMPKJLzw1gqXEDAG4HCIUFyMiBIIwjsSCEtzEUJA9oCzWm+CJBFEKPiw8MH9bCAQKh/o7e0KCAIcbjddFa5sYWluhIIHUSoBw+EgDAPU15kgUEAo4FCREXyQy3j2phYPhAbYsq27kIq5VGFepDdcAsK2PJyuYDUC5OxvAS8ElsWm5hZPY4SCDzwuUcznE76BO410HggBCPic6vxspT5cR/WwyE1JlEKMRmQTCsnwT4r7GHIZzzVxbIy/MDcSEuIk1WIRt6W/29ST4HAIkMu4x5LSP/PnZoW3Ig2LXA5JwPB8lV4o4FQNpK3HDpwJbD6Rlx1hS4wTw01/STXKJNziy2XexRhAwCd9SgX/wENLh0FSfHghTmGRO2pIFORM2OyXS7nHOJyBtYbEAMDnEaBSCorm37MHJ8SK4db79zEatfB7gYAMXQ5DM0IAcin3dEaq/HhhjjLscmExlZQggScfLITEeMl+iZhDDagOwwBSCU+XliT9+crRMRAh58OYEWpIipMckEm5Tf3dvJ4Ah0NAVKRw1/xZuabxozRhlwtbDQtylDC8QHVEIeMdIAaQ8nJIBEoF/6dbbkw/Ha0WAgBAhJwPdy4Y1BAh52/kcQdQY7sAjAGkEm6bMoK/7vHnf4bUJFnYZcOW3Otl4POv6l3JCdIvRULOgDhRwxhAIuHaYzTCj//5zNHQnOnJAAAwf1YqvPjWSUhLlq5XyHmGgdDWroLDQRCjFm5f9nDhyfSU8IkF6AS5N89Nh6kT42D8KM13sdGiQwNBe7kcBHHRom1TJsQd/q3gMyYnwCP35lXHakTr+bwB0NguAGOACDnfkJYk+/juJQfZO27qXLRfp6SeMz0ZduxpMQxKU7wRoeB7+1MjMACoIgXN+dnKlTt/bqXvvS3rnOd52Ur4cP1pZuSQqPc0amFl/7W06+DzCUhOkHz2z3tzj/xlWlKny3eKXIQQTB4fB4sXZn+bkiB9SyTkdCc2uMvAGEAh5TGDMxSv33t79vFJ42LPG4F+xdAo+M9XdbVZaYpVchmPuZSGZwQACbGS8tysiHdWf1LFTpuU0KU6Oo131lZCjEak+v6nltUNTe4bg0zv5G06HzAGEApIJjNNvvreW7OebDVQnj+KXd35cyskxIol76yterm63nlfIBAa8NF+GANoooSOsSPUtz5417ZvMV7SpfQJXZqMFi8cDJSPsVx3dcKyrAx5CYdE0BdKgTGAQEBCRqp8c25WxFNfbdN6LhaUfM2EONh72OAZXqh6ISFWvJtDDmxmMW7fQ85Ilb3wwKKcHVW1d3c5L0aXLY0Fs9Pg8HFT9aSxsXekp8h287lEr1rQGAMIhSSTliRde8PUxMdYFruXPTwkrLIkgcDhCrYOy498OCVJWjdQNRdjAImYA7nZER+PGa5e+eq7FUx2hqLL9XVLTIwx3PJ/P0NhbmRUk87zemOze77LQ3N6o/MUcl4gPVn2XmKc5CmnO+gJl9gO2J0BiJDfD59sfHTqnoNt7ze1uJMG0hzckSqhMFe5Yd7M1AcMJp9l2qT4btXZIzRs2aYFjVoo375L9/d6rfths9UfTzPdj2THuH1rUa0S1mamyV9cMCdtY5uRosaPiu5Sff5ACAT8pfDxhrum7jtieLO5xTOI6YfMceeTUyrhskNyI7+YOjHuQb2BMs+bmdrtesMWq6nFAxIRFx0pMUX7A6G06joHGQphGJQmZwgCNU4aF2OKjJjHvPfZS0NLyqz3mqz+WW53UMWEMHQm82nHu1wOAXIZTx8XI9o4vED1wYqVJ6u/WXs1ZGd2z0fP46VBIubCS2+dzKquc65uNXgnBgL9m1IhQs7zpiXL/n3znPS32syUfdrE+B5J13vRGlavrYTMNDnveJl1klbnvsHlpicEaTbZ72cIDAACPhnicIhWpYJfIpfxNmZnyH/MSJEHdx/QDzNZfAtMFv9Et4dODwRDgo7EJ+2/2sdEhNDZFAtcDgFCAccrlXCr1SrBLo1atH7+rNRT1bWO0LUTuzdE/Rqbt2nBZPGBVMxNKioxP6ltcd/mctO83qPv98C4fetUoxY2DkqTL5s1LWlTQ5M7OPu65B77xgXJxRjDI88dhegoYebpBtfjJotvjttNS5kQhvYthI6i7X8/c+zmi9GIfs7Ljnj5oaeP7g213I4++LxGbbMHRlhs/iH+QCjfZPHLhAIyjiRRJAKAAM0aQiFsiooUWIUCsixaLSqO0YhK5s9Msen0FCTG9V7A/q79rSAScsQ/7GldUNvoethk9mUGabZXc1x3jEwyCZeOjxVvz8pQPPePOwaXFJWaYfTQnk3Le14xTBYfqFVCeHtt5XVFx00v6I2+AjqMbDAdqWajIgVNeVkRyx5dnP9F1WlHsDC3/ZjKHwhxftzbilISpUqaYaVnkog5TGafc9L4WMwhEQMAvZ5B/NcwW/2gUvLRm2tOpdQ2uh5qM1J/dbppdTjydgYdpAoFHCYygn8yK12+ZtL42A2Vpx2uO2/K7BWZf1ej3RmAFW+cgJxBEVP2HGz7WKf3xHXFqoyKFHhysyLu+HpH86ZVK0Z1OodSX2PzNi2oVQLOoWOmAr2RurPNSM1wuoIxgWCI7Iiy6Gz/d/Qbh4NALORQUSphRbRa+ElCrHjzvbctNpVVfQX52eGfz3YWv2vui2+dBAGfjDtRYdvc1OIe1Z3lQqxG1DRulOamNpPv0Iqlw3pNiJ5EabkVYjQizuZtjclanWeC20PPtdoDgykfowkEQvwQi4Fl8Rmb4dfd1/5vggAgEAIul8ACAemWiLlN6kjBAYWc/1XBYGVJQ5PLMW9WGqeoxCThconEhia3yGCiMAIEqkg+Sk6QUh4v3TxuZLSHCbFMZqq8y7KcQ25JmQWG5EUSS5Yfe+lEhfXR7oZlkCSCzFT5hntvz769rNIWvGVuej/S1jl0GHwV1XbB0VJLrMnqyzEYfdkIQZ7VHlCIRZxMys+QIQZjhAD4fBIRBHLQNNugUvKNBIHKYqNF5YlxkroZ1yTYT1TY0LETlgy9wTvRYg+McbuDg1kW4v3BkIim23MpcTkI8XgkhRC0yKS8qoRYcYVcxts6ojCq1mYPBGdc07n95XPIfe+zauCQKHfXfv0PegMV2xPrVIWc5xxRoJpttQd+Wrl8dH9z1g1ZfhnCPF6a5/YyEafrnYTLHQSSRJAQK4G4WJFfKec7Oops29UCUZEC7vbduhFtJmqRzR6Y5vbQ6kCQRRifT/vb0bF64PNILBFzTXIZb0dSvOTzSeNiDgVp1nf1uNiw2nyO3/Kufa2Ql62caHcGuk1sRyO9XlrucAVvWLl89E+Vp+0wuJvr1P7CbwyeIAAYL/Ru+71EXFj7xenMnw7qH23Qume7PEFlR2a9C9R5DjAG8AdCyOcPaWyOwO1Wu3+u2er/75C8yNevmP5t6SP35UGHc8KFcHZv+chxE3y5ZhJpNPtGBgI9FyXHhDDYHIERdY0uWbihh5cyyqtsIBFxyBdXnZy+52Db5rJTtjttjoCyq5n1OtIk2h1BSVWt4+bd+1o3zrw28W8TRkeTW7Zr/7DsWc2tqXcCh4O4Hi+d0JOHtBhjYBicotW5o0iSGLB+zz2Bj9bXAOVjyKdfKbmzus75ktHsUwB0LwdmBzrS5bcaqAx/IPRum8knv+2v6R+t/KCCfvCu3POWOau5pRVW+GGvHhyuno5KR+ClaCivsqOyqk4nHr1k8OW3jXD7vAxy8zbtnWWVtpcNpnZiewNWe0DeoHW98vlX9Q/eeH0K8c7a8zuanCVXoxJCSqIE+LxOJ5W7KLhcAtRRQoiOEvaWvP2KqloHzJ2RDK+/f+rvdY2ul+3OYK9n+3F6aElto+vJt9dWLbrv9mzydMPvI33ODsvDC1UweXws/vlQm78jYVdPQcDnOLMz5JddWCUAgMFEwQNPHYGrx8eOL62wLrPaA11fmHYCCACcrqC8scn9/JtrTjU06jw7jxw3w+hhv1wEeVZz42PEgGTvB/g88nhPRhUQ7ZcVlg/JjTTVNlx+U+5/v2+COTNS5MfLrM+0GameO90IAwgBGMy+yNIK27/ys5WaohLTOc/PspidoYDHlg6DGI3ogEjI6bEIOT6fYCMj+Duvv3VnaPZFTPdLDcUnLXDPrRuhotp2e3Or58pQP+S+YlkMBhM1vrzaduvjLxTDR+trzj47R0WHF6hg9DD1oWi18HBP+SUrpLyTEhH3uyG5kcAdYHFG3UVVrQO++X5hYlOLZxHlY3rFA+ViQKjdCUHfRt22fOnQxDbjL1PqOb2dkSqHDz6vdmamylYrZHxPd7T3zD11THKi9KMt27Vtt9146Ww9hoNDx4yw46cWKK2wTjFZ/IP722XH4Q7mGEy+uZ99WXv2/84htyBHCfNmpsLNc9K/LchRfiQRdy1spMM9JiVRumHcSM2nd9+SBend2AAfiNC1eeHVp0dym1u91/r8TF+eUp4XgUAIzBb/jDWvjhNv/KYBAM7j/Tjr2iT4fk9LcESh6unMVPkaqYTbqTDIM7GkODtTsWvqVfHP6I2U5+5bs8Kv4BKBzR6A73Y2p7rcwQGRjR1jAKc7mH+i0jaozUgBwAVcWxfOzwSCQM55s1IfG16gek0VKXASBPrDbDYdh9EKOc+bkSpbddUVMbds3qZtWNTF26wGOk7VOMBmD+RSPib8mMpeBEIAlJ9RWm2BwpJyKwD8gd/ydVcnQHWtwzFlQtyTE0ZH/zUrXf5flZLvEPBJIIhf/J4IAgGPS0BkBJ/KSlccGjtC8/erx8cuNdv8hk9XXdkjV7YNRNRrXWC1B7KCNNsvhtT5QNMsMpp9iXsPtQHlY/44m83C+ZmAMWbKquw/zp2RcqCm3pmj03tHUj6m0Gj2cQADqFUCkEi4NUlxkmOpydKSa64stGNs6lNXmb6G0xUEuYwHaY8f0vTH8udCYFkMAgGZ31Q8j3Oy0nbxa7x/RRIFAMfO/Drv7ZAd717OxAIAeCgaMMbcx54vHjSQ7izCGIDyMWIAQM2t3s7fCLZtlw4S48SiNetqxjTpPGNphs1GCLFcLnF81Uendk+dEFfh9tLM8IKozlZ9yaBO64ZYjQjcXrq/m/I7eCkGTlTYoKHJFT65NB0CLvd+MJiopJ37WpfrWr2zne6gOMRggHaf4/lyGc/cpPN8kJ2hePXV1eXOR+7L629ZewVpSe35TSVh5mDsS4iEJBTmKkHb4gk/EOz9/9TAp5seSio+aVlXUWW/xWz1i2maBRa3O4wFgiFkNPvUp2ocjx8vs7yck6WQf7KxNtzqLylIxBwAAIZmcMtAukgBIQCpmMsAAKQmScIjt6jEBH//W6agrMr2bG2ja+yFbrQ8c3sV2dTiWbTnYNudix87BL/dzL4coJDxYfrNP2I2hOtJzsAhlyAQMCFchtAKOiVRGh65Px82wIfranK1zZ4ZweAfO2ufubGLaGmjFn6y6sqE2k5cT3YpISleAjIp9xSXQ9D9vfXYAS6XgGi1sHX+PeNAJuFdnFynKwivrC4HmyMwye2hI8MdhZyuYEZphTWrotoeXoFLDFcMV8OgNLlWIuY6+rstAGf28oUcd5RSUNKRq+qi5OqNFJhPLQCGwdnhXp+GEADNsFyxkJNSVnl5utYoFXwozI08LZNwSwdCZp/23UF+Vf5gZVVHZp+LNovPJwFgDCACPJ20HXAgGPIJ+APPouwJiEVcWPTIAV+0RrhVwCf7fbXL55EQFyPaOXrYm/YpZ1JJXJTchFgR/P2hl4EN4aM8LhmWY+SZwwM3n0fWdgSBXW6YODYGbpiSCGqVcItcxjvZn2YVxgCRSr4uJUG64Z21N5/dRLoouVwOCRkpMtCohftlUm7NRb8E7UNElFJwcliBqjKjk1nPLiUkxIrhs011bTEa0VqhgOy3rHoCAQkpCdJ1C+dnVOYP/sXpP6zZIj1FBv+44xttRorsI5mUy1zsdCgqUkDlDY5Y88V/G1wpiQP2QpNu4+a56fDY/flw9bjYLxPiJEX9MfciBKCJEh7JSpe/vXLNKfzrlBJhNefG61Ng4zfzYeLYmNXpybI3IuQ8GgDOOQLE7RtVoIkSUAU5ymceuDNn4z/vzYPRw3o2oHigYewINWzbpTMkJ0iWqFXCtr5UXowBlBECc2aqfHlxmbV18vhzY4g6NVXs3q8HhYwn/n5vy4LqWudCpzs42B8I8REACAUkFRUpPJE/OOL9OxcM2tLc6qUHpV1e3hcXQmmFFQpzlPDsa6X3nDhle9NmD/B6e+PqTJAdXZijXPbso0Nf/nanDt8wJfGcdzrdhCMlJhg1JArWb2lQNDa7M23OQCRmMRutFlmyMhTVUjGHt7/IOMTtoVUkgewZqbKyLdubjds+n3xZnxaVVdkgLUkqWrnm1DNHS8wP2p1Bbm+JizGATMql87OVKxf+LfOZ5hYPdfX430f+9cjnA4EQ8PlPwycbb5tcVGJ6tqXNO9QfCHG4HCIUIedXpCRKli9fOmzr5m1aPHdGSq92cn9i32EDJMSJxZ9uqn2gtML6kMMZVPXGdxQynr8wN3LVjGsSnm1po6gLJf3sEXJfeuskRKtFWT8fbvu6sdmdxbLtE32H641aJTCOHqZe9P1PLd/+uPHaS16DO9aDwSBLaFs8PKGAlJAkcsRqROxTLx1n581MQZu3N91YU+dcbrb4M3sqJxeHg0CjErakp8qevvXGjA1Wm9/3RzZNt3v5yHETjB52Azz63KqXSyusS853AyZCAIMzI3565L686xua3NTk8eEFDw80bPi6HoRCDqeu0TXMZPFNMlv9QyiKUUgkXLWXYnSqCL5ZKuXtTEuWHrjzpizdipWlmTq994k2AzXb7aWlXQnjxLg9vaFEzKHiY8Xb87OV/77ntqxiqz2AVUrBH5bt9vZReZUNDh37RvDup9XDL3S1aXt8aSCrrtGViDGu7js6ega79rfC5BnbwGDyFVbXORcbLb5ZXi+tojvyapl8gBAUGM0+EPDJW5pbPHXL3yj57Kox0R+GQnD3D3ta1pksvrtsjsAUt4eW0QwLF/OYRKj9IEAi4roUct7O9BTZhqx0+Y4Tp2xUuCNft8kNBFlweWgIhdg/Dg9EwCMJxBsoJyjhovK0A7Iz5OSbr46de6TEtNxk9mXQv4uQb/+TZTF4KYbj9TFZDlfwBastMCwuRrRYJuXunDoxfn9VrX14Q5P7SpsjMNLnD+V6vLSCYTCfJJAEACDEYg9JoIBEwrVLRBytXMY7rFEJf8hIkx1vaHL750xPhs7YLN0mNztDAZPGxQR27G6pMZh9E87nMIYQApGQc1ooJLVWW3i3Ng8EVFTZ4NV3yyEzVTbzxCnb+21GSt4uz4XLdDxze2g4VWOf4/bQeMpVcfcXnzAbHr4n9wAAHGjUeXh1jS5NUYlJIhZxNepIQTIAgMnq1zqcQeOYEWpPRorMnJokDQAA7tDUh+7qXPt7xLJZuuIYJMaJx+0vMn7ZZqSiz8kvh9tzG+YPVt61fFnReuy/95IwqDDG8OxrpSAWcXJKyqyb9EZqcOfrABAKSBhWoPr8gUU5d2ub3dSoHs4S90fokV6u07ogLUlKvPZexYLSCuu/LFZ/RpBmgUMikMt4hpRE6Stzpie/1dDkjjFZfWNZFkQEAXsnjY1p0Om9ePrkxO43oodRVGqCwpxIwWMrjn1YVmlbwHTRhRVjgMgIvnf86Oi/GU2+b2+5MQ1ys/rmMKVHzuPSk2Ww5vMadumKY//5z9sTissqbVfXa938aLWQTkmU7n/orpyTb3546oaSMutyqz2QjTEmJGJufX2j+1+rnh+98dONtfi2eRl9InC4KCoxQ9kp+0id3nv9b+fYzgAhAIcrKK6uddz8/itjd+w9ZOizrC+9Pj5+uK4GBHwyc+e+1q1anWdQh0GFEEBkBN9YmBs51+2hD7yybGRfyRwWRk/fCmNHaP5ZVml7tbvJ1s7cWdB87aT4ySGGrb3rlr6Jner1c4xtu3SgN1LXGM2+QRh+SaAFAOBwBTVOd3D2K8tGgt05cAwtuzMAh7+7nuPx0qPC9T65GLwUHattdg9qaHL3mRy9Tq5O7wWCQFEs+/thgmUx8DhEHMa457OsdAN1jS5obHZLMEB6T0TwnXE7IgPBUGR5H/qU9Tq5V42JAQSwRyzi2H97RCgUcFhAaNf1t+4MbdnepPjgP9VXf7qpduaX3zZGc+M/hs3btH3WEb9Gm4mCZr0X/P5QD05bCMllvKjG5r7T3F53cMrPUcKgVNnBhmb3WzTDPubx0rz2yxpISIwTbxmSG/mVSEgWHigyvGazB0YDAq5SwS9duXz0U0+8ULwTY9yjSyeMMdQ3uUEoIPmHi01xTlcwFQOQ0VHC5sQ4Sb3PHwpGa4QQoxayX25t7LGkXAgg1Nziqb1iuBoq9/V2r7ej18m9dW46rProFFOYE/mSTMqrc3vouQiBRMAndwzOVHwqk3KhSed5U6v7JWGI0xUcCRiWP/Vg4Yn3Pqs291Rb9h8xAADANzuaCloM1GNtRmpcIBCKwgCESEBaIpWC3enJspV1WtfxVStGuwCgjCTRyO4Ge525D8mbliyz9NQcHg76xDXxH3fkAAD4MMb/AYBNAEACAPXy22VgsfnHm6z+ob/eVGdZAIPZl1dcZhmEEJgxxmjL9qYkhyuYTxLImJkmqzBb/N6Z14Z/v11phRWG5C6DZ169Y2pNvXO10exLZZhfSLMBxBjNvpvNVv/o7AzFA7Nu37V9aL7qQEOT++9eiul21IhcytPmZkWc7suQzz71Oz0zvJ41i9/4oAJIEvERAu55XicQAmLlc/eBUPDBwuZWz1Kvl0kjSeTVRAl/GDNCvWzlBxXVD96VC8UnzRCtFvF+2NOS4/OHrmAxDgCGg2NGaGpNVl9o2sR4eOLF4/DO2sX5h4tNb+sNVGp7e879IBPC0Gak0hGC1yaNi9XJZbwfa+qcFZSPye+O3Hw+CXIZ74vrrv/OvG3r9L7r7z770nnw7c5mEPDJ6A1fN2xpaHJf0TH8IQSQmiQ9MX9m6oyScmt+8UnLBrPVf9Znh8clIDtDsfmuWwbdfrLS5nG7aXF9k/sJnd5zt8tNKxECLBJy9Bkp8nXXTY7/t9MVtE2fnIAe/NeRdytqHHczFxkaORwCsjMUq99+4YrFT7xQ/H8nTllf93iZLntWxMeIK8eM0EynfIz20T6MfOxXX/nkeAms31JviNEIF6cmSYvkMh4jk3LptCRpxYjCqGVTJ37ZWt/kut7mCMg71scIAQRpFvRGasrJStuQm+dsgjqt69FTNfYlbUZfpJdikMfLECaLP76syrbkhz2t/5xxzT9g3ZZ6lcHsG0uHsSFB0yw4nIEpP/7cGj9mpOaTzFT5N3weAZ090TrjCeoalCZftnjhBu30yZ2/SbM76Pcd/IoqG+RmK2HLdm1sm5EaRTOYVSr4R2+Zm2YAALh58c8bWg3eeb9dRikVfGberJTZJEmc3rJNu0tvoOJ/q1kYA0Srhdrxo6KvSowTa9Ztrt9lMFPSi1nfGAOolHzHpHGxE2mGPaGQ8eKOnbC8W691Xe/zh3+LZ2QE3zZqqPqVJYvzXquqddB9nUi832M9cs/czjH7umQ9AHzd8f/qPS1w7cR18OhzE0+brX7w/+ZqVJGIo2VZKDld7xjq9tAXvPqEopgYAMghCNSKAZhwf54JAgGfT4JAQIJIyGmdNin+nt0H9M1anedWpyso7TCMOtqEz/4GIOCToFYJKlISpU8uWZy3rbTCFhqaF9nnfTsAQpjOj2snxsPLb0+D9GTZmrgY0R4Bv30TiyAQqJQC9+BMxdvPvlbSShDQcYvVeYEB2GAwFCAJ1MDhoIZwtU4k5LSkJ8sMcdFimDczFbhcQj9/Zuo/h+VHzslIlW2KVgv1UgmXFvBJ4PEIEAs5rELGcyYlSMpGDYt69dqJ8TOXP3Zoq9nq7xdiAQaA5v4RlizOA4Qe17376W23t2i897a0eXOFAo5drRKunzk16adYjQgIAipOVTvq3B76vLvxMim3Xi7jVV03eYP7kWcn7LZY/cMudhDA5xOgjOB/O3FsjOFYafsy+8x1c4Fvvm/aOXNq0r6jJ8xJHi+T7/MxSU53EDRRQg9FMaV52RH1M65JcHgpJgT4flCr7u+3/uv3OTccnPE2RBgDgdrvYWYBAPYcaoNJYzfBo8+Nuaem3vm60xUU/npuVir4/rzBEY8uX7Ln7TfXTAORkJN0qNj4pVbnGRFi8e+Ex9DujJYQKz48doTmJi/FaB++JzfMVg48DGjN7cAZAwgDQOi3z37Y2wJKBf/Tr77Tss2tnsU+XygDAAiZlKvNzlR8MG1S/JpRQ+dBziAFLF56qGn86Oi7CQJ9qGv1Dg0EQ79KuYRAICAhRi08nDMo4oFjJy3aK0cPiORwXe+3/m5AT6DytB2yMxTo4w2no/yB0GCSRGSMWlR1w9TENi/FYIm4fY/E7gzAg/86AtdPScwor7Lf2dzqmRgIhJIwACkWcnQRCv7WrHT5x3qjr+mpBwsuCXegP8Kl3fouggmxQBKIOF5mkemNVDTGQCTFScy5WQqLx8tghZzf3038E3/iT/yJP3H54f8BkGEVviB428YAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDYtMjRUMTE6MDE6MDAtMDQ6MDBjOfWbAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTA2LTI0VDExOjAxOjAwLTA0OjAwEmRNJwAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
            "optinomic_trademark_2": "data:image/png;base64,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",
            "suedhang": "data:image/png;base64,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"
        };



        d.patientAddress_clinicLogo = {
            "alignment": "left",
            "columns": [{
                "stack": [{
                    "margin": [0, 72, 0, 0],
                    "text": " " + d.patient_adress
                }]
            }, {
                "width": 220,
                "stack": [{
                    "width": 220,
                    "image": d.images.suedhang
                }, {
                    "margin": [0, 6, 0, 0],
                    "fontSize": 10,
                    "color": "#69604d",
                    "alignment": "left",
                    "text": " Kompetenzzentrum für Mensch und Sucht"
                }, {
                    "margin": [0, 3, 0, 0],
                    "fontSize": 10,
                    "color": "#69604d",
                    "alignment": "left",
                    "text": " Südhang 1"
                }, {
                    "margin": [0, 3, 0, 0],
                    "fontSize": 10,
                    "color": "#69604d",
                    "alignment": "left",
                    "text": " CH - 3038 Kirchlindach"
                }, {
                    "margin": [0, 12, 0, 0],
                    "fontSize": 10,
                    "color": "#69604d",
                    "alignment": "left",
                    "text": " Telefon + 41 31 828 14 14"
                }, {
                    "margin": [0, 3, 0, 0],
                    "fontSize": 10,
                    "color": "#69604d",
                    "alignment": "left",
                    "text": " Fax +41 31 828 14 24"
                }]
            }]
        };



        // --------------------------------
        // PDF - Template-Functions
        // --------------------------------

        d.keepTogether = function(given_stack_array) {

            var isArray = function(obj) {
                return (typeof obj !== 'undefined' &&
                    obj && obj.constructor === Array);
            };

            var stack_array = [];

            if (isArray(given_stack_array)) {
                // Array
                stack_array = given_stack_array;
            } else {
                // Object
                stack_array.push(given_stack_array);
            };

            var return_obj = {
                "id": "keepTogetherTable",
                "layout": "noBorders",
                "table": {
                    "dontBreakRows": true,
                    "headerRows": 0,
                    "body": [
                        [{
                            "stack": stack_array
                        }]
                    ]
                }
            };

            return return_obj;
        };

        d.spacer = function(space) {

            space = space === undefined ? 10 : space;

            return {
                "text": "",
                "margin": [0, space, 0, space]
            };
        };

        d.title = function(title, subtitle) {

            title = title === undefined ? "" : title;
            subtitle = subtitle === undefined ? "" : subtitle;

            return {
                "stack": [
                    // second column consists of paragraphs
                    {
                        "text": " " + title,
                        "style": "title",
                        "alignment": "left"
                    }, {
                        "text": " " + subtitle,
                        "style": "caption",
                        "color": "#616161",
                        "margin": [1, 0, 0, 0],
                        "alignment": "left"
                    }
                ],
                "margin": [0, 24, 0, 36]
            };
        };

        d.heading = function(style, text_left, text_right) {

            text_left = text_left === undefined ? "" : text_left;
            text_right = text_right === undefined ? null : text_right;
            style = style === undefined ? "h2" : style;

            if ((style !== "h1") && (style !== "h2") && (style !== "h3")) {
                style = "";
            };

            var left = {
                "text": " " + text_left,
                "style": style,
                "alignment": "left"
            };

            if ((style === "h1") || (style === "h2")) {
                left.color = "#69604d";
            };

            var return_obj = left;

            var right = {
                "text": " " + text_right,
                "style": style,
                "alignment": "right",
                "fontSize": 9,
                "bold": false,
                "color": "#9E9E9E"
            };


            if (text_right !== null) {
                var cols = {
                    "columns": []
                };
                cols.columns.push(left);
                cols.columns.push(right);

                return_obj = cols;
            };

            return return_obj;
        };

        d.text = function(text) {

            text = text === undefined ? "Optinomic" : text;

            return {
                "text": " " + text,
                "style": "p"
            };
        };

        d.caption = function(text) {

            text = text === undefined ? "Optinomic" : text;

            return {
                "text": text,
                "style": "caption"
            };
        };

        d.pageBreak = function(when) {
            when = when === undefined ? "after" : when;
            return { "fontSize": 0, "text": "", "pageOrientation": "portrait", "pageBreak": when };
        };

        d.horizontalLine = function(width) {
            width = width === undefined ? 100 : width;

            var length = 514 / 100 * width;

            var return_obj = {
                "margin": [0, 12, 0, 0],
                "canvas": [{
                    "type": "line",
                    "x1": 0,
                    "y1": 0,
                    "x2": length,
                    "y2": 0,
                    "lineWidth": 1,
                    "lineColor": "#BDBDBD"
                }]
            };


            return return_obj;
        };

        d.noData = function(title, space_bottom) {
            title = title === undefined ? null : title;
            space_bottom = space_bottom === undefined ? 24 : space_bottom;

            var date = $filter("amDateFormat")(new Date(), 'DD.MM.YYYY');
            var text = " Keine Daten vorhanden.";
            if (title !== null) {
                text = " Keine «" + title + "» Daten vorhanden.";
            };

            var return_obj = {
                "stack": [{
                    "table": {
                        "widths": [12, "*"],
                        "body": [
                            [
                                { "text": "!", "color": "#BDBDBD", "fontSize": 36, "margin": [0, 0, 0, 0] }, {
                                    "stack": [
                                        { "text": date, "fontSize": 9, "color": "#BDBDBD", "margin": [0, 6, 0, 0] },
                                        { "text": text, "color": "#424242", "margin": [0, 6, 0, 0] }
                                    ],
                                    "margin": [0, 0, 0, 12]
                                }
                            ],
                        ]
                    },
                    "layout": "noBorders"
                }],
                "margin": [0, 12, 0, space_bottom]
            };

            return return_obj;
        };

        d.z_score = function(data, options) {
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

            var default_data = {
                "zscore": 2.2,
                "zscore_color": "#3F51B5",
                "clinicsample_start": -1.4,
                "clinicsample_end": 1.5
            };

            var default_options = {
                "width": 270,
                "zscore_min": -3,
                "zscore_max": 3,
                "clinicsample_color": grey["300"]
            };

            data = data === undefined ? default_data : data;
            options = options === undefined ? default_options : options;

            // Always grey
            options.clinicsample_color = grey["300"];


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
                "type": "line",
                "x1": get_x(data.clinicsample_start),
                "y1": 15,
                "x2": get_x(data.clinicsample_end),
                "y2": 15,
                "lineWidth": 30,
                "lineColor": options.clinicsample_color
            };

            canvas.push(obj_to_push);

            obj_to_push = {
                "type": "rect",
                "x": 0,
                "y": 0,
                "w": options.width,
                "h": 30,
                "lineColor": grey["400"]
            };
            canvas.push(obj_to_push);


            for (var i = 0; i < options.count_steps + 1; i++) {
                var my_x = get_x(options.zscore_min + i);
                if (options.zscore_min + i !== 0) {
                    obj_to_push = {
                        "type": "line",
                        "x1": my_x,
                        "y1": 0,
                        "x2": my_x,
                        "y2": 30,
                        "lineWidth": 1,
                        "lineColor": grey["200"]
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
            };

            obj_to_push = {
                "type": "line",
                "x1": get_x(data.clinicsample_start),
                "y1": 0,
                "x2": get_x(data.clinicsample_start),
                "y2": 30,
                "lineWidth": 1,
                "lineColor": grey["600"]
            };
            canvas.push(obj_to_push);

            obj_to_push = {
                "type": "line",
                "x1": get_x(data.clinicsample_end),
                "y1": 0,
                "x2": get_x(data.clinicsample_end),
                "y2": 30,
                "lineWidth": 1,
                "lineColor": grey["600"]
            };
            canvas.push(obj_to_push);

            obj_to_push = {
                "type": "line",
                "x1": get_x(data.zscore),
                "y1": 15,
                "x2": get_x(0),
                "y2": 15,
                "lineWidth": 15,
                "lineColor": data.zscore_color
            };
            canvas.push(obj_to_push);

            obj_to_push = {
                "type": "line",
                "x1": get_x(0),
                "y1": 0,
                "x2": get_x(0),
                "y2": 35,
                "lineWidth": 2,
                "lineColor": grey["900"]
            };
            canvas.push(obj_to_push);

            // console.log(JSON.stringify(canvas, null, 2));

            return canvas;
        };

        d.z_score_zahlen = function(zscore_min, zscore_max, width) {

            // Zahlen -3 | 0 | +3
            var count_steps = 0;
            if (zscore_min <= 0) {
                count_steps = Math.abs(zscore_min) + Math.abs(zscore_max);
            } else {
                count_steps = Math.abs(zscore_max) - Math.abs(zscore_min);
            };

            var zahlen_to_push = {
                "columns": [],
                "width": width,
                "columnGap": 0,
                "fontSize": 8,
                "color": "#757575"
            };

            for (var i = 0; i < count_steps; i++) {
                var value = zscore_min + i;
                var value_1 = zscore_min + i + 1;

                var my_bold = false;
                if (value === 0) {
                    my_bold = true;
                };

                var obj_to_push = {
                    "width": "*",
                    "text": value.toString(),
                    "bold": my_bold,
                    "alignment": "left"
                };

                if (i === count_steps - 1) {
                    obj_to_push = {
                        "width": "*",
                        "columns": [
                            { "text": value.toString(), "alignment": "left" },
                            { "text": value_1.toString(), "alignment": "right" }
                        ]
                    };
                };

                zahlen_to_push.columns.push(obj_to_push);
            };

            return zahlen_to_push;
        };

        d.stanine = function(stanine, mz, width) {

            stanine = stanine === undefined ? null : stanine;
            mz = mz === undefined ? null : mz;
            width = width === undefined ? 240 : parseInt(width);



            var step_1 = width / 9;


            var canvas = [];


            var return_stanine = {
                "width": width,
                "alignment": "center",
                "canvas": [{
                    "type": "rect",
                    "x": 0,
                    "y": 0,
                    "w": width,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "rect",
                    "x": step_1,
                    "y": 0,
                    "w": step_1,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "rect",
                    "x": step_1 * 3,
                    "y": 0,
                    "w": step_1,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "rect",
                    "x": step_1 * 5,
                    "y": 0,
                    "w": step_1,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "rect",
                    "x": step_1 * 7,
                    "y": 0,
                    "w": step_1,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }]
            };


            var eintritt = {
                "type": "ellipse",
                "x": step_1 * (stanine - 1) + step_1 / 2,
                "y": 15,
                "color": "#3F51B5",
                "r1": 12,
                "r2": 12
            };

            var austritt = {
                "type": "rect",
                "x": step_1 * (stanine - 1),
                "y": 0,
                "w": step_1,
                "h": 30,
                "color": "#3F51B5",
                "lineColor": "#E0E0E0"
            };

            var anderer_1 = {
                "type": "rect",
                "x": step_1 * (stanine - 1),
                "y": 0,
                "w": step_1,
                "h": 30,
                "color": "#3F51B5",
                "lineColor": "#E0E0E0"
            };

            var anderer_2 = {
                "type": "ellipse",
                "x": step_1 * (stanine - 1) + step_1 / 2,
                "y": 15,
                "color": "#FFFFFF",
                "r1": 13,
                "r2": 13
            };

            if (mz === "Eintritt") {
                return_stanine.canvas.push(eintritt);
            };

            if (mz === "Austritt") {
                return_stanine.canvas.push(austritt);
            };

            if ((mz !== "Eintritt") && (mz !== "Austritt")) {
                return_stanine.canvas.push(anderer_1);
                return_stanine.canvas.push(anderer_2);
            };


            return return_stanine;
        };

        d.getCalculatedStamp = function(doc) {

            var return_array = [];

            var calculated_stamp = {
                "margin": [0, 36, 0, 36],
                "alignment": "left",
                "columnGap": 12,
                "columns": [{
                    "width": 60,
                    "image": d.images.optinomic_trademark
                }, {
                    "width": "*",
                    "stack": [{
                        "fontSize": 12,
                        "bold": false,
                        "color": "#3F51B5",
                        "alignment": "left",
                        "margin": [0, 2, 0, 0],
                        "text": " «" + doc.name + " | Version " + doc.version + "»"
                    }, {
                        "fontSize": 10,
                        "bold": false,
                        "color": "#616161",
                        "margin": [0, 4, 0, 0],
                        "alignment": "left",
                        "text": " Berechnet durch «Optinomic» am " + d.date + " um " + d.time + " Uhr."
                    }, {
                        "fontSize": 9,
                        "bold": false,
                        "color": "#3F51B5",
                        "alignment": "left",
                        "margin": [0, 6, 0, 0],
                        "text": " " + "www.optinomic.com"
                    }, {
                        "fontSize": 10,
                        "bold": false,
                        "color": "#616161",
                        "alignment": "left",
                        "text": " " + "Erkenntnis bringend"
                    }]
                }]
            };

            return_array.push(d.horizontalLine(100));
            return_array.push(calculated_stamp);


            return d.keepTogether(return_array);
        };





        // --------------------------------
        // Default Definition
        // --------------------------------

        d.default_definition = {
            "pageSize": "A4",
            "pageOrientation": "portrait",
            "info": {
                "title": "Patienten-Assessment | " + d.klinik,
                "author": d.klinik + " | Optinomic GmbH",
                "subject": "Patienten-Assessment | " + d.klinik,
                "keywords": d.patient + ", " + d.klinik + ", Optinomic"
            },
            "header": {
                "columns": [
                    { "text": " Patienten-Assessment", "alignment": "left", "style": "header" },
                    { "text": " " + d.klinik, "alignment": "right", "style": "header" }
                ]
            },
            "footer": function(currentPage, pageCount) {
                var obj = {
                    "columns": [
                        { "text": " Zugangsdaten", "alignment": "left", "style": "footer" },
                        { "text": " ", "alignment": "right", "style": "footer" }
                    ]
                };
                return obj;
            },
            "content": [],
            "styles": {
                "header": {
                    "fontSize": 11,
                    "bold": false,
                    "color": "#9E9E9E",
                    "alignment": "left",
                    "margin": [40, 20, 40, 40]
                },
                "footer": {
                    "fontSize": 11,
                    "bold": false,
                    "color": "#9E9E9E",
                    "alignment": "left",
                    "margin": [40, 0, 40, 40]
                },
                "title": {
                    "fontSize": 36,
                    "bold": false,
                    "color": "#69604d",
                    "alignment": "left",
                    "margin": [0, 40, 0, 0]
                },
                "caption": {
                    "fontSize": 11,
                    "bold": false,
                    "color": "#757575",
                    "alignment": "left",
                    "margin": [0, 0, 0, 0]
                },
                "h1": {
                    "fontSize": 18,
                    "bold": false,
                    "color": "#424242",
                    "alignment": "left",
                    "margin": [0, 40, 0, 24]
                },
                "h2": {
                    "fontSize": 15,
                    "bold": false,
                    "color": "#212121",
                    "alignment": "left",
                    "margin": [0, 20, 0, 12]
                },
                "h3": {
                    "bold": true,
                    "color": "#212121",
                    "alignment": "left",
                    "margin": [0, 0, 0, 6]
                },
                "p": {
                    "color": "#212121",
                    "alignment": "left",
                    "fontSize": 12,
                    "margin": [0, 0, 0, 6]
                }
            },
            "defaultStyle": {
                "alignment": "left"
            }
        };

        return d;
    };


    // -----------------------------------
    // PDF-Make - Handles
    // -----------------------------------

    $scope.pdf_open = function() {
        $scope.createPDF();
        console.log('(!) pdf_open', $scope.d.docDefinition);
        pdfMake.createPdf($scope.d.docDefinition).open();
    };

    $scope.pdf_download = function() {
        $scope.createPDF();
        console.log('(!) pdf_download', $scope.d.docDefinition);
        pdfMake.createPdf($scope.d.docDefinition).download();
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
