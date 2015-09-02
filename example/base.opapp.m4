[module]

id = com.optinomic.apps.example
name = Example with Makefile
short_description = An example app
version = include(VERSION)
type = patient

[description]

Just a silly module doing nothing. This is just an example - to show how Optinomic-Apps can be built.

[developer]

first_name = Tom
last_name = Feron
github_user = thoferon
email = tho.feron@gmail.com
company = Optinomic
phone = +44 207 568789
website = http://www.optinomic.com

[dependencies]

[template show_token]

include(templates/show_token.html)

[pdf_template show_items for_pdf_template]

include(pdf_templates/show_items.tex)

[javascript]

include(main.js)

[css]

include(style.css)

[survey]

id = my_survey
type = lime
responsibility = lead_therapist
name = Example survey
username = admin
password = something
base_url = http://dev.openpsychotherapy.org/index.php
survey_id = 12
hash = 67890
pid = 4567
fid = 34567
min_questions = A,B,C
min_lastpage = 2

[survey]

id = my_ng_survey
type = ng
responsibility = lead_therapist
name = Second example survey
base_url = http://localhost:3002

[survey_markup my_ng_survey]

include(survey_markups/my_ng_survey.html)

[event]

type = daily
time = 13:00
due_after = 86400
overdue = ignore
description = A daily reminder to disable this example module
survey = my_survey

[email new_event plain]

include(emails/new_event.plain)

[email overdue html]

include(emails/overdue.html)

[calculation for_pdf_template javascript]

include(calculations/for_pdf_template.js)

[calculation my_calculation lua]

include(calculations/my_calculation.lua)

[calculation another_calculation javascript]

include(calculations/another_calculation.js)
