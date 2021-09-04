$(document).ready(function () {
    //티켓 헤더의 버튼 활성화
    $(document).on('click', '.ticket-body', function () {
        console.log('click');
        $(this).find('.ticket-header').addClass('ticket-clicked');
        $(this).find('.header-menu').removeClass('hidden');

        $('.ticket-body').not(this).find('.ticket-header').removeClass('ticket-clicked');
        $('.ticket-body').not(this).find('.header-menu').addClass('hidden');
    });

    // vehicle_template
    //티켓 삭제 (버튼 클릭)
    $(document).on('click', '.ticket-del', function () {
        let ticketId = $(this).closest(".ticket-body").attr('tickId');

        console.log(ticketId);
        //db에서 삭제
        $.ajax({
            url: 'api/delete/ticket/' + `${ticketId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            contentType: 'application/json',
            method: 'DELETE',
            success: function (data) {
                //겉보기 구현 : 삭제모습
                toastr.success(` ${ticketId}의 티켓이 제거 되었습니다`);
                // debugger;
            },
            error: function (e) {
                toastr.warning(e.responseJSON.message);
                debugger;
            }
        });
        $(this).closest(".ticket-body").remove();

    });

    //티켓 수정
    $(document).on('click', '.header-menu .ticket-modify', function () {
        const ticketId = $(this).closest(".ticket-body").attr('tickId');

        const preFixSelector = `.ticket-body[tickId=${ticketId}]`
        const ticketDate = $(`${preFixSelector} .ticketDate`).val();
        const ticketNickname=$(`${preFixSelector} .ticketNickname`).val();
        const departCountry=$(`${preFixSelector} .departCountry`).val();
        const departPlace=$(`${preFixSelector} .departPlace`).val();
        const departDate=$(`${preFixSelector} .departDate`).val();
        const departTime=$(`${preFixSelector} .departTime`).val();
        const arriveCountry=$(`${preFixSelector} .arriveCountry`).val();
        const arrivePlace=$(`${preFixSelector} .arrivePlace`).val();
        const arriveDate=$(`${preFixSelector} .arriveDate`).val();
        const arriveTime=$(`${preFixSelector} .arriveTime`).val();
        const memoContent=$(`${preFixSelector} .memoContent`).val();
        const menu= $(`${preFixSelector} .menu`).val();

        const ticketPrice=$(`${preFixSelector} .ticketPrice`).val();



        const newTicketDTO = {
            "ticketDate": `${ticketDate}`,
            "ticketNickname":`${ticketNickname}`,
            "departCountry":`${departCountry}`,
            "departPlace": `${departPlace}`,
            "departDate":`${departDate}`,
            "departTime":`${departTime}`,
            "arriveCountry":`${arriveCountry}`,
            "arrivePlace": `${arrivePlace}`,
            "arriveDate":`${arriveDate}`,
            "arriveTime":`${arriveTime}`,
            "ticketPrice": `${ticketPrice}`,
            "username": `${localStorage.getItem("username")}`,
            "tripId": `${localStorage.getItem('selectedTripId')}`,
            "transportId": "1",
            "memo":`${memoContent}`,
            "menu":`${menu}`
        }

        //console.log(newTicketDTO);


        $.ajax({
            url: 'api/edit/ticket/' + `${ticketId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            contentType: 'application/json',
            data: JSON.stringify(newTicketDTO),
            method: 'PATCH',
            success: function (data) {
                //겉보기 구현 : 삭제모습
                toastr.success(` ${ticketId}의 티켓구조가 변경 되었습니다.`);
                // debugger;
            },
            error: function (e) {
                toastr.warning(e.responseJSON.message);
                debugger;
            }
        });

    });


//checklist 관련

    //list 1개의 데이터를 받아서 알맞은 위치에 append
    const appendDate = function (data){

        let checkingClass = "list-done ";
        if(data.isChecked==="1"){
            checkingClass += "make-checked";
        }
        const appendPosition = `.checklist-body[checkDate="${data.checklistDate}"] ul[categoryId="${data.categoryId}"] `;
        $(appendPosition).append('' +
            `<li class="mini-list" listId=${data.listId} isChecked=${data.isChecked}>`+
            `<button class="' + ${checkingClass} + '"><i class="fas fa-check-circle"></i></button> `+
            data.content +'  ' +
            `<button  class="list-del hidden"  >` +
            '<i class="fas fa-trash-alt"></i></button> ' +
            '</li>');
        debugger;


    }

    //달성률 체크. 갯수가 추가되거나 삭제될때 전체 갯수 변경. 체크 버튼이 눌릴대마다 체크된 갯수 변경
    const changeRate= function(date){
        let totalCount=0;
        let checkedCount=0;
        totalCount = $(`.checklist-body[checkDate="${date}"] .mini-list`).length;
        checkedCount = $(`.checklist-body[checkDate="${date}"] .mini-list[ischecked='1']`).length;
        let successRate = ((checkedCount/totalCount)*100).toFixed(0);

        const successText=$(`.checklist-body[checkDate="${date}"] .success-rate`);
        successText.html(`${successRate}%`);
        let myBackgroundColor="lightgray";
        if(successRate>0){
            myBackgroundColor = "darksalmon";
        }
        if(successRate>=60){
            myBackgroundColor = "#ffbc00"
        }
        if(successRate>=80){
            myBackgroundColor = "#c8de12"
        }
        if(successRate==100){
            myBackgroundColor = "darkseagreen"
        }
        successText.css('background-color',`${myBackgroundColor}`);

    }


    //내용을 입력하고 +버튼을 누르면 db에 정보 저장
    $(document).on('click','.checklist-plusbtn',function (){
       //console.log(this);

        const checklistDate = $(this).closest(".checklist-body").attr('checkDate'); 
        const preFixSelector = `.checklist-body[checkDate="${checklistDate}"]`;
        const checklistText = `${preFixSelector} .checklist-text`;
        const content = $(checklistText).val();
        if(content !== ""){
        $(checklistText).val('');

        const categoryId= $(`${preFixSelector} .checklist-combo`).val(); //준비물: 1 목표 : 2 가 value로 들어감

        const newChecklistDTO={
           "username":`${localStorage.getItem('username')}`,
           "tripId":`${localStorage.getItem('selectedTripId')}`,
           "checklistDate":`${checklistDate}`,
           "categoryId":`${categoryId}`,
           "content":`${content}`,
           "isChecked":`0`
        }
        $.ajax({
            url: `api/add/checklist/`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            contentType: 'application/json',
            data: JSON.stringify(newChecklistDTO),
            method: 'POST',
            success: function (data) {
                appendDate(data);
                toastr.success(`데이터가  ${newChecklistDTO.checklistDate}의 체크리스트에 추가되었습니다`);
                changeRate(data.checklistDate);
            },
            error: function (e) {
                toastr.warning(e.responseJSON.message);
                debugger;
            }
        });

        }



    });

    

});