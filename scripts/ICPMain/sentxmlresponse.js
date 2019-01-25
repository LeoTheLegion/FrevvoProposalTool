const $ = require('jquery');
const {app, ipcMain} = require('electron');

function getXMLResponseFromString(xmlstring){
	console.log( "Processing XML!" );
	
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xmlstring,"text/xml");
	
	
	return xmlstring;
}

ipcMain.on('sendXML', function (event, xml) {
	console.log( "I got the xml!" );
	
	var response = getXMLResponseFromString(xml);
	
	console.log( "sending xml response!" );
	event.sender.send('getXMLResponse', response);
});