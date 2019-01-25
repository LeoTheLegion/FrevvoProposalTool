const $ = require('jquery');

const {ipcRenderer} = require('electron');

function sendXMLtoICPMain(xml){
	console.log("Sending XML to Process : " + xml);
	ipcRenderer.send('sendXML', xml);
}

function ProcessXMLresponse(xmlResponse){
	console.log( "I got the XML Response: \n"+ xmlResponse );
	$("#result").val(xmlResponse);
}

document.getElementById('main').onsubmit = e => {
	e.preventDefault();
	var xml = $("#InputXML").val();
	sendXMLtoICPMain(xml);
};

ipcRenderer.on('getXMLResponse', function (event, response) {
	ProcessXMLresponse(response);
});