var newUser = {};

newUser.validateName = function (name) {
	var namePattern = /^[A-Za-z]{2,20}$/;
	var valid = namePattern.test(name);	
	return valid;	
}

newUser.validateEmail = function (email) {
	var ePattern = /^[A-Za-z]+[@]{1}[a-z]+[.]{1}[a-z]{3}$/;
	var valid = ePattern.test(email);
	return valid;
}

newUser.validatePassword = function (passwrd) {
	var pPattern = /^[A-Za-z0-9]{8,40}$/;
	var valid = pPattern.test(passwrd);
	return valid;
}

newUser.validateUsername = function (userName) {
	var uPattern = /^[A-Za-z0-9_]{4,30}$/;
	var valid = uPattern.test(userName);
	return valid;
}

newUser.validateDay = function (day) {
	//alert(signinForm.month.value+" "+signinForm.day.value+", "+signinForm.year.value);
	if(signinForm.month.value == "Feb") {
		if((day < 0) || (day > 29))
			return false;
		else
			return true;
	}
	else if((signinForm.month.value == "Apr") ||
			(signinForm.month.value == "Jun") ||
			(signinForm.month.value == "Sep") ||
			(signinForm.month.value == "Nov")) {
		if((day < 0) || (day > 30))
			return false;
		else
			return true;
	}
	else {
		if((day < 0) || (day > 31))
			return false;
		else
			return true;
	}
}

newUser.validateYear = function (year) {
	if((year < 0) || (year > 2014))
		return false;
	else
		return true;
}

newUser.validateDOB = function () {
	var valid = newUser.validateDay(signinForm.day.value);
	if(valid) {
		valid = newUser.validateYear(signinForm.year.value);
		return valid;
	}
	else
		return valid;
}

newUser.validateData = function () {
	if(!newUser.validateName(signinForm.firstName.value)) {
		alert("Error: First name must be 2-20 characters long containing only letters!");
		document.signinForm.firstName.focus();
		return false;
	}
	else if(!newUser.validateName(signinForm.lastName.value)) {
		alert("Error: Last name must be 2-20 characters long containing only letters!");
		document.signinForm.lastName.focus();
		return false;
	}
	else if(!newUser.validateEmail(signinForm.emailAddr.value)) {
		alert("Error: Email address is not valid! Provide a valid email address!");
		document.signinForm.emailAddr.focus();
		return false;
	}
	else if(signinForm.emailAddr.value != signinForm.confirmEmail.value) {
		alert("Error: Email confirmation failed! Make sure to type your email correctly twice! NOTE: this confirmation is case-sensitive!");
		document.signinForm.confirmEmail.focus();
		return false;
	}
	else if(!newUser.validatePassword(signinForm.passwrd.value)) {
		alert("Error: Password needs to be 8-40 characters long containing only letters and/or numbers!");
		document.signinForm.passwrd.focus();
		return false;
	}
	else if(signinForm.passwrd.value != signinForm.confirmPassword.value) {
		alert("Error: Password confirmation failed! Make sure to type your password correctly twice!");
		document.signinForm.confirmPassword.focus();
		return false;
	}
	else if(!newUser.validateUsername(signinForm.username.value)) {
		alert("Error: Username must be 4-30 characters long containing only letters and/or numbers!");
		document.signinForm.username.focus();
		return false;
	}
	else if(!newUser.validateDOB()) {
		alert("Error: Date of Birth is invalid! Provide a valid date of birth!");
		return false;
	}
	alert("All user information is valid! =)");
	return true;
}

window.addEventListener("load", function () {
	document.getElementById('regButton').addEventListener("click", newUser.validateData, true);
	}, true);

