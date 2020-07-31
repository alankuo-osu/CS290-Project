
// Simple picture carousel with fading animation

// Checking if currently on home page
if (window.location.pathname == "/CS290-Project/index.html") {
	var curSlide = 1;
	var interval_id = setInterval(function(){changeSlide(1,0);}, 3000);
}
// Setting current slide


// Starting automatic image switching and saving interval id


// Function for changing slide. Includes parameters for number of slides to change and whether change was done manually.
function changeSlide(delta, clicked) {
	let prevSlide = curSlide
	curSlide = curSlide + delta
	if (curSlide > 3) {
		curSlide = 1
	}

	else if (curSlide < 1) {
		curSlide = 3
	}

	// Hiding previous slide and re-setting opacity

	document.getElementById("slide"+prevSlide).style.opacity = "0%";
	document.getElementById("slide"+prevSlide).style.height = "0";
	document.getElementById("caption"+prevSlide).style.opacity = "0%";
	


	// Showing new slide
	document.getElementById("slide"+curSlide).style.opacity = "100%";
	document.getElementById("slide"+curSlide).style.height= "auto";
	document.getElementById("caption"+curSlide).style.opacity = "100%";


	// Resetting timer for automatic switching if change was done manually
	if (clicked == 1) {
		clearInterval(interval_id);
		interval_id = setInterval(function(){changeSlide(1,0);}, 3000);
	}

}

// Function for underlining currently active page in nav bar
function navUnderline() {
	// Need to change to pathname
	var currentUrl = window.location.href;
	var navLinks = document.getElementById('navbar').getElementsByTagName('a');
	for (let link of navLinks) {
		if (currentUrl == link.getAttribute('href')) {
			link.style.textDecoration = "underline"
		}
	}
}
var curTab = 'anatomy'
function changeTab1(newTab) {
	document.getElementById(curTab).style.backgroundColor = "#0099ff";
	document.getElementById(newTab).style.backgroundColor ="#33adff";
	document.getElementById(curTab +"Content").style.display="none"
	document.getElementById(newTab+"Content").style.display ="block";
	// document.getElementById(curTab+"Content").display ="none";
	curTab = newTab
}

var curTab2 = 'fillings'
function changeTab2(newTab2) {
	document.getElementById(curTab2).style.backgroundColor = "#0099ff";
	document.getElementById(newTab2).style.backgroundColor ="#33adff";
	document.getElementById(curTab2 +"Content").style.display="none"
	document.getElementById(newTab2+"Content").style.display ="block";
	// document.getElementById(curTab+"Content").display ="none";
	curTab2 = newTab2
}


// bing search api key: fb9c3aca1d37437b9eb1842d4ae68c6e

var apiKey = 'fb9c3aca1d37437b9eb1842d4ae68c6e'
var searchUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/localbusinesses/search?mkt=en-US&count=5&q='

// if (window.location.pathname == "/Users/alankuo/Dropbox/OSU%20CS/CS%20290/Project/finddentist.html") {
	// document.addEventListener('DOMContentLoaded', searchButton())
// }

function searchDentist() {
	let searchReq = new XMLHttpRequest();
		let dentistType = document.getElementById('dentistType').value;
		let city = document.getElementById('City').value;
		let state = document.getElementById('state').value;
		let requestUrl = searchUrl + dentistType + "+" + city+"+"+state

		if (!city) {
			alert("Please fill out both fields!");
			event.preventDefault();
			return false;
		}


		searchReq.open("GET", requestUrl, true);
		searchReq.setRequestHeader ("Ocp-Apim-Subscription-Key",apiKey);
		searchReq.addEventListener('load', function(){
			let searchResponse = JSON.parse(searchReq.responseText);
			let resultDiv = document.getElementById('results');
			if (searchResponse.hasOwnProperty('places')) {
				var resultList = document.createElement('dl')
				for (let business of searchResponse['places']['value']) {
					var busName = document.createElement('dt');
					busName.textContent = business['name'];
					var website = document.createElement('dd');
					var websiteUrl = document.createElement('a');
					websiteUrl.textContent = business['url'];
					websiteUrl.href = business['url'];
					websiteUrl.target = "_blank";
					website.appendChild(websiteUrl);
					var address1 = document.createElement('dd');
					address1.textContent = business['address']['streetAddress'];
					var address2 = document.createElement('dd');
					address2.textContent = business['address']['addressLocality'] + ", " + business['address']['addressRegion'] + " " + business['address']['postalCode'];
					var phone = document.createElement('dd');
					phone.textContent = business['telephone'];
					busName.appendChild(website);
					busName.appendChild(address1);
					busName.appendChild(address2);
					busName.appendChild(phone);

					resultList.appendChild(busName)
					while (resultDiv.firstChild && resultDiv.removeChild(resultDiv.firstChild));
					resultDiv.appendChild(resultList);
				}
			}
			else {
				resultDiv.textContent = "No results found.";
			}
		});

		searchReq.send(null)
		event.preventDefault();

}

function rotate(triangle, textContent) {
	var curTriangle = document.getElementById(triangle)
	var curText = document.getElementById(textContent)
	if (curTriangle.classList.contains('rotated')) {
		curTriangle.classList.remove('rotated')
		curText.style.height="0"
		curText.style.paddingTop="0px"
		curText.style.paddingBottom="0px"


	}
	else {
		curTriangle.classList.add('rotated')
		curText.style.height="auto"
		curText.style.paddingBottom="10px"
	}

}

navUnderline();
console.log(window.location.pathname)


