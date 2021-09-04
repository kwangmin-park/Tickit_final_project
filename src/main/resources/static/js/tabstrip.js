$(document).ready(function () {
    var ts = $("#tabstrip").kendoTabStrip({
        animation: { open: { effects: "fadeIn"} },
        contentUrls: [
            '../vehicle_template.html',
            '../restaurant_template.html',
            '../accommodation_template.html',
            '../tour_place_template.html',
            '../checklist_template.html',
        ]
    }).data('kendoTabStrip');
});