d.isk = {
    "options": {
        "app_id": "org.optinomic.export.toolbox.suedhang",
        "calculation_id": "isk_full",
        "name": "ISK1",
        "delimitter": ";"
    },
    "fields": [
        { "name": "MedStatFid", "path": "stay.cis_fid", "type": "number"},
        { "name": "FID", "path": "stay.cis_fid", "type": "number"},
        { "name": "Erhebungszeitpunkt", "path": "survey_response.response.Erhebungszeitpunkt", "type": "number"},
        { "name": "Datum", "path": "survey_response.response.Datum", "type": "date"},
        { "name": "isk_01", "path": "survey_response.response.AISK[AISK1]", "type": "number" },
        { "name": "isk_02", "path": "survey_response.response.AISK[AISK2]", "type": "number" },
        { "name": "isk_03", "path": "survey_response.response.AISK[AISK3]", "type": "number" },
        { "name": "isk_04", "path": "survey_response.response.AISK[AISK4]", "type": "number" },
        { "name": "isk_05", "path": "survey_response.response.AISK[AISK5]", "type": "number" },
        { "name": "isk_06", "path": "survey_response.response.AISK[AISK6]", "type": "number" },
        { "name": "isk_07", "path": "survey_response.response.AISK[AISK7]", "type": "number" },
        { "name": "isk_08", "path": "survey_response.response.AISK[AISK8]", "type": "number" },
        { "name": "isk_09", "path": "survey_response.response.AISK[AISK9]", "type": "number" },
        { "name": "isk_10", "path": "survey_response.response.AISK[AIS10]", "type": "number" },
        { "name": "isk_11", "path": "survey_response.response.AISK[AIS11]", "type": "number" },
        { "name": "isk_12", "path": "survey_response.response.AISK[AIS12]", "type": "number" },
        { "name": "isk_13", "path": "survey_response.response.AISK[AIS13]", "type": "number" },
        { "name": "isk_14", "path": "survey_response.response.AISK[AIS14]", "type": "number" },
        { "name": "isk_15", "path": "survey_response.response.AISK[AIS15]", "type": "number" },
        { "name": "isk_16", "path": "survey_response.response.AISK[AIS16]", "type": "number" },
        { "name": "isk_17", "path": "survey_response.response.AISK[AIS17]", "type": "number" },
        { "name": "isk_18", "path": "survey_response.response.AISK[AIS18]", "type": "number" },
        { "name": "isk_19", "path": "survey_response.response.AISK[AIS19]", "type": "number" },
        { "name": "isk_20", "path": "survey_response.response.AISK[AIS20]", "type": "number" },
        { "name": "isk_21", "path": "survey_response.response.AISK[AIS21]", "type": "number" },
        { "name": "isk_22", "path": "survey_response.response.AISK[AIS22]", "type": "number" },
        { "name": "isk_23", "path": "survey_response.response.AISK[AIS23]", "type": "number" },
        { "name": "isk_24", "path": "survey_response.response.AISK[AIS24]", "type": "number" },
        { "name": "isk_25", "path": "survey_response.response.AISK[AIS25]", "type": "number" },
        { "name": "isk_26", "path": "survey_response.response.AISK[AIS26]", "type": "number" },
        { "name": "isk_27", "path": "survey_response.response.AISK[AIS27]", "type": "number" },
        { "name": "isk_28", "path": "survey_response.response.AISK[AIS28]", "type": "number" },
        { "name": "isk_29", "path": "survey_response.response.AISK[AIS29]", "type": "number" },
        { "name": "isk_30", "path": "survey_response.response.AISK[AIS30]", "type": "number" },
        { "name": "isk_31", "path": "survey_response.response.AISK[AIS31]", "type": "number" },
        { "name": "isk_32", "path": "survey_response.response.AISK[AIS32]", "type": "number" },
        { "name": "isk_33", "path": "survey_response.response.AISK[AIS33]", "type": "number" },
        { "name": "offensivitaet_scale_score", "path": "calculation.all_results.offensivit__t_scale_score", "type": "number" },
        { "name": "offensivitaet_sum_score", "path": "calculation.all_results.offensivit__t_sum_score", "type": "number" },
        { "name": "offensivitaet_z_score", "path": "calculation.all_results.offensivit__t_z_score", "type": "number" },
        { "name": "soziale_orientierung_scale_score", "path": "calculation.all_results.soziale_orientierung_scale_score", "type": "number" },
        { "name": "soziale_orientierung_sum_score", "path": "calculation.all_results.soziale_orientierung_sum_score", "type": "number" },
        { "name": "soziale_orientierung_z_score", "path": "calculation.all_results.soziale_orientierung_z_score", "type": "number" },
        { "name": "selbststeuerung_scale_score", "path": "calculation.all_results.selbststeuerung_scale_score", "type": "number" },
        { "name": "selbststeuerung_sum_score", "path": "calculation.all_results.selbststeuerung_sum_score", "type": "number" },
        { "name": "selbststeuerung_z_score", "path": "calculation.all_results.selbststeuerung_z_score", "type": "number" },
        { "name": "reflexibilitaet_scale_score", "path": "calculation.all_results.reflexibilit__t_scale_score", "type": "number" },
        { "name": "reflexibilitaet_sum_score", "path": "calculation.all_results.reflexibilit__t_sum_score", "type": "number" },
        { "name": "reflexibilitaet_z_score", "path": "calculation.all_results.reflexibilit__t_z_score", "type": "number" }
    ]
};