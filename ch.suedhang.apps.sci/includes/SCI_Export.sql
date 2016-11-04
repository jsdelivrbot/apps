SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox

    
  ((cast(response AS json))->>'Datum') as datum,
  TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD HH24:MI:SS')  as datum_date,
  SUBSTRING(((cast(response AS json))->>'Datum'),12,5) AS datum_time,
  SUBSTRING(((cast(response AS json))->>'Datum'),1,4)::integer AS datum_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD HH24:MI:SS')) AS datum_week,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB1]') as scibelastung_escib1,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB2]') as scibelastung_escib2,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB3]') as scibelastung_escib3,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB4]') as scibelastung_escib4,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB5]') as scibelastung_escib5,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB6]') as scibelastung_escib6,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB7]') as scibelastung_escib7,
  ((cast(response AS json))->>'ESCICoping[ESCIC1]') as scicoping_escic01,
  ((cast(response AS json))->>'ESCICoping[ESCIC2]') as scicoping_escic02,
  ((cast(response AS json))->>'ESCICoping[ESCIC3]') as scicoping_escic03,
  ((cast(response AS json))->>'ESCICoping[ESCIC4]') as scicoping_escic04,
  ((cast(response AS json))->>'ESCICoping[ESCIC5]') as scicoping_escic05,
  ((cast(response AS json))->>'ESCICoping[ESCIC6]') as scicoping_escic06,
  ((cast(response AS json))->>'ESCICoping[ESCIC7]') as scicoping_escic07,
  ((cast(response AS json))->>'ESCICoping[ESCIC8]') as scicoping_escic08,
  ((cast(response AS json))->>'ESCICoping[ESCIC90]') as scicoping_escic09,
  ((cast(response AS json))->>'ESCICoping[ESCIC10]') as scicoping_escic10,
  ((cast(response AS json))->>'ESCICoping[ESCIC11]') as scicoping_escic11,
  ((cast(response AS json))->>'ESCICoping[ESCIC12]') as scicoping_escic12,
  ((cast(response AS json))->>'ESCICoping[ESCIC13]') as scicoping_escic13,
  ((cast(response AS json))->>'ESCICoping[ESCIC14]') as scicoping_escic14,
  ((cast(response AS json))->>'ESCICoping[ESCIC15]') as scicoping_escic15,
  ((cast(response AS json))->>'ESCICoping[ESCIC16]') as scicoping_escic16,
  ((cast(response AS json))->>'ESCICoping[ESCIC17]') as scicoping_escic17,
  ((cast(response AS json))->>'ESCICoping[ESCIC18]') as scicoping_escic18,
  ((cast(response AS json))->>'ESCICoping[ESCIC19]') as scicoping_escic19,
  ((cast(response AS json))->>'ESCICoping[ESCIC20]') as scicoping_escic20,
  ((cast(response AS json))->>'ESCIOverstaining[ESCIO1]') as scioverstaining_escio1,
  ((cast(response AS json))->>'ESCIOverstaining[ESCIO2]') as scioverstaining_escio2,
  ((cast(response AS json))->>'ESCIOverstaining[ESCIO3]') as scioverstaining_escio3,
  ((cast(response AS json))->>'ESCIOverstaining[ESCIO4]') as scioverstaining_escio4,
  ((cast(response AS json))->>'ESCIOverstaining[ESCIO5]') as scioverstaining_escio5,
  ((cast(response AS json))->>'ESCIOverstaining[ESCIO6]') as scioverstaining_escio6,
  ((cast(response AS json))->>'ESCIOverstaining[ESCIO7]') as scioverstaining_escio7,
  ((cast(response AS json))->>'ESCISymptome[ESCIS1]') as scisymptome_escis01,
  ((cast(response AS json))->>'ESCISymptome[ESCIS2]') as scisymptome_escis02,
  ((cast(response AS json))->>'ESCISymptome[ESCIS3]') as scisymptome_escis03,
  ((cast(response AS json))->>'ESCISymptome[ESCIS4]') as scisymptome_escis04,
  ((cast(response AS json))->>'ESCISymptome[ESCIS5]') as scisymptome_escis05,
  ((cast(response AS json))->>'ESCISymptome[ESCIS6]') as scisymptome_escis06,
  ((cast(response AS json))->>'ESCISymptome[ESCIS7]') as scisymptome_escis07,
  ((cast(response AS json))->>'ESCISymptome[ESCIS8]') as scisymptome_escis08,
  ((cast(response AS json))->>'ESCISymptome[ESCIS9]') as scisymptome_escis09,
  ((cast(response AS json))->>'ESCISymptome[ESCI10]') as scisymptome_escis10,
  ((cast(response AS json))->>'ESCISymptome[ESCI11]') as scisymptome_escis11,
  ((cast(response AS json))->>'ESCISymptome[ESCI12]') as scisymptome_escis12,
  ((cast(response AS json))->>'ESCISymptome[ESCI13]') as scisymptome_escis13,
  ((cast(response AS json))->>'ESCIUnsicherheit[ESCIU1]') as sciunsicherheit_esciu1,
  ((cast(response AS json))->>'ESCIUnsicherheit[ESCIU2]') as sciunsicherheit_esciu2,
  ((cast(response AS json))->>'ESCIUnsicherheit[ESCIU3]') as sciunsicherheit_esciu3,
  ((cast(response AS json))->>'ESCIUnsicherheit[ESCIU4]') as sciunsicherheit_esciu4,
  ((cast(response AS json))->>'ESCIUnsicherheit[ESCIU5]') as sciunsicherheit_esciu5,
  ((cast(response AS json))->>'ESCIUnsicherheit[ESCIU6]') as sciunsicherheit_esciu6,
  ((cast(response AS json))->>'ESCIUnsicherheit[ESCIU7]') as sciunsicherheit_esciu7,
  ((cast(response AS json))->>'Erhebungszeitpunkt') as erhebungszeitpunkt,
  ((cast(response AS json))->>'FID') as fid,
  ((cast(response AS json))->>'PID') as pid,
  ((cast(response AS json))->>'andererZeitpunkt') as andererzeitpunkt,
  ((cast(response AS json))->>'datestamp') as datestamp,
  TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD HH24:MI:SS')  as datestamp_date,
  SUBSTRING(((cast(response AS json))->>'datestamp'),12,5) AS datestamp_time,
  SUBSTRING(((cast(response AS json))->>'datestamp'),1,4)::integer AS datestamp_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD HH24:MI:SS')) AS datestamp_week,
  ((cast(response AS json))->>'id') as id,
  ((cast(response AS json))->>'lastpage') as lastpage,
  ((cast(response AS json))->>'optinomixHASH') as optinomixhash,
  ((cast(response AS json))->>'startdate') as startdate,
  TO_DATE(((cast(response AS json))->>'startdate'), 'YYYY-MM-DD HH24:MI:SS')  as startdate_date,
  SUBSTRING(((cast(response AS json))->>'startdate'),12,5) AS startdate_time,
  SUBSTRING(((cast(response AS json))->>'startdate'),1,4)::integer AS startdate_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'startdate'), 'YYYY-MM-DD HH24:MI:SS')) AS startdate_week,
  ((cast(response AS json))->>'startlanguage') as startlanguage,
  ((cast(response AS json))->>'submitdate') as submitdate,
  TO_DATE(((cast(response AS json))->>'submitdate'), 'YYYY-MM-DD HH24:MI:SS')  as submitdate_date,
  SUBSTRING(((cast(response AS json))->>'submitdate'),12,5) AS submitdate_time,
  SUBSTRING(((cast(response AS json))->>'submitdate'),1,4)::integer AS submitdate_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'submitdate'), 'YYYY-MM-DD HH24:MI:SS')) AS submitdate_week,

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.sci';


