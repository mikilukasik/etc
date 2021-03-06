//http://www.leggetter.co.uk/2010/03/12/making-cross-domain-javascript-requests-using-xmlhttprequest-or-xdomainrequest.html  
var isIE8 = window.XDomainRequest ? true : false;
var invocation = createCrossDomainRequest();
var cb

function createCrossDomainRequest() {
	var request;
	if (isIE8) {
		request = new window.XDomainRequest();
	} else {
		request = new XMLHttpRequest();
	}
	return request;
}

function callOtherDomain(url, cb2) {
	cb = cb2
	if (invocation) {
		if (isIE8) {
			invocation.onload = outputResult;
			invocation.open("GET", url, true);
			invocation.send();
		} else {
			invocation.open('GET', url, true);
			invocation.onreadystatechange = handler;
			invocation.send();
		}
	} else {
		var text = "No Invocation TookPlace At All";
		var textNode = document.createTextNode(text);
		var textDiv = document.getElementById("textDiv");
		textDiv.appendChild(textNode);
	}
}

function handler(evtXHR) {
	if (invocation.readyState == 4) {
		if (invocation.status == 200) {
			outputResult();
		} else {
			alert("Invocation Errors Occured");
		}
	}
}

function outputResult() {
	var response = eval('(' + invocation.responseText + ')');
	cb(response);
}