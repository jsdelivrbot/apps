d.actinfo_audit = {
    "options": {
        "min": 0,
        "max": 40,
        "item_height": 50,
        "item_text_left": 100,
        "item_text_right": 100,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": false,
        "show_scale_text": true,
        "show_score_vertical_line": true,
        "show_score_profile_line": false,
        "show_score_circles": true,
        "show_settings_block": true,
        "range_alpha": 0.1,
        "vertical_grid_every_x": 5,
        "response_title_path": "calculation.actinfo_ein_calc.messzeitpunkt.mz_text",
        "response_date_path": "date"
    },
    "scales": [{
        "left_title": "",
        "left_text": "Risikoarmer Alkoholkonsum",
        "right_title": "",
        "right_text": "Verdacht auf Alkoholabhängigkeit",
        "score_path": "calculation.actinfo_ein_calc.AUDIT.AUDIT_Score",
        "clinic_sample_var": null
    }],
    "ranges": [{
        "range_start": 0,
        "range_stop": 7.5,
        "text": "Risikoarmer Alkoholkonsum",
        "color": "#2E7D32"
    }, {
        "range_start": 7.5,
        "range_stop": 15.5,
        "text": "Verdacht auf eine alkoholbezogene Störung",
        "color": "#FBB100"
    }, {
        "range_start": 15.5,
        "range_stop": 40,
        "text": "Hohe Wahrscheinlichkeit einer Alkoholabhängigkeit",
        "color": "#C62828"
    }]
};


d.actinfo_fagerstroem = {
    "options": {
        "min": 0,
        "max": 10,
        "item_height": 50,
        "item_text_left": 100,
        "item_text_right": 100,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": false,
        "show_scale_text": true,
        "show_score_vertical_line": true,
        "show_score_profile_line": false,
        "show_score_circles": true,
        "show_settings_block": true,
        "range_alpha": 0.1,
        "vertical_grid_every_x": 1,
        "response_title_path": "app_name",
        "response_date_path": "date"
    },
    "scales": [{
        "left_title": "",
        "left_text": "Gering",
        "right_title": "",
        "right_text": "Stark",
        "score_path": "FAGERSTROEM.FAGERSTROEM_Score",
        "clinic_sample_var": null
    }],
    "ranges": [{
        "range_start": 0,
        "range_stop": 2.5,
        "text": "Gering ausgeprägte körperliche Abhängigkeit.",
        "color": "#2E7D32"
    }, {
        "range_start": 2.5,
        "range_stop": 4.5,
        "text": "Mittelstark ausgeprägte körperliche Abhängigkeit.",
        "color": "#FFA000"
    }, {
        "range_start": 4.5,
        "range_stop": 6.5,
        "text": "Stark ausgeprägte körperliche Abhängigkeit.",
        "color": "#FB7200"
    }, {
        "range_start": 6.5,
        "range_stop": 10.5,
        "text": "Sehr stark ausgeprägte körperliche Abhängigkeit.",
        "color": "#C62828"
    }]
};