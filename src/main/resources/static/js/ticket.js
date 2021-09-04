$(document).ready(function () { //렌더링 완료 후 실행

    //현재 날짜와 시간, 1시간 반 후의 날짜와 시간을 객체로 리턴해주는 함수
    const makeTimes = function(){

        let today = new Date();
        let month = today.getMonth()+1;
        let day = today.getDate();
        let hour = today.getHours();
        let minute = today.getMinutes();
        let todayDate = today.getFullYear()+'.'+(month<10?'0':'')+month+'.'+(day<10? '0':'')+day;
        let todayTime = (hour<10?'0':'')+hour + ' : '+(minute<10?'0':'')+minute;

        let laterDay = day;
        let laterHour;
        if(hour+1>=24){
            laterHour = (hour+1)-24;
            laterDay++;
        }
        else{
            laterHour = hour+1;
        }
        // let laterHour = (hour+1)>=24?(hour+1)-24:hour+1;
        let laterMinute = (minute+30)>=60?((minute+30)-60):minute+30;
        let laterDate = today.getFullYear()+'/'+(month<10?'0':'')+month+'/'+(laterDay<10? '0':'')+laterDay;
        let laterTime =  (laterHour<10?'0':'')+(laterHour) + ' : '+(laterMinute<10?'0':'')+(laterMinute);

        const timeObject={
            "todayDate":todayDate,
            "todayTime":todayTime,
            "laterDate":laterDate,
            "laterTime":laterTime
        };
        return timeObject;
    }
    //새 티켓 추가
    const transTicketRegister = function () {

        const mytime = new makeTimes();

        //  티켓 저장 객체 생성 ( 교통수단)
        const ticketDto = {
            "ticketDate": `${mytime.todayDate}`,
            "ticketNickname":"내 티켓 이름",
            "departCountry":"출발 도시",
            "departPlace": "출발 위치",
            "departDate":`${mytime.todayDate}`,
            "departTime":`${mytime.todayTime}`,
            "arriveCountry":"도착 도시",
            "arrivePlace": "도착 위치",
            "arriveDate":`${mytime.laterDate}`,
            "arriveTime":`${mytime.laterTime}`,
            "ticketPrice": "30,000",
            "username": `${localStorage.getItem("username")}`,
            "tripId": `${localStorage.getItem('selectedTripId')}`,
            "transportId": "1",
            "memo":" ",
            "ticketType":`1`
        }

        $.ajax({
            url: 'api/add/ticket/transport',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            contentType: 'application/json',
            data: JSON.stringify(ticketDto),
            method: 'POST', //'PATCH' (update 용)
            success: function (data) {
                //debugger;
                toastr.success(` ${ticketDto.ticketDate}의 티켓이 추가되었습니다`);
                showTickets(data);
            },
            error: function (e) {
                toastr.warning(e.responseJSON.message);
                debugger;
            }
        });
    }

    //티켓 불러오기(티켓 1개 추가)
    const showTickets = function (item) {
        // $('#ticket-container').append($('.ticket-template').html());
        //index:  객체의 인덱스 item : 객체가 가진 값

       // debugger;
        //티켓 템플릿
        $('.empty-ticket-body').before(`
            <div class="ticket-body col-3 not-clickable " tickId=${item.ticketId}> 
                <div class="row margin-fit"><!--티켓 왼쪽 : 메인 공간--> 
                    <div class="ticket-main col-8 ">
                        <!--티켓 헤더--> 
                        <div class="ticket-header ticket-main-header ">
                            <div class="header-title">
                                <i class="fas fa-plane"></i>  Boarding Pass
                            </div> 
                            <div class="header-menu hidden"> 
                                <button class="ticket-header-btn ticket-modify"><i class="fas fa-dot-circle"></i></button>  
                                <button class="ticket-header-btn ticket-del " tickId=${item.ticketId}><i class="fas fa-dot-circle"></i></button> 
                            </div> 
                        </div> 
                        <!--티켓 본문-->
                        <div class="ticket-content">
                            <div class="ticket-date"><input type="text" class="ticketDate" required value="${item.ticketDate}"></div> 
                            <h4 class="ticket-nickname"><input type="text" class="ticketNickname width-md"  value="${item.ticketNickname}"></h4> 
                            <div class="ticket-main-content"> 
                                <div class="depart-content row">
                                    <div class="col ticket-place-margin"> 
                                        <span class="emp-word">FROM</span><input type="text" class="departCountry width-small"  value="${item.departCountry}"></h4>  
                                        <br>
                                        <input type="text" class="departPlace width-lg"  value="${item.departPlace}">
                                    </div> 
                                    <span class="col"> 
                                        <span class="ticket-mini-date"><input type="text" class="departDate width-small"  value="${item.departDate}"></span>
                                        <br>
                                        <span class="ticket-time"><input type="text" class="departTime width-small"  value="${item.departTime}"></span> 
                                    </span> 
                                </div> 
                                <div class="line-decor"></div> 
                                <div class="depart-content row"> 
                                    <div class="col ticket-place-margin">
                                        <span class="emp-word">TO</span> 
                                        <input type="text" class="arriveCountry width-small"  value="${item.arriveCountry}">
                                        <br>
                                        <input type="text" class="arrivePlace width-lg"  value="${item.arrivePlace} ">
                                    </div> 
                                    <span class="col"> 
                                        <span class="ticket-mini-date"> <input type="text" class="arriveDate width-small"  value="${item.arriveDate}"></span> 
                                        <br>
                                        <span class="ticket-time"> <input type="text" class="arriveTime width-small"  value="${item.arriveTime}"></span> 
                                    </span> 
                                </div> 
                            </div> 
                            <div class="ticket-price-container"><input type="text" class="ticketPrice ticket-price" pattern="[0-9]+"  value="${item.ticketPrice}" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"></div>
                            <div class="ticket-currency">원</div>
                        </div> 
                    </div> 
                    <!--티켓 오른쪽 : 메모공간--> 
                    <div class="ticket-main col-4 me-3"> 
                        <div class="ticket-header  ">
                            <i class="fas fa-pencil-alt"></i>  My Memo
                        </div> 
                        <div class="ticket-memo container memo-container"><textarea class="memoContent" >${item.memo}</textarea>  </div> 
                    </div> 
                </div> 
            </div>`);

    };


    //이름과 여행 이름으로 여행 불러오기 + 티켓 id(ticketType)
    const getTransTickets = function () {
        const ticketType=1;
        $.ajax({
            //TODO 여기를 transport 대신 id로 바꿔서 받아오기
            url: `/api/get/ticket/${ticketType}/${localStorage.getItem("username")}/${localStorage.getItem("selectedTripId")}`, //여행 이름 넣어야됨 : 나중에 selectedTripId로 바꾸기
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            method: 'GET',
            success: function (data) {
                //debugger;
                toastr.success(`티켓 로딩이 완료되었습니다`);
                //데이터 추가.
                $.each(data, function (index, item) {
                    showTickets(item);
                });
            },
            error: function (e) {
                debugger;
                // window.location.href = '/';
            }
        });

    };

    getTransTickets();


    //티켓 추가
    $('.empty-plus-btn').click(function () {
        transTicketRegister();
    });


});
