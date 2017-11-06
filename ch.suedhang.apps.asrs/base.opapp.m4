[module]
id = ch.suedhang.apps.asrs
name = ADHS-Screening (ASRS)
short_description = Screening-Test mit Selbstbeurteilungs-Skala für Erwachsene
version = include(VERSION)
type = patient

[description]

[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 92
website = http://suedhang.ch/de/

[template ASRS 6 12]
include(../lib/polymer/index.m4)
include(elements/element-asrs.html)
include(elements/view.html)

[readme]
include(readme.md)

[dependencies]

[survey]
id = asrs_ng
type = ng
responsibility = patient_via_assessment
name = ASRS
host = default

[survey_markup asrs_ng]
include(survey_markups/asrs_survey.html)


[event activation]
type = on_activation
time = 08:00
due_after = 259200
overdue = ignore
description = ASRS-Erhebung
survey = asrs_ng


[calculation asrs_score javascript]
include(calculations/asrs_score.js)

