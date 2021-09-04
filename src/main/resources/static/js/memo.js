$(document).ready(function () {
    $.ajax({
        url:`/api/get/ticket/memo/${localStorage.getItem("username")}/${localStorage.getItem("selectedTripId")}`,
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem("TickItToken")}`,
        },
        // async:false,
        method: 'GET',
        success: function(data){
            if(data.length > 0){
                let dataSource = new Array();
                $.each(data, function (index, item) {
                    let subData = new Object();
                    subData.title = item.ticketNickname;
                    subData.description = item.memo;
                    subData.date = new Date(item.ticketDate);
                    dataSource.push(subData);
                });
                setTimeline(dataSource);
            }
        },
        error: function(e){
            debugger;
            // window.location.href = '/';
        }
    });

    const setTimeline = function(dataSource){
        $("#timeline").kendoTimeline({
            orientation: "vertical", // Define the layout of the widget.
            alterMode: true, // Render the events on both sides of the axis in the vertical mode.
            collapsibleEvents: true, // Start all collapsed events in the vertical mode.
            chartArea: {
                background: "aliceblue"
            },
            dataSource: {
                data: dataSource, // Defined later in this snippet.
                schema: {
                    model: {
                        fields: {
                            date: {
                                type: "date"
                            },
                        }
                    }
                }
            }
        });
        // alternatingMode: true,
    };
});
