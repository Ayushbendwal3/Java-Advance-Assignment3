$(function () {

	const radio = $("input[type=radio]");

	//divs
	const kindOfUserDiv = $("#kindOfUser");
	const loginDiv = $("#login");
	const registerDiv = $("#register");
	const forgotPasswordDiv = $("#forgotPasswordDiv");

	//link of forgot Pass
	const fpassSpan = $("#fpassSpan");

	//forms
	const fpForm = $("#fpForm");
	const loginForm = $("#loginForm");
	const registrationForm = $("#registrationForm");

	//Msg
	const fpValidationMsg = $("#fpValidationMsg");
	const loginValidationMsg = $("#loginValidationMsg");
	const RegistrationValidationMsg = $("#RegistrationValidationMsg");

	//input form controls
	const registerPass = $("#registerPass");
	const registerRePass = $("#registerRePass");
	const registerFullName = $("#registerFullName");
	const registerUserName = $("#registerUserName");
	const registerEmail = $("#registerEmail");


	radio.on("click", function () {
        let val = $(this).val();
        $(this).prop('checked', false);
        kindOfUserDiv.css("display", "none");
        if (val === "existing")
            loginDiv.css("display", "block");
        else
            registerDiv.css("display", "block");
    });

    fpassSpan.on("click", function () {
        loginDiv.css("display", "none");
        forgotPasswordDiv.css("display", "block");
    });

    fpForm.on("submit", function (e) {
        let a = $("#forgotPasswordUserName").val();
        let b = $("#forgotPasswordEmail").val();
        e.preventDefault();
        $.ajax({
            url: "forgotPass", method: "post", data: {Username: a, email: b}, success: function (data) {
                fpValidationMsg.html(data);
            }
        });
        fpValidationMsg.css("display", "block");
    });

    loginForm.on("submit", function (e) {
        let a = $("#loginUserName").val();
        let b = $("#loginPass").val();
        e.preventDefault();
        $.ajax({
            url: "Login", method: "post", data: {loginuserName: a, loginpass: b}, success: function (data) {
                loginValidationMsg.html(data);
                if (data === "Login successful")
                    window.location.replace("ImageUtility");
            }
        });
        loginValidationMsg.css("display", "block");
    });

    registrationForm.on("submit", function (event) {
        let a = registerFullName.val();
        let b = registerUserName.val();
        let c = registerEmail.val();
        let d = registerPass.val();
        let e = registerRePass.val();

        event.preventDefault();
        RegistrationValidationMsg.css("display", "block");
        if (d !== e) {
            RegistrationValidationMsg.html("Password don't match");
        } else {
            $.ajax({
                url: "RegisterUser",
                method: "post",
                data: {name: a, userName: b, email: c, pass: d},
                success: function (data) {
                    RegistrationValidationMsg.html(data);
                    console.log(data);
                    if (data === "Registered successfully")
                        window.location.replace("ImageUtility");
                }
            });
        }

    });

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function init() {
        let a = getCookie("username");
        if (a !== "")
            window.location.replace("Welcome");
    }

    init();
});