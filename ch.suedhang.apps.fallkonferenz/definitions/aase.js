d.bdi = {
    "options": {
        "min": 0,
        "max": 63,
        "item_height": 50,
        "item_text_left": 130,
        "item_text_right": 130,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": true,
        "show_scale_text": false,
        "show_score_vertical_line": true,
        "show_score_profile_line": false,
        "show_score_circles": true,
        "show_settings_block": true,
        "range_alpha": 0.1,
        "vertical_grid_every_x": 3,
        "response_title_path": "calculation.bdi_score.score.current_range.interpretation_de",
        "response_date_path": "date"
    },
    "scales": [{
        "left_title": "Kein Verdacht auf eine Depression",
        "left_text": "",
        "right_title": "Verdacht auf eine schwere Depression",
        "right_text": "",
        "score_path": "calculation.bdi_score.score.score",
        "clinic_sample_var": null
    }],
    "ranges": [{
        "range_start": 0,
        "range_stop": 8.5,
        "text": "Kein Verdacht auf eine Depression",
        "color": "#2E7D32"
    }, {
        "range_start": 8.5,
        "range_stop": 13.5,
        "text": "Verdacht auf eine minimale Depression",
        "color": "#FFA000"
    }, {
        "range_start": 13.5,
        "range_stop": 19.5,
        "text": "Verdacht auf eine leichte Depression",
        "color": "#FBB100"
    }, {
        "range_start": 19.5,
        "range_stop": 28.5,
        "text": "Verdacht auf eine mittelschwere Depression",
        "color": "#FB7200"
    }, {
        "range_start": 28.5,
        "range_stop": 63,
        "text": "Verdacht auf eine schwere Depression",
        "color": "#C62828"
    }]
};