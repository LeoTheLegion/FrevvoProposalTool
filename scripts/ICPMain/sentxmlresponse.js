const $ = require('jquery');
const {app, ipcMain} = require('electron');


function getXMLResponseFromString(xmlstring){
	console.log( "Processing XML!" );
	
	var parse = require('xml-parser');
	var inspect = require('util').inspect;
	
	var xmlDoc = parse(xmlstring);
	
	try{
		console.log( xmlDoc.root.children[2].children)
	}
	catch(e){
		return null;
	}
	
	//console.log( xmlDoc);
	
	
	return xmlDoc;
	//return inspect(xmlDoc, { colors: true, depth: Infinity });
}

ipcMain.on('sendXML', function (event, xml) {
	console.log( "I got the xml!" );
	
	var response = getXMLResponseFromString(xml);
	
	console.log( "sending xml response!" );
	event.sender.send('getXMLResponse', response);
});