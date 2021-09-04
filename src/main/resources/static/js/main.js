//select trip function 추가해야됨. localStorage에 있는 tripData를 json으로 바꾼다음에 선택된 tripId 데이터를 가지고 여행데이터를 불러와야함.
$(document).ready(function () {
    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center"
    }
    $.fn.editable.defaults.mode = 'inline';
    $.fn.editableform.buttons =
        '<button type="submit" class="btn btn-primary btn-sm editable-submit">' +
        '<i class="fa fa-fw fa-check"></i>' +
        '</button>' +
        '<button type="button" class="btn btn-warning btn-sm editable-cancel">' +
        '<i class="fa fa-fw fa-times"></i>' +
        '</button>';

    const updateTrip = function(){
        const tripDto = {
            "username":localStorage.getItem("username"),
            "tripId":localStorage.getItem("selectedTripId"),
            "tripName":$('#tripName').text(),
            "targetPrice":$('#targetPrice').text(),
            "curPrice":$('#curPrice').text()
        }
        $.ajax({
            url:'/api/update/trip',
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            contentType: 'application/json',
            data:JSON.stringify(tripDto),
            method: 'POST',
            success: function(data){
                toastr.success(`여행정보가 변경되었습니다.`);
            },
            error: function(e){
                toastr.warning(e.responseJSON.message);
                debugger;
            }
        });
    }

    const deleteTrip = function(tripId){
        if(!tripId){
            toastr.warning('잘못된 여행정보입니다.');
            return;
        }

        //db에서 삭제
        $.ajax({
            url:`api/delete/trip/${Number(tripId)}`, //나중엔 여기에 티켓 id 들어갈것
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            contentType: 'application/json',
            method: 'DELETE',
            success: function(data){
                debugger;
                //겉보기 구현 : 삭제모습
                toastr.success(`여행정보가 삭제되었습니다`);
                tripCheck();
                $("#tripListWindow").data("kendoWindow").close();
            },
            error: function(e){
                toastr.warning(e.responseJSON.message);
                debugger;
            }
        });
    }

    //    권한 체크
    const authCheck = function(){
        $.ajax({
            url:'/api/user',
            async:false,
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            method: 'GET',
            success: function(data){
                const username = data.username;
                const nickname = data.nickname;
                const authorities = data.authorities;
                localStorage.setItem("username", username);
                localStorage.setItem("nickname", nickname);
                localStorage.setItem("authorities", JSON.stringify(authorities));
                tripCheck();
            },
            error: function(e){
                debugger;
                window.location.href = '/';
            }
        });
    }
    const tripCheck = function (){
        $.ajax({
            url:`/api/get/trip/${localStorage.getItem("username")}`,
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            async:false,
            method: 'GET',
            success: function(data){
                if(!data.length){
                    tripRegister(`${localStorage.getItem("username")}님의 첫번째 여행!`);
                }else{
                    if(!localStorage.getItem('selectedTripId')) {
                        localStorage.setItem("selectedTripId", data[0].tripId);
                    }
                    localStorage.setItem("tripList", JSON.stringify(data));
                    setTripInfo(data);
                }
            },
            error: function(e){
                debugger;
                window.location.href = '/';
            }
        });
    };
    const tripRegister = function(tripName = ""){
        const tripDto = {
            "username":localStorage.getItem("username"),
            "tripName":tripName,
            "targetPrice":"0",
            "curPrice":"0"
        }
        $.ajax({
            url:'/api/register/trip',
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            contentType: 'application/json',
            data:JSON.stringify(tripDto),
            method: 'POST',
            success: function(data){
                toastr.success(`여행 ${data.tripName}이 추가되었습니다`);
                localStorage.setItem('selectedTripId',data.tripId);
                debugger;
                location.reload();
                // tripCheck();
            },
            error: function(e){
                toastr.warning(e.responseJSON.message);
                debugger;
            }
        });
    }

    const setTripInfo = function(tripInfo){
        //현재가 목표가 여행이름 변경 필요
        const selecteTripInfo = tripInfo.filter((t) => t.tripId == localStorage.getItem('selectedTripId'))[0];
        $('#tripName').editable('setValue',selecteTripInfo.tripName);
        $('#targetPrice').editable('setValue',selecteTripInfo.targetPrice);
        $('#curPrice').editable('setValue',selecteTripInfo.curPrice);

        //tripListWindow 초기화
        $('#tripListUl').empty();
        $.each(tripInfo, function(index, value){
            if(value.tripId != localStorage.getItem('selectedTripId')) {
                $('#tripListUl').append(`<li class="list-group-item tripLiItem" tripId="${value.tripId}"><span class="btnChangeTrip cursor" tripId="${value.tripId}">${value.tripName}</span><span class="btnDeleteTrip cursor" tripId="${value.tripId}"><i class="fas fa-trash-alt"></i></span></li>`);
            }else{
                $('#tripListUl').append(`<li class="list-group-item tripLiItem active" tripId="${value.tripId}"><span>${value.tripName}</span></li>`);
            }
        });
        // $(`li[tripId=${localStorage.getItem('selectedTripId')}]`).addClass("active");
        //이벤트 중복때문에 span에 이벤트 처리
        // $('#tripListWindow ul').on('click', 'li', function(e){
        //     debugger;
        //     e.preventDefault();
        //     if($(this).attr('tripId') === localStorage.getItem('selectedTripId'))
        //         return;
        //     localStorage.setItem('selectedTripId', $(this).attr('tripId'));
        //     location.reload();
        // });
        $('.btnChangeTrip').click(function(e){
            e.preventDefault();
            if($(this).attr('tripId') === localStorage.getItem('selectedTripId'))
                return;
            localStorage.setItem('selectedTripId', $(this).attr('tripId'));
            location.reload();
        })

        $('.btnDeleteTrip').click(function(){
            debugger;
            deleteTrip($(this).attr('tripId'));
        });
    }
    authCheck();

    $('#tripName').editable({
        type: 'text',
        pk: 1,
        name: 'tripName',
        title: 'Enter tripName',
        value: '여행',
    });

    $('#targetPrice').editable({
        type: 'text',
        pk: 1,
        name: 'targetPrice',
        title: 'Enter targetPrice',
        value: '0',
    });
    $('#curPrice').editable({
        type: 'text',
        pk: 1,
        name: 'curPrice',
        title: 'Enter curPrice',
        value: '0',
    });
    $('#tripName, #targetPrice, #curPrice').on('save', function(e, params) {
        $(this).text(params.newValue);
        updateTrip();
        if($(e.currentTarget).attr('id') === 'tripName'){
            tripCheck()
        }
    });

    $("#tripListWindow").kendoWindow({
        width: "600px",
        height: "auto",
        title: "Select Trip",
        visible: false,
        actions: [
            "Close"
        ]
    })

    $('#btnRegisterTrip').click(function(){
        tripRegister(`${localStorage.getItem('username')}님의 새로운 여행!`);
    })

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    $("#content-section").load("tabstrip.html");
    $('.menu-item').click(function(){
        $("#content-section").load($(this).attr('a-url'));
    });
    $("#logout").click(function(){
        localStorage.clear();
        window.location.href='/';
    });
    $('#tripMenuBar').click(function(){
        $("#tripListWindow").data("kendoWindow").center().open();
    });
    $(window).resize(function(){
        $("#pi-chart-total-ratio").data("kendoChart")?.refresh();
        $("#bar-graph-chart-each-date-ratio").data("kendoChart")?.refresh();
    })
});