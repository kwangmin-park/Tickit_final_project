const colorList = ["#f58a8a", "#FAED7D", "#f8a398", "#51a0ed", "#56ca85"]
$(document).ready(function () {
    $.ajax({
        url:`/api/get/ticket/schedule/${localStorage.getItem("username")}/${localStorage.getItem("selectedTripId")}`,
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem("TickItToken")}`,
        },
        // async:false,
        method: 'GET',
        success: function(data){
            if(data.length > 0){
                let dataSource = [];
                $.each(data, function (index, item) {
                    let subData = {};
                    // subData.id = item.id;
                    subData.backColor = item.id
                    subData.start = new Date(item.start);
                    subData.end = new Date(item.end);
                    subData.description = item.description;
                    subData.title = item.title;
                    dataSource.push(subData);
                });
                setScheduler(dataSource);
            }
        },
        error: function(e){
            debugger;
            // window.location.href = '/';
        }
    });

    const setScheduler = function(dataSource){
        let dates = dataSource.map(t=> t.start);
        let minDate = dates.sort((a,b)=>a-b)[0], max= dates.slice(-1)[0];

        $("#scheduler").kendoScheduler({
            dataSource: dataSource,
            date: minDate,
            views: [
                "day",
                "week",
                { type: "month", selected: true },
                "agenda",
                "timeline"
            ],
            resources: [
                {
                    field: "backColor",
                    dataSource: [
                        { text: "", value: 1, color: colorList[1] },
                        { text: "", value: 2, color: colorList[2] },
                        { text: "", value: 3, color: colorList[3] },
                        { text: "", value: 4, color: colorList[4] },
                    ],
                    // title: "Room"
                },
            ]
        });
    };
});
