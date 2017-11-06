[module]
id = ch.suedhang.apps.isk
name = ISK-K
short_description = Persönliche Verhaltensweisen und Gewohnheiten zu den vier Bereichen: Soziale Orientierung, Offensivität, Selbststeuerung und Reflexibilität.
version = include(VERSION)
type = patient

[description]

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/

[template ISK-K 6 12]
include(../lib/polymer/index.m4)
include(elements/element-isk.html)
include(elements/view.html)


[readme]
include(readme.md)

[dependencies]


[survey]
id = isk
type = lime
responsibility = patient_via_assessment
name = Inventar Sozialer Kompetenzen
host = limesurvey_v2
survey_id = 824558
hash = X28X343
pid = X28X344
fid = X28X345
min_questions =
min_lastpage = 2


[event activation]
type = on_activation
time = 08:00
due_after = 86400
overdue = ignore
description = Schätzen Sie Ihre persönlichen Verhaltensweisen und Gewohnheiten im Umgang mit anderen Personen ein.
survey = isk

[event exit]
type = before_exit
days = 7
time = 08:00
due_after = 86400
overdue = ignore
description = Schätzen Sie Ihre persönlichen Verhaltensweisen und Gewohnheiten im Umgang mit anderen Personen ein.
survey = isk


[calculation scores_calculation javascript]
include(calculations/isk_patient_calc.js)


