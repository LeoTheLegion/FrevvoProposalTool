const $ = require('jquery');
const {ipcRenderer} = require('electron');


function sendXMLtoICPMain(xml){
	console.log("Sending XML to Process : " + xml);
	ipcRenderer.send('sendXML', xml);
}

function getChildrenFromSource(source_arr){
	var arr = [];	
	
	var source = source_arr;
		
	for (let i = 0; i < source.children.length; i++) {
		var child = source.children[i];
		
		arr.push([child.name,child.content]);
	};
	
	return arr;
}

function getValuebyKey(arr,key){
	for (let i = 0; i < arr.length; i++) {
		if(arr[i][0] == key){
			return arr[i][1];
		}
	};
	return null;
}

function FindSource(xmlResponse,name){
	var children = xmlResponse.root.children;
	
	for (let i = 0; i < children.length; i++) {
		if(children[i].name == name){
			return children[i];
		}
	};
	
	return null;
}

function ProcessXMLresponse(xmlResponse){
	if(xmlResponse == null){
		alert("Bad XML. Use Clear and repaste XML");
		return;
	}

	var information = "";
	
	var RequestorInformation_arr = getChildrenFromSource(FindSource(xmlResponse,"RequestorInformation"));
	var	ChairInformation_arr = getChildrenFromSource(FindSource(xmlResponse,"ChairInformation"));
	var	DeanInformation_arr	= getChildrenFromSource(FindSource(xmlResponse,"DeanInformation"));
	var	CourseInformation_arr = getChildrenFromSource(FindSource(xmlResponse,"CourseInformation"));
	
	var lastname = getValuebyKey(RequestorInformation_arr,"vlastname");
	var courseid = getValuebyKey(CourseInformation_arr,"courseid");
	
	var inspect = require('util').inspect;
	
	console.log( "I got the XML Response: \n"+ inspect(xmlResponse, { colors: true, depth: Infinity }) );
	//$("#result").val(information);
	
	var handlePDF = require("./HandlePDF");
	
	handlePDF.BuildPDFTable(RequestorInformation_arr,
		ChairInformation_arr,
		DeanInformation_arr,
		CourseInformation_arr, courseid, lastname);
}

document.getElementById('main').onsubmit = e => {
	e.preventDefault();
	var xml = $("#InputXML").val();
	sendXMLtoICPMain(xml);
};

document.getElementById('clear').onclick = e => {
	e.preventDefault();
	$("#InputXML").val("");
};

ipcRenderer.on('getXMLResponse', function (event, response) {
	ProcessXMLresponse(response);
});