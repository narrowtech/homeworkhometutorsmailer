const scroll = new SmoothScroll('nav a[href*="#"]', {
    speed: 800
});
const hamburger = document.querySelector('.hamburger');
const closeIcon = document.querySelector('.close-icon');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelector('.nav-links li');
const paras = document.querySelector('.single-course p');
const fileName = document.querySelector('.uploaded-file-name');

function processSelectedFile(fileInput) {
    var files = fileInput.files;
    
    fileName.textContent = files[0].name;
  }

document.querySelectorAll('.call-pop').forEach(element => {
    element.addEventListener('click', function() {
        document.getElementById('overlay').classList.add('is-visible');
        document.getElementById('modal').classList.add('is-visible');
    });
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modal').classList.remove('is-visible');
});
document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modal').classList.remove('is-visible');
});
document.getElementById('toast-close-btn').addEventListener('click', function() {
    document.getElementById('toast').classList.remove('is-visible');
});

window.addEventListener("load", function() {

	// store tabs variable
	var myTabs = document.querySelectorAll("ul.nav-tabs > li");

	function myTabClicks(tabClickEvent) {

		for (var i = 0; i < myTabs.length; i++) {
			myTabs[i].classList.remove("active");
		}

		var clickedTab = tabClickEvent.currentTarget; 

		clickedTab.classList.add("active");

		tabClickEvent.preventDefault();

		var myContentPanes = document.querySelectorAll(".tab-pane");

		for (i = 0; i < myContentPanes.length; i++) {
			myContentPanes[i].classList.remove("active");
		}

		var anchorReference = tabClickEvent.target;
		var activePaneId = anchorReference.getAttribute("href");
		var activePane = document.querySelector(activePaneId);

		activePane.classList.add("active");

	}

	for (i = 0; i < myTabs.length; i++) {
		myTabs[i].addEventListener("click", myTabClicks)
	}
});

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});
closeIcon.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});
//http://localhost:3000
const Url = 'https://homework-hometutors-mailer.herokuapp.com/student';
const Url2 = 'https://homework-hometutors-mailer.herokuapp.com/teacher';

function submitStudent(e) {
	e.preventDefault();
	let name = document.forms["studForm"]["name"]; 
	let email = document.forms["studForm"]["email"];
	let phone = document.forms["studForm"]["phone"];
	let classname = document.forms["studForm"]["class"];
	let district = document.forms["studForm"]["district"];
	let frm = document.getElementsByName('studForm')[0];
	let phoneno = /^\d{10}$/;
	var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (name.value == "") { 
		window.alert("Please enter your name."); 
		name.focus(); 
		return false; 
	} 

	if (email.value == "") { 
		window.alert( 
		  "Please enter e-mail address."); 
		email.focus(); 
		return false; 
	} 
	if (!email.value.match(mailformat)) { 
		window.alert( 
		  "Please enter a valid e-mail address."); 
		email.focus(); 
		return false; 
	} 

	if (phone.value == "") { 
		window.alert( 
		  "Please enter your telephone number."); 
		phone.focus(); 
		return false; 
	}

  	if(!phone.value.match(phoneno)) {
        window.alert( 
			"Please enter a valid number."); 
		phone.focus(); 
		return false; 
    }

	if (classname.selectedIndex < 1) { 
		alert("Please enter your class."); 
		classname.focus(); 
		return false; 
	} 
	if (district.selectedIndex < 1) { 
		alert("Please enter your district."); 
		district.focus(); 
		return false; 
	}

	document.getElementById('student-button').disabled = true;
	document.getElementById('loader').classList.remove('void');
	document.getElementById('texter').classList.add('void');

	const Data = {
		name: name.value,
		email: email.value,
		phone: phone.value,
		classname: classname.options[classname.selectedIndex].text,
		district: district.options[district.selectedIndex].text,
	}
	const Params = {
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify(Data),
		method: "POST"
	}

	console.log(Data);

	fetch(Url, Params)
		//.then(data => { return data.json() })
		.then((res) => {
				document.getElementById('student-button').disabled = false;
				document.getElementById('toast').classList.add('is-visible');
				document.getElementById('overlay').classList.remove('is-visible');
				document.getElementById('modal').classList.remove('is-visible');
				document.getElementById('loader').classList.add('void');
				document.getElementById('texter').classList.remove('void');
				frm.reset();
			 })
		.then((error) => { 
			document.getElementById('student-button').disabled = false;
			document.getElementById('loader').classList.add('void');
			document.getElementById('texter').classList.remove('void');
			console.log(error) 
		})
}

function submitTeacher(e) {
	e.preventDefault();
	let name = document.forms["techForm"]["name"]; 
	let email = document.forms["techForm"]["email"]; 
	let phone = document.forms["techForm"]["phone"]; 
	let qualification = document.forms["techForm"]["qualification"]; 
	let address = document.forms["techForm"]["address"];
	var frm = document.getElementsByName('techForm')[0];
	let phoneno = /^\d{10}$/;
	var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (name.value == "") { 
		window.alert("Please enter your name."); 
		name.focus(); 
		return false; 
	} 

	if (email.value == "") { 
		window.alert( 
		  "Please enter a valid e-mail address."); 
		email.focus(); 
		return false; 
	} 
	if (!email.value.match(mailformat)) { 
		window.alert( 
		  "Please enter a valid e-mail address."); 
		email.focus(); 
		return false; 
	} 

	if (phone.value == "") { 
		window.alert( 
		  "Please enter your telephone number."); 
		phone.focus(); 
		return false; 
	}
	if(!phone.value.match(phoneno)) {
        window.alert( 
			"Please enter a valid number."); 
		phone.focus(); 
		return false; 
    }

	if (qualification.value == "") { 
		alert("Please enter your qualification."); 
		qualification.focus(); 
		return false; 
	} 
	if (address.value == "") { 
		alert("Please enter your address."); 
		address.focus(); 
		return false; 
	}
	let file = document.getElementById("file-upload").files[0];

	document.getElementById('teacher-button').disabled = true;
	document.getElementById('loader2').classList.remove('void');
	document.getElementById('texter2').classList.add('void');

	// const Data = {
	// 	name: name.value,
	// 	email: email.value,
	// 	phone: phone.value,
	// 	qualification: qualification.value,
	// 	address: address.value,
	// }

	let formData = new FormData();

	formData.append("file", file);
	formData.append("name", name.value);
	formData.append("email", email.value);
	formData.append("phone", phone.value);
	formData.append("qualification", qualification.value);
	formData.append("address", address.value);

	const Params = {
		// headers: {
		// 	"Content-Type": "multipart/form-data",
		// },
		//mode: "no-cors",
		body: formData,
		method: "POST"
	}

	fetch(Url2, Params)
		//.then(data => { return data.json() })
		.then((res) => {
				console.log(res)
				document.getElementById('teacher-button').disabled = false;
				document.getElementById('toast').classList.add('is-visible');
				document.getElementById('overlay').classList.remove('is-visible');
				document.getElementById('modal').classList.remove('is-visible');
				document.getElementById('loader2').classList.add('void');
				document.getElementById('texter2').classList.remove('void');
				frm.reset();
			 })
		.then((error) => { 
			document.getElementById('teacher-button').disabled = false;
			document.getElementById('loader2').classList.add('void');
			document.getElementById('texter2').classList.remove('void');
			console.log(error) 
		})
}
