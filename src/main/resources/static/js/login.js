$(document).ready(function () {

    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-center"
    }

    const clearLoginForm = function () {
        $('#id').val('');
        $('#password').val('');
        $('#nickname').val('');
        $('#loginH2').click();
    };

    $('.loginHoverGroup').click(function () {
        $(this).addClass('active');
        $(this).removeClass('inactive underlineHover');

        $('.loginHoverGroup').not(this).removeClass('active');
        $('.loginHoverGroup').not(this).addClass('inactive underlineHover');
    });
    //initialize event
    $('#loginH2').click(function () {
        $('#nickname').hide();
        $('#btnLogin').val('Log In')
    });
    $('#signupH2').click(function () {
        $('#nickname').show();
        $('#btnLogin').val('Sign Up')
    });

    $('#btnLogin').click(function () {
        let id = $('#id').val()
        let password = $('#password').val()
        let nickname = $('#nickname').val()

        if (!id || !password) {
            toastr.warning('ID와 PASSWORD를 입력해주세요');
            return;
        }

        //login
        if ($(this).val() === "Log In") {
            let messageDTO = {
                "username": id,
                "password": password
            };
            $.ajax({
                url: "/api/authenticate",
                contentType: 'application/json',
                data: JSON.stringify(messageDTO),
                type: "POST",
                success: function (data) {
                    if (data.token) {
                        localStorage.clear();
                        localStorage.setItem("TickItToken", data.token);
                        window.location.href = '/main';
                    }
                },
                error: function (e) {
                    toastr.warning('ID와 PASSWORD를 확인해주세요');
                }
            });
        } else {
            //sign up
            if (!nickname) {
                toastr.warning('NICKNAME을 확인해주세요');
                return;
            }
            let messageDTO = {
                "username": id,
                "password": password,
                "nickname": nickname
            };
            $.ajax({
                url: "/api/signup",
                contentType: 'application/json',
                data: JSON.stringify(messageDTO),
                type: "POST",
                success: function (data) {
                    toastr.success(`회원가입에 성공하였습니다`);
                    clearLoginForm();
                },
                error: function (e) {
                    toastr.warning(`회원가입에 실패하였습니다<br>${e.responseJSON.message}`);
                }
            });
        }
    });
});
//
// const axios = require('axios');
//
// let url = '/api/authenticate';
// let options = {
//     method: 'POST',
//     url: url,
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json;charset=UTF-8'
//     },
//     data: {
//         username: "admin",
//         password: "admin"
//     }
// };
// let response = await axios(options);
// debugger;
// let responseOK = response && response.status === 200 && response.statusText === 'OK';
// debugger;
// if (responseOK) {
//     let data = await response.data;
//     debugger;
//     // do something with data
// }

// const countBreeds = async () => {
//     const breeds = await getBreeds();
//
//     if (breeds.data.message) {
//         console.log(`현재 강아지의 수는 ${Object.entries(breeds.data.message).length}입니다.`);
//     }
// };

// getBreeds();