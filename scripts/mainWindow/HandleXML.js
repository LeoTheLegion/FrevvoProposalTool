const $ = require('jquery');

const {ipcRenderer} = require('electron');

function sendXMLtoICPMain(xml){
	console.log("Sending XML to Process : " + xml);
	ipcRenderer.send('sendXML', xml);
}

function ProcessXMLresponse(xmlResponse){
	if(xmlResponse == null){
		alert("Bad XML");
		return;
	}
		
	var RequestorInformation = xmlResponse.root.children[2];
	
	var information = RequestorInformation.name + "\n";
	
	for (let i = 0; i < RequestorInformation.children.length; i++) {
		var child = RequestorInformation.children[i];
		information += child.name + " : " + child.content + "\n";
	};
	
	var inspect = require('util').inspect;
	
	console.log( "I got the XML Response: \n"+ inspect(RequestorInformation, { colors: true, depth: Infinity }) );
	$("#result").val(information);
}

document.getElementById('main').onsubmit = e => {
	e.preventDefault();
	var xml = $("#InputXML").val();
	sendXMLtoICPMain(xml);
};

ipcRenderer.on('getXMLResponse', function (event, response) {
	ProcessXMLresponse(response);
});