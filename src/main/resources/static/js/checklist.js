$(document).ready(function () {


    //체크리스트 겉모습 가져오기
    const showChecklistContainer = function (item) {
        //debugger;
        $(".checklist-contain").append(` <div class="checklist-body " checkDate="${item}">
                <h3 class="checklist-title" >${item}</h3>
                 <div class="success-rate ">준비할것 없음!</div>
                <div class="checklist-contents">
                    <div class="checklist-container">
                        <span class="category-name">준비물</span>
                        <ul class="checklist-ul"categoryId="1">

                        </ul>
                    </div>
                    <div class="checklist-container" >
                        <span class="category-name">목표</span>
                        <ul  class="checklist-ul" categoryId="2">
                        
                           
                        </ul>
                    </div>
                </div>
                
                <div class="plus-container">
                    <select name="category" class="checklist-combo">
                        <option value="1">준비물</option>
                        <option value="2">목표</option>
                    </select>
                    <input type="text"  class="checklist-text">
                    <button type="submit" class="checklist-plusbtn"><i class="fas fa-plus-circle"></i></button>
                </div>
            </div>`
        );

    }


    const getChecklistsContainer = function () {
        const ticketType=1;
        $.ajax({
            ///get/checklist/{username}/{tripId}
            url: `/api/get/ticketDate/${localStorage.getItem("username")}/${localStorage.getItem("selectedTripId")}`, //여행 이름 넣어야됨 : 나중에 selectedTripId로 바꾸기
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            method: 'GET',
            success: function (data) {
              //  debugger;
                //toastr.success(`체크리스트 내용 로딩이 완료되었습니다`);
                //데이터 추가.
                $.each(data, function (index, item) {
                    showChecklistContainer(item);
                });
                getChecklistContant();

            },
            error: function (e) {
                debugger;
                // window.location.href = '/';
            }
        });
    };

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


    }



//체크리스트 안의 내용. username, tripId로 전체 내용 가져옴. checklistDate랑 categoryId로 위치 선택후 append. ( 실제 내용을 보여주는 함수)
    const getChecklistContant = function(){
        $.ajax({
            ///get/checklist/{username}/{tripId}
            url: `/api/get/checklist/${localStorage.getItem("username")}/${localStorage.getItem("selectedTripId")}`, //여행 이름 넣어야됨 : 나중에 selectedTripId로 바꾸기
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            method: 'GET',
            success: function (data) {
               //debugger;
                $('.mini-list').remove();
                //toastr.success(`체크리스트 내용 로딩이 완료되었습니다`);
                //데이터 추가.
                $.each(data, function (index, item) {
                    appendDate(item);
                });
                $.each(data,function(index,item){
                    //debugger;
                    changeRate(item.checklistDate);

                });
                //changeRate('2021.05.05');
            },
            error: function (e) {
                debugger;
                // window.location.href = '/';
            }
        });
    }
    getChecklistsContainer();

//달성률 체크. 갯수가 추가되거나 삭제될때 전체 갯수 변경. 체크 버튼이 눌릴대마다 체크된 갯수 변경
    const changeRate= function(date){
        let totalCount=0;
        let checkedCount=0;
        totalCount = $(`.checklist-body[checkDate="${date}"] .mini-list`).length;
        checkedCount = $(`.checklist-body[checkDate="${date}"] .mini-list[ischecked='1']`).length;
        const successText = $(`.checklist-body[checkDate="${date}"] .success-rate`);

        if(totalCount!==0) {
            let successRate = ((checkedCount / totalCount) * 100).toFixed(0);
            successText.html(`${successRate}%`);
            let myBackgroundColor = "lightgray";
            if (successRate > 30) {
                myBackgroundColor = "darksalmon";
            }
            if (successRate >= 60) {
                myBackgroundColor = "#ffbc00"
            }
            if (successRate >= 80) {
                myBackgroundColor = "#c8de12"
            }
            if (successRate == 100) {
                myBackgroundColor = "darkseagreen"
            }
            successText.css('background-color', `${myBackgroundColor}`);
        }
        else{
            successText.html("준비할것 없음!");
            successText.css('background-color', `burlywood`);

        }

    }


    //
    // //특정 유저의 특정 여행의 특정 날짜 받아서 달성률 체크
    // const changeRate = function(checkDate){
    //     const checklistBody = $(`.checklist-body[checkDate="${checkDate}"]`);
    //     console.log(checklistBody);
    //
    //     $.ajax({
    //         url: `/api/get/successrate/${checkDate}/${localStorage.getItem("username")}/${localStorage.getItem("selectedTripId")}`,
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem("TickItToken")}`,
    //         },
    //         method: 'GET',
    //         success: function (data) {
    //             debugger;
    //             toastr.success(`달성률 로딩이 완료되었습니다`);
    //             //데이터 추가.
    //             // $.each(data, function (index, item) {
    //             //     showTickets(item);
    //             // });
    //         },
    //         error: function (e) {
    //             debugger;
    //             // window.location.href = '/';
    //         }
    //     });
    //
    // }

    //탭스트립의 체크리스트 안의 리스트들을 hover하면 휴지통 생김
    //동적으로 생성되지 않는것을 기준으로 잡아야해서 #tabstrip 하게 됨! (최대한 범위 축소)
    $("#tabstrip").on('mouseenter','.mini-list',function(){
        $(this).children('.list-del').removeClass('hidden');
    });

    $("#tabstrip").on('mouseleave','.mini-list',function(){
        $(this).children('.list-del').addClass('hidden');
    });


    //삭제 버튼 눌러서 db의 내용 삭제
    $("#tabstrip").on('click','.list-del',function (){
        const listId = $(this).parent('.mini-list').attr('listId');
        const checkDate = $(this).closest('.checklist-body').attr('checkDate');
        $.ajax({
            url: `api/delete/mini-list/${listId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            contentType: 'application/json',
            method: 'DELETE',
            success: function (data) {
                //debugger;
                toastr.success(`리스트 값이 제거되었습니다.`);
                changeRate(checkDate);

            },
            error: function (e) {
                toastr.warning(e.responseJSON.message);
                debugger;
            }
        });
        console.log(checkDate);
        $(this).parent('.mini-list').remove();


    });

    //체크 표시 on off
    $("#tabstrip").on('click','.list-done',function (){
        const listId = $(this).parent('.mini-list').attr('listId');
        const isChecked = $(this).parent('.mini-list').attr('isChecked');
        let  checkToChanage = '1';
        if(isChecked==0){
            checkToChanage = '1';
            $(this).addClass('make-checked');

        }
        else{
            checkToChanage = '0';
            $(this).removeClass('make-checked');

        }

        $.ajax({
            url: `api/edit/checkvalue/${listId}/${checkToChanage}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TickItToken")}`,
            },
            contentType: 'application/json',
            method: 'PATCH',
            success: function (data) {
                //debugger;
               // toastr.success(` ${listId}의 check 값이 변경되었습니다.`);
                $(`.mini-list[listId=${data.listId}]`).attr('isChecked',`${data.isChecked}`);
                changeRate(data.checklistDate);

            },
            error: function (e) {
                toastr.warning(e.responseJSON.message);
                debugger;
            }
        });


    });
});