$(document).ready(function () {
    const getGraphData = function(){
        $.ajax({
            url:`/api/get/ticket/graph/byDate/${localStorage.getItem("username")}/${localStorage.getItem("selectedTripId")}`,
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            // async:false,
            method: 'GET',
            success: function(data){
                createTotalPieChart(data);
                createEachDateBarChart(data);
                createEachDateGrid(data);
            },
            error: function(e){
                debugger;
                // window.location.href = '/';
            }
        });
    }

    const createTotalPieChart = function (data) {

        const pieChartPriceData = [];
        pieChartPriceData['교통수단'] = 0;
        pieChartPriceData['식당'] = 0;
        pieChartPriceData['숙소'] = 0;
        pieChartPriceData['여행지'] = 0;

        data.forEach(function(elem){
            pieChartPriceData[elem.ticketTypeName] += elem.ticketPrice;
        });

        const pieChartData =[
            {'ticketTypeName':'교통수단', 'ticketPrice':pieChartPriceData['교통수단']},
            {'ticketTypeName':'식당', 'ticketPrice':pieChartPriceData['식당']},
            {'ticketTypeName':'숙소', 'ticketPrice':pieChartPriceData['숙소']},
            {'ticketTypeName':'여행지', 'ticketPrice':pieChartPriceData['여행지']}].filter(t => t.ticketPrice > 0) ;

        $(`#pi-chart-total-ratio`).kendoChart({
            title: {
                position: "top",
                text: "여행 총 지출 비율"
            },
            legend: {
                position: "bottom"
            },
            chartArea: {
                background: "aliceblue"
            },
            dataSource: {
                data: pieChartData
            },
            seriesDefaults: {
                labels: {
                    position: "outsideEnd",
                    visible: true,
                    background: "transparent",
                    template: "#= category #: \n #= value#원"
                }
            },
            series: [{
                type: "pie",
                field: "ticketPrice",
                categoryField: "ticketTypeName",
            }],
            tooltip: {
                visible: true,
                template: "${ category } - ${ value }원"
            }
        });
    }

    const createEachDateBarChart = function (data) {
        const ticketDateList = data.map(t => t.ticketDate);
        const uniqueTicketDateList = ticketDateList.filter((v, i, a) => a.indexOf(v) === i);
        const eachDateBarChartData = [];

        uniqueTicketDateList.forEach(function(elem){
            const vehicleData = data.filter(t => t.ticketDate == elem && t.ticketTypeName == "교통수단");
            const accommodation = data.filter(t => t.ticketDate == elem && t.ticketTypeName == "숙소");
            const tourPlace = data.filter(t => t.ticketDate == elem && t.ticketTypeName == "여행지");
            const restaurant = data.filter(t => t.ticketDate == elem && t.ticketTypeName == "식당");

            eachDateBarChartData.push({'ticketDate':elem, 'vehicle':vehicleData[0]?.ticketPrice, 'accommodation':accommodation[0]?.ticketPrice,
                'tourPlace':tourPlace[0]?.ticketPrice, 'restaurant':restaurant[0]?.ticketPrice});
        });

        $(`#bar-graph-chart-each-date-ratio`).kendoChart({
            title: {
                text: "일자별 지출 비율"
            },
            dataSource: {
                data: eachDateBarChartData
            },
            legend: {
                position: "top"
            },
            chartArea: {
                background: "aliceblue"
            },
            seriesDefaults: {
                type: "column",
            },
            series: [{
                    field: "vehicle",
                    categoryField: "ticketDate",
                    name: "교통수단"
                },
                {
                    field: "accommodation",
                    categoryField: "ticketDate",
                    name: "숙소"
                },
                {
                    field: "tourPlace",
                    categoryField: "ticketDate",
                    name: "여행지"
                },{
                    field: "restaurant",
                    categoryField: "ticketDate",
                    name: "식당"
                },
            ],
            valueAxis: {
                line: {
                    visible: false
                },
                axisCrossingValue: 0
            },
            categoryAxis: {
                line: {
                    visible: false
                },
                labels: {
                    padding: {top: 10},
                    font: "1rem Arial, Helvetica, sans-serif",
                    color: "#212529"
                }
            },
            tooltip: {
                visible: true,
                format: "N0"
            }
        });
    }

    const createEachDateGrid = function(data){
        const ticketDateList = data.map(t => t.ticketDate);
        const uniqueTicketDateList = ticketDateList.filter((v, i, a) => a.indexOf(v) === i);
        let tableString = `
        <table id="graph-summary-table" class="table table-sm">
            <thead>
            <tr>
                <th scope="col">일자</th>
                <th scope="col">종류</th>
                <th scope="col">금액</th>
            </tr>
            </thead>
            <tbody> `;
        uniqueTicketDateList.forEach(function(elem){
            const sameDateData = data.filter(t => t.ticketDate == elem);
            if(sameDateData.length > 0) {
                for(let i = 0 ; i < sameDateData.length; i++){
                    tableString += `<tr> `
                    if(i === 0){
                        tableString += `<td rowspan=${sameDateData.length}> ${elem} </td>`
                    }
                    tableString += `<td>${sameDateData[i].ticketTypeName}</td>`
                    tableString += `<td>${sameDateData[i].ticketPrice}</td>`
                    tableString += `</tr> `
                }
            }
        });
        tableString += `
            </tbody>
        </table>`;
        $('#grid-each-date').append(tableString);
    }
    getGraphData();
    // $(document).bind("kendo:skinChange", getGraphData);
});
