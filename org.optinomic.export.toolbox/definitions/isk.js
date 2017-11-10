d.isk = {
    "options": {
        "name": "ISK",
        "description": "Komplettexport",
        "export_optinomic_ids": true,
        "export_patient_details": false,
        "export_stay_details": false,
        "export_header": true,
        "delimter": ";",
        "source": "isk"
    },
    "fields": [
        { "name": "Erhebungszeitpunkt", "path": "survey_response.response.Erhebungszeitpunkt" },
        { "name": "Datum", "path": "survey_response.response.Datum" },
        { "name": "isk_01", "path": "survey_response.response.AISK[AISK1]" },
        { "name": "isk_02", "path": "survey_response.response.AISK[AISK2]" },
        { "name": "isk_03", "path": "survey_response.response.AISK[AISK3]" },
        { "name": "isk_99", "path": "survey_response.response.AISK[AISK3]" },
        { "name": "isk_04", "path": "survey_response.response.AISK[AISK4]" },
        { "name": "isk_05", "path": "survey_response.response.AISK[AISK5]" },
        { "name": "isk_06", "path": "survey_response.response.AISK[AISK6]" },
        { "name": "isk_07", "path": "survey_response.response.AISK[AISK7]" },
        { "name": "isk_08", "path": "survey_response.response.AISK[AISK8]" },
        { "name": "isk_09", "path": "survey_response.response.AISK[AISK9]" },
        { "name": "isk_10", "path": "survey_response.response.AISK[AIS10]" },
        { "name": "isk_11", "path": "survey_response.response.AISK[AIS11]" },
        { "name": "isk_12", "path": "survey_response.response.AISK[AIS12]" },
        { "name": "isk_13", "path": "survey_response.response.AISK[AIS13]" },
        { "name": "isk_14", "path": "survey_response.response.AISK[AIS14]" },
        { "name": "isk_15", "path": "survey_response.response.AISK[AIS15]" },
        { "name": "isk_16", "path": "survey_response.response.AISK[AIS16]" },
        { "name": "isk_17", "path": "survey_response.response.AISK[AIS17]" },
        { "name": "isk_18", "path": "survey_response.response.AISK[AIS18]" },
        { "name": "isk_19", "path": "survey_response.response.AISK[AIS19]" },
        { "name": "isk_20", "path": "survey_response.response.AISK[AIS20]" },
        { "name": "isk_21", "path": "survey_response.response.AISK[AIS21]" },
        { "name": "isk_22", "path": "survey_response.response.AISK[AIS22]" },
        { "name": "isk_23", "path": "survey_response.response.AISK[AIS23]" },
        { "name": "isk_24", "path": "survey_response.response.AISK[AIS24]" },
        { "name": "isk_25", "path": "survey_response.response.AISK[AIS25]" },
        { "name": "isk_26", "path": "survey_response.response.AISK[AIS26]" },
        { "name": "isk_27", "path": "survey_response.response.AISK[AIS27]" },
        { "name": "isk_28", "path": "survey_response.response.AISK[AIS28]" },
        { "name": "isk_29", "path": "survey_response.response.AISK[AIS29]" },
        { "name": "isk_30", "path": "survey_response.response.AISK[AIS30]" },
        { "name": "isk_31", "path": "survey_response.response.AISK[AIS31]" },
        { "name": "isk_32", "path": "survey_response.response.AISK[AIS32]" },
        { "name": "isk_33", "path": "survey_response.response.AISK[AIS33]" },
        { "name": "offensivitaet_scale_score", "path": "calculation.all_results.offensivit__t_scale_score" },
        { "name": "offensivitaet_sum_score", "path": "calculation.all_results.offensivit__t_sum_score" },
        { "name": "offensivitaet_z_score", "path": "calculation.all_results.offensivit__t_z_score" },
        { "name": "soziale_orientierung_scale_score", "path": "calculation.all_results.soziale_orientierung_scale_score" },
        { "name": "soziale_orientierung_sum_score", "path": "calculation.all_results.soziale_orientierung_sum_score" },
        { "name": "soziale_orientierung_z_score", "path": "calculation.all_results.soziale_orientierung_z_score" },
        { "name": "selbststeuerung_scale_score", "path": "calculation.all_results.selbststeuerung_scale_score" },
        { "name": "selbststeuerung_sum_score", "path": "calculation.all_results.selbststeuerung_sum_score" },
        { "name": "selbststeuerung_z_score", "path": "calculation.all_results.selbststeuerung_z_score" },
        { "name": "reflexibilitaet_scale_score", "path": "calculation.all_results.reflexibilit__t_scale_score" },
        { "name": "reflexibilitaet_sum_score", "path": "calculation.all_results.reflexibilit__t_sum_score" },
        { "name": "reflexibilitaet_z_score", "path": "calculation.all_results.reflexibilit__t_z_score" }
    ]
};