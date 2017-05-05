-- © by Nora Schönenberger, Klinik Südhang --

SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox


  NULL as VZAX100,
  ((cast(response AS json))->>'Institution') as institution,
  CONCAT(patient.cis_pid, '00', RIGHT((stay.cis_fid/100)::text,2)) as MedStatFid,
  ((cast(response AS json))->>'VZAX005') as VZAX005,

  ((cast(response AS json))->>'VMAB001') as VMAB001,
  ((cast(response AS json))->>'VMAB005') as VMAB005,
  NULL as VMAB006,
  patient.four_letter_code as VMAB010,
  ((cast(response AS json))->>'VMAB020') as VMAB020,
  CASE WHEN patient.gender='Male' THEN '1' ELSE '2' END AS vmac001,
  patient.birthdate as vmac005,
  NULL as VMAC006,
  CASE WHEN ((cast(response AS json))->>'VMAB040') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VMAB040') END as vmab040,
  CASE WHEN ((cast(response AS json))->>'VNAB041') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAB041') END as vnab041, 
  ((cast(response AS json))->>'VMAB042') as VMAB042,
  CASE WHEN ((cast(response AS json))->>'VMAB044') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VMAB044') END as vmab044, 
  ((cast(response AS json))->>'VMAB045') as VMAB045,
  ((cast(response AS json))->>'VMAB046') as VMAB046,
  ((cast(response AS json))->>'VYAN010') as VYAN010,
  CASE WHEN ((cast(response AS json))->>'VMAB050') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VMAB050') END as vmab050,
  CASE WHEN ((cast(response AS json))->>'VMAB055') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VMAB055') END as vmab055,  
  CASE WHEN ((cast(response AS json))->>'VMAB060') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VMAB060') END as VMAB060,
  CASE WHEN ((cast(response AS json))->>'VZAJ010') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZAJ010') END as vzaj010,
  CASE WHEN ((cast(response AS json))->>'QZAJ015[VZAJ015x]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'QZAJ015[VZAJ015x]') END as VZAJ015x,
  CASE WHEN ((cast(response AS json))->>'QZAJ015[VZAJ015a]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'QZAJ015[VZAJ015a]') END as vzaj015a,
  CASE WHEN ((cast(response AS json))->>'QZAJ015[VZAJ015b]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'QZAJ015[VZAJ015b]') END as vzaj015b,
  CASE WHEN ((cast(response AS json))->>'QZAJ015[VZAJ015c]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'QZAJ015[VZAJ015c]') END as vzaj015c,
  CASE WHEN ((cast(response AS json))->>'QZAJ015[VZAJ015d]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'QZAJ015[VZAJ015d]') END as vzaj015d,
  CASE WHEN ((cast(response AS json))->>'QZAJ015[VZAJ015e]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'QZAJ015[VZAJ015e]') END as vzaj015e,
  CASE WHEN ((cast(response AS json))->>'QZAJ015[VZAJ015f]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'QZAJ015[VZAJ015f]') END as vzaj015f,
  CASE WHEN ((cast(response AS json))->>'QZAJ015[VZAJ015g]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'QZAJ015[VZAJ015g]') END as vzaj015g,
  CASE WHEN ((cast(response AS json))->>'QZAJ015[VZAJ015h]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'QZAJ015[VZAJ015h]') END as vzaj015h,
  CASE WHEN ((cast(response AS json))->>'QZAJ015[VZAJ015i]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'QZAJ015[VZAJ015i]') END as vzaj015i,
  CASE WHEN ((cast(response AS json))->>'QZAJ015[VZAJ015j]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'QZAJ015[VZAJ015j]') END as vzaj015j,
  ((cast(response AS json))->>'VZAJ016') as VZAJ016,
  ((cast(response AS json))->>'VMAC010a') as VMAC010a,
  NULL as vmac010b,
  NULL as vmac010c,
  NULL as vmac010d,
  NULL as VMAC010e,
  CASE WHEN ((cast(response AS json))->>'VMAC020') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VMAC020') END as vmac020,
  CASE WHEN ((cast(response AS json))->>'VNAC030') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAC030') END as vnac030,
  ((cast(response AS json))->>'VMAC031') as VMAC031,
  CASE WHEN ((cast(response AS json))->>'VNAC040') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAC040') END as vnac040,
  CASE WHEN ((cast(response AS json))->>'VZAS010') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZAS010') END as vzas010,
  CASE WHEN ((cast(response AS json))->>'VYAS015') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VYAS015') END as vyas015,
  CASE WHEN ((cast(response AS json))->>'VZAS020') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZAS020') END as vzas020,
  CASE WHEN ((cast(response AS json))->>'VNAC050') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAC050') END as vnac050,
  ((cast(response AS json))->>'VMAC051') as VMAC051,
  CASE WHEN ((cast(response AS json))->>'VNAC060') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAC060') END as vnac060,
  ((cast(response AS json))->>'VMAC061') as VMAC061,
  CASE WHEN ((cast(response AS json))->>'QNAC070[VNAC070x]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAC070[VNAC070x]') END as VNAC070x,
  CASE WHEN ((cast(response AS json))->>'QNAC070[VNAC070y]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAC070[VNAC070y]') END as VNAC070y,
  CASE WHEN ((cast(response AS json))->>'QNAC070[VNAC070a]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAC070[VNAC070a]') END as VNAC070a,
  CASE WHEN ((cast(response AS json))->>'QNAC070[VNAC070b]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAC070[VNAC070b]') END as VNAC070b,
  CASE WHEN ((cast(response AS json))->>'QNAC070[VNAC070c]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAC070[VNAC070c]') END as VNAC070c,
  CASE WHEN ((cast(response AS json))->>'QNAC070[VNAC070d]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAC070[VNAC070d]') END as VNAC070d,
  CASE WHEN ((cast(response AS json))->>'QNAC070[VNAC070e]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAC070[VNAC070e]') END as VNAC070e,
  CASE WHEN ((cast(response AS json))->>'QNAC070[VNAC070f]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAC070[VNAC070f]') END as VNAC070f,
  CASE WHEN ((cast(response AS json))->>'QNAC070[VNAC070g]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAC070[VNAC070g]') END as VNAC070g,
  CASE WHEN ((cast(response AS json))->>'QNAC070[VNAC070h]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAC070[VNAC070h]') END as VNAC070h,
  CASE WHEN ((cast(response AS json))->>'VZAF010') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZAF010') END as vzaf010,
  ((cast(response AS json))->>'VZAF011') as VZAF011,
  CASE WHEN ((cast(response AS json))->>'VYAF030') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VYAF030') END as vyaf030,
  CASE WHEN ((cast(response AS json))->>'VYAR009') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VYAR009') END as vyar009,
  CASE WHEN ((cast(response AS json))->>'QYAR010[VYAR010x]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR010[VYAR010x]') END as VYAR010x,
  CASE WHEN ((cast(response AS json))->>'QYAR010[VYAR010a]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR010[VYAR010a]') END as vyar010a,
  CASE WHEN ((cast(response AS json))->>'QYAR010[VYAR010b]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR010[VYAR010b]') END as vyar010b,
  CASE WHEN ((cast(response AS json))->>'QYAR010[VYAR010c]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR010[VYAR010c]') END as vyar010c,
  CASE WHEN ((cast(response AS json))->>'QYAR010[VYAR010d]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR010[VYAR010d]') END as vyar010d,
  CASE WHEN ((cast(response AS json))->>'QYAR010[VYAR010e]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR010[VYAR010e]') END as vyar010e,
  CASE WHEN ((cast(response AS json))->>'QYAR010[VYAR010f]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR010[VYAR010f]') END as vyar010f,
  CASE WHEN ((cast(response AS json))->>'QYAR010[VYAR010g]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR010[VYAR010g]') END as vyar010g,
  CASE WHEN ((cast(response AS json))->>'QYAR010[VYAR010h]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR010[VYAR010h]') END as vyar010h,
  CASE WHEN ((cast(response AS json))->>'QYAR010[VYAR010i]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR010[VYAR010i]') END as vyar010i,
  ((cast(response AS json))->>'VZAR011') as VZAR011,
  CASE WHEN ((cast(response AS json))->>'VYAR019') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VYAR019') END as vyar019,
  CASE WHEN ((cast(response AS json))->>'QYAR020[VYAR020x]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR020[VYAR020x]') END as VYAR020x,
  CASE WHEN ((cast(response AS json))->>'QYAR020[VYAR020a]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR020[VYAR020a]') END as vyar020a,
  CASE WHEN ((cast(response AS json))->>'QYAR020[VYAR020b]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR020[VYAR020b]') END as vyar020b,
  CASE WHEN ((cast(response AS json))->>'QYAR020[VYAR020c]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR020[VYAR020c]') END as vyar020c,
  CASE WHEN ((cast(response AS json))->>'QYAR020[VYAR020d]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR020[VYAR020d]') END as vyar020d,
  CASE WHEN ((cast(response AS json))->>'QYAR020[VYAR020e]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR020[VYAR020e]') END as vyar020e,
  CASE WHEN ((cast(response AS json))->>'QYAR020[VYAR020f]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR020[VYAR020f]') END as vyar020f,
  CASE WHEN ((cast(response AS json))->>'QYAR020[VYAR020g]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR020[VYAR020g]') END as vyar020g,
  CASE WHEN ((cast(response AS json))->>'QYAR020[VYAR020h]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR020[VYAR020h]') END as vyar020h,
  CASE WHEN ((cast(response AS json))->>'QYAR020[VYAR020i]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR020[VYAR020i]') END as vyar020i,
  CASE WHEN ((cast(response AS json))->>'QYAR020[VYAR020j]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR020[VYAR020j]') END as vyar020j,
  ((cast(response AS json))->>'VZAR021') as VZAR021,
  CASE WHEN ((cast(response AS json))->>'VYAR029') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VYAR029') END as vyar029,
  CASE WHEN ((cast(response AS json))->>'QYAR030[VYAR030x]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR030[VYAR030x]') END as VYAR030x,
  CASE WHEN ((cast(response AS json))->>'QYAR030[VYAR030a]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR030[VYAR030a]') END as vyar030a,
  CASE WHEN ((cast(response AS json))->>'QYAR030[VYAR030b]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR030[VYAR030b]') END as vyar030b,
  CASE WHEN ((cast(response AS json))->>'QYAR030[VYAR030c]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR030[VYAR030c]') END as vyar030c,
  CASE WHEN ((cast(response AS json))->>'QYAR030[VYAR030d]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR030[VYAR030d]') END as vyar030d,
  CASE WHEN ((cast(response AS json))->>'QYAR030[VYAR030e]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR030[VYAR030e]') END as vyar030e,
  CASE WHEN ((cast(response AS json))->>'QYAR030[VYAR030f]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR030[VYAR030f]') END as vyar030f,
  CASE WHEN ((cast(response AS json))->>'QYAR030[VYAR030g]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR030[VYAR030g]') END as vyar030g,
  CASE WHEN ((cast(response AS json))->>'QYAR030[VYAR030h]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAR030[VYAR030h]') END as vyar030h,
  ((cast(response AS json))->>'VZAR031') as VZAR031,
  CASE WHEN ((cast(response AS json))->>'QNAD0101[VNAD010a]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0101[VNAD010a]') END as vnaD010a,
  CASE WHEN ((cast(response AS json))->>'QNAD0102[VNAD010ba]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0102[VNAD010ba]') END as vnaD010ba,
  CASE WHEN ((cast(response AS json))->>'QNAD0102[VNAD010bb]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0102[VNAD010bb]') END as vnaD010bb,
  CASE WHEN ((cast(response AS json))->>'QNAD0102[VNAD010bc]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0102[VNAD010bc]') END as vnaD010bc,
  CASE WHEN ((cast(response AS json))->>'QNAD0102[VNAD010bd]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0102[VNAD010bd]') END as vnaD010bd,
  CASE WHEN ((cast(response AS json))->>'QNAD0102[VNAD010be]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0102[VNAD010be]') END as vnaD010be,
  ((cast(response AS json))->>'VNAD011be') as VNAD011be,
  CASE WHEN ((cast(response AS json))->>'QNAD0103[VNAD010ca]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0103[VNAD010ca]') END as vnaD010ca,
  CASE WHEN ((cast(response AS json))->>'QNAD0103[VNAD010cb]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0103[VNAD010cb]') END as vnaD010cb,
  CASE WHEN ((cast(response AS json))->>'QNAD0103[VNAD010cc]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0103[VNAD010cc]') END as vnaD010cc,
  ((cast(response AS json))->>'VNAD011cc') as VNAD011cc,
  CASE WHEN ((cast(response AS json))->>'QNAD0104[VNAD010da]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0104[VNAD010da]') END as vnaD010da,
  CASE WHEN ((cast(response AS json))->>'QNAD0104[VNAD010db]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0104[VNAD010db]') END as vnaD010db,
  CASE WHEN ((cast(response AS json))->>'QNAD0104[VNAD010dc]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0104[VNAD010dc]') END as vnaD010dc,
  CASE WHEN ((cast(response AS json))->>'QNAD0104[VNAD010dd]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0104[VNAD010dd]') END as vnaD010dd,
  CASE WHEN ((cast(response AS json))->>'QNAD0104[VNAD010de]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0104[VNAD010de]') END as vnaD010de,
  ((cast(response AS json))->>'VNAD011de') as VNAD011de,
  CASE WHEN ((cast(response AS json))->>'QNAD0105[VNAD010ea]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0105[VNAD010ea]') END as vnaD010ea,
  CASE WHEN ((cast(response AS json))->>'QNAD0105[VNAD010eb]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0105[VNAD010eb]') END as vnaD010eb,
  CASE WHEN ((cast(response AS json))->>'QNAD0105[VNAD010ec]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0105[VNAD010ec]') END as vnaD010ec,
  CASE WHEN ((cast(response AS json))->>'QNAD0105[VNAD010ed]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0105[VNAD010ed]') END as vnaD010ed,
  ((cast(response AS json))->>'VNAD011ed') as VNAD011ed,
  CASE WHEN ((cast(response AS json))->>'QNAD0106[VNAD010fa]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0106[VNAD010fa]') END as vnaD010fa,
  CASE WHEN ((cast(response AS json))->>'QNAD0106[VNAD010fb]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0106[VNAD010fb]') END as vnaD010fb,
  CASE WHEN ((cast(response AS json))->>'QNAD0106[VNAD010fc]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0106[VNAD010fc]') END as vnaD010fc,
  ((cast(response AS json))->>'VNAD011fc') as VNAD011fc,
  CASE WHEN ((cast(response AS json))->>'QNAD0107[VNAD010g]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0107[VNAD010g]') END as vnaD010g,
  CASE WHEN ((cast(response AS json))->>'QNAD0107[VNAD010h]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0107[VNAD010h]') END as vnaD010h,
  CASE WHEN ((cast(response AS json))->>'QNAD0107[VNAD010i]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0107[VNAD010i]') END as vnaD010i,
  CASE WHEN ((cast(response AS json))->>'QNAD0107[VNAD010j]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0107[VNAD010j]') END as vnaD010j,
  ((cast(response AS json))->>'VNAD011j') as VNAD011j,
  CASE WHEN ((cast(response AS json))->>'QNAD0108[VNAD010ka]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0108[VNAD010ka]') END as vnaD010ka,
  CASE WHEN ((cast(response AS json))->>'QNAD0108[VNAD010kb]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0108[VNAD010kb]') END as vnaD010kb,
  CASE WHEN ((cast(response AS json))->>'QNAD0108[VNAD010kc]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0108[VNAD010kc]') END as vnaD010kc,
  CASE WHEN ((cast(response AS json))->>'QNAD0108[VNAD010kd]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QNAD0108[VNAD010kd]') END as vnaD010kd,
  ((cast(response AS json))->>'VNAD011kd') as VNAD011kd,
   CASE WHEN ((cast(response AS json))->>'VNAD010x') = '0' THEN NULL ELSE ((cast(response AS json))->>'VNAD010x') END as VNAD010x,
  ((cast(response AS json))->>'VNAD010y') as VNAD010y,
  CASE WHEN ((cast(response AS json))->>'VNAD015a') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015a') END as VNAD015a,
  CASE WHEN ((cast(response AS json))->>'VNAD015ba') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015ba') END as VNAD015ba,
  CASE WHEN ((cast(response AS json))->>'VNAD015bb') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015bb') END as VNAD015bb,
  CASE WHEN ((cast(response AS json))->>'VNAD015bc') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015bc') END as VNAD015bc,
  CASE WHEN ((cast(response AS json))->>'VNAD015bd') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015bd') END as VNAD015bd,
  CASE WHEN ((cast(response AS json))->>'VNAD015be') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015be') END as VNAD015be,
  CASE WHEN ((cast(response AS json))->>'VNAD015ca') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015ca') END as VNAD015ca,
  CASE WHEN ((cast(response AS json))->>'VNAD015cb') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015cb') END as VNAD015cb,
  CASE WHEN ((cast(response AS json))->>'VNAD015cc') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015cc') END as VNAD015cc,
  CASE WHEN ((cast(response AS json))->>'VNAD015da') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015da') END as VNAD015da,
  CASE WHEN ((cast(response AS json))->>'VNAD015db') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015db') END as VNAD015db,
  CASE WHEN ((cast(response AS json))->>'VNAD015dc') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015dc') END as VNAD015dc,
  CASE WHEN ((cast(response AS json))->>'VNAD015dd') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015dd') END as VNAD015dd,
  CASE WHEN ((cast(response AS json))->>'VNAD015de') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015de') END as VNAD015de,
  CASE WHEN ((cast(response AS json))->>'VNAD015ea') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015ea') END as VNAD015ea,
  CASE WHEN ((cast(response AS json))->>'VNAD015eb') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015eb') END as VNAD015eb,
  CASE WHEN ((cast(response AS json))->>'VNAD015ec') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015ec') END as VNAD015ec,
  CASE WHEN ((cast(response AS json))->>'VNAD015ed') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015ed') END as VNAD015ed,
  CASE WHEN ((cast(response AS json))->>'VNAD015fa') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015fa') END as VNAD015fa,
  CASE WHEN ((cast(response AS json))->>'VNAD015fb') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015fb') END as VNAD015fb,
  CASE WHEN ((cast(response AS json))->>'VNAD015fc') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015fc') END as VNAD015fc,
  CASE WHEN ((cast(response AS json))->>'VNAD015g') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015g') END as VNAD015g,
  CASE WHEN ((cast(response AS json))->>'VNAD015h') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015h') END as VNAD015h,
  CASE WHEN ((cast(response AS json))->>'VNAD015i') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015i') END as VNAD015i,
  CASE WHEN ((cast(response AS json))->>'VNAD015j') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015j') END as VNAD015j,
  CASE WHEN ((cast(response AS json))->>'VNAD015ka') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015ka') END as VNAD015ka,
  CASE WHEN ((cast(response AS json))->>'VNAD015kb') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015kb') END as VNAD015kb,
  CASE WHEN ((cast(response AS json))->>'VNAD015kc') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015kc') END as VNAD015kc,
  CASE WHEN ((cast(response AS json))->>'VNAD015kd') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VNAD015kd') END as VNAD015kd,
  CASE WHEN ((cast(response AS json))->>'VYAZ010') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VYAZ010') END as vyaz010,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020x]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020x]') END as VYAZ020x,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020a]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020a]') END as vyaz020a,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020b]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020b]') END as vyaz020b,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020c]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020c]') END as vyaz020c,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020d]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020d]') END as vyaz020d,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020e]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020e]') END as vyaz020e,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020f]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020f]') END as vyaz020f,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020g]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020g]') END as vyaz020g,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020h]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020h]') END as vyaz020h,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020i]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020i]') END as vyaz020i,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020j]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020j]') END as vyaz020j,
  ((cast(response AS json))->>'VYAZ021j') as VYAZ021j,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020k]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020k]') END as vyaz020k,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020l]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020l]') END as vyaz020l,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020m]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020m]') END as vyaz020m,
  CASE WHEN ((cast(response AS json))->>'QYAZ020[VYAZ020n]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAZ020[VYAZ020n]') END as vyaz020n,
  ((cast(response AS json))->>'VYAZ021n') as VYAZ021n,
  CASE WHEN ((cast(response AS json))->>'VZAO010') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAO010') END as vzao010,
  ((cast(response AS json))->>'VZAO011') as VZAO011,
  CASE WHEN ((cast(response AS json))->>'VZAT010') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAT010') END as vzat010,
  CASE WHEN ((cast(response AS json))->>'VZAT020') = '999' THEN NULL WHEN ((cast(response AS json))->>'VZAT020') = '777' THEN NULL ELSE ((cast(response AS json))->>'VZAT020') END as vzat020,
  CASE WHEN ((cast(response AS json))->>'VZAT030') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAT030') END as vzat030,
  CASE WHEN ((cast(response AS json))->>'VZAT040') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAT040') END as vzat040,
  CASE WHEN ((cast(response AS json))->>'VZAT050') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAT050') END as vzat050,
  CASE WHEN ((cast(response AS json))->>'VZAT060') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAT060') END as vzat060,
  CASE WHEN ((cast(response AS json))->>'VZAT070') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAT070') END as vzat070,
  NULL as vzat080,
  NULL as VZAT081,
  CASE WHEN ((cast(response AS json))->>'VZAT100') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAT100') END as vzat100,
  CASE WHEN ((cast(response AS json))->>'VZAU010') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAU010') END as vzau010,
  ((cast(response AS json))->>'VZAU011') as VZAU011,
  ((cast(response AS json))->>'VZAU020') as VZAU020,
  CASE WHEN ((cast(response AS json))->>'VZAU021') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAU021') END as VZAU021,
  ((cast(response AS json))->>'VZAU030') as VZAU030,
  CASE WHEN ((cast(response AS json))->>'VZAU031') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAU031') END as VZAU031,
  NULL as vzau040,
  NULL as VZAU041,
  CASE WHEN ((cast(response AS json))->>'QZAU050[VZAU050x]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QZAU050[VZAU050x]') END as VZAU050x,
  CASE WHEN ((cast(response AS json))->>'QZAU050[VZAU050y]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QZAU050[VZAU050y]') END as VZAU050y,
  CASE WHEN ((cast(response AS json))->>'QZAU050[VZAU050a]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QZAU050[VZAU050a]') END as VZAU050a,
  CASE WHEN ((cast(response AS json))->>'QZAU050[VZAU050b]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QZAU050[VZAU050b]') END as VZAU050b,
  CASE WHEN ((cast(response AS json))->>'QZAU050[VZAU050c]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QZAU050[VZAU050c]') END as VZAU050c,
  CASE WHEN ((cast(response AS json))->>'QZAU050[VZAU050d]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QZAU050[VZAU050d]') END as VZAU050d,
  CASE WHEN ((cast(response AS json))->>'QZAU050[VZAU050e]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QZAU050[VZAU050e]') END as VZAU050e,
  CASE WHEN ((cast(response AS json))->>'QZAU050[VZAU050f]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QZAU050[VZAU050f]') END as VZAU050f,
  CASE WHEN ((cast(response AS json))->>'QZAU050[VZAU050g]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QZAU050[VZAU050g]') END as VZAU050g,
  ((cast(response AS json))->>'VZAU051') as VZAU051,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010x]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010x]') END as VYAP010x,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010y]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010y]') END as vyap010y,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010a]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010a]') END as vyap010a,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010b]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010b]') END as vyap010b,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010c]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010c]') END as vyap010c,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010d]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010d]') END as vyap010d,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010e]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010e]') END as vyap010e,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010f]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010f]') END as vyap010f,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010g]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010g]') END as vyap010g,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010h]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010h]') END as vyap010h,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010i]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010i]') END as vyap010i,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010j]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010j]') END as vyap010j,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010k]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010k]') END as vyap010k,
  CASE WHEN ((cast(response AS json))->>'QYAP010[VYAP010l]') = 'Y'  THEN '1' ELSE ((cast(response AS json))->>'QYAP010[VYAP010l]') END as vyap010l,
  ((cast(response AS json))->>'VZAP011') as VZAP011,
  ((cast(response AS json))->>'VZAP020') as VZAP020,
  CASE WHEN ((cast(response AS json))->>'VZAP021') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAP021') END as VZAP021,
  NULL as VZAP022,
  ((cast(response AS json))->>'VZAP030') as VZAP030,
  CASE WHEN ((cast(response AS json))->>'VZAP031') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAP031') END as VZAP031,
  NULL as VZAP032,
  ((cast(response AS json))->>'VZAP040') as VZAP040,
  CASE WHEN ((cast(response AS json))->>'VZAP041') = '999' THEN NULL ELSE ((cast(response AS json))->>'VZAP041') END as VZAP041,
  NULL as VZAP042,
  ((cast(response AS json))->>'QYAP080[VYAP080a]') as VYAP080a,
  ((cast(response AS json))->>'QYAP080[VYAP080b]') as VYAP080b,
  ((cast(response AS json))->>'QYAP080[VYAP080c]') as VYAP080c,
  CASE WHEN ((cast(response AS json))->>'VYAP080x') = '999' THEN NULL ELSE ((cast(response AS json))->>'VYAP080x') END as VYAP080x,
  ((cast(response AS json))->>'QYAP090[VYAP090a]') as VYAP090a,
  ((cast(response AS json))->>'QYAP090[VYAP090b]') as VYAP090b,
  ((cast(response AS json))->>'QYAP090[VYAP090c]') as VYAP090c,
  CASE WHEN ((cast(response AS json))->>'VYAP090x') = '999' THEN NULL ELSE ((cast(response AS json))->>'VYAP090x') END as VYAP090x


FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.actinfo_aus.production'
AND survey_response_view.patient_id != '1169'
AND survey_response_view.patient_id != '387'
AND survey_response_view.patient_id != '1';