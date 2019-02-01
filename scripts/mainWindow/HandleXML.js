const $ = require('jquery');
const {ipcRenderer} = require('electron');
const jsPDF = require('jspdf');
require('jspdf-autotable');

function sendXMLtoICPMain(xml){
	console.log("Sending XML to Process : " + xml);
	ipcRenderer.send('sendXML', xml);
}

function ProcessXMLresponse(xmlResponse){
	if(xmlResponse == null){
		alert("Bad XML");
		return;
	}

	var information = "";
	var lastname,courseid = "";
	var RequestorInformation_arr	= [];
	var	ChairInformation_arr	= [];
	var	DeanInformation_arr	= [];
	var	CourseInformation_arr	= [];
	
	//todo : Function this
	var RequestorInformation = xmlResponse.root.children[2];
	information += RequestorInformation.name + "\n";
	
	for (let i = 0; i < RequestorInformation.children.length; i++) {
		var child = RequestorInformation.children[i];
		
		if(child.name == "vlastname")
			lastname = child.content;
		
		information += child.name + " : " + child.content + "\n";
		RequestorInformation_arr.push([child.name,child.content]);
	};
	
	//todo : Function this
	var ChairInformation = xmlResponse.root.children[3];
	information += "\n" + ChairInformation.name + "\n";
	
	for (let i = 0; i < ChairInformation.children.length; i++) {
		var child = ChairInformation.children[i];
		
		if(child.name == "vlastname")
			lastname = child.content;
		
		information += child.name + " : " + child.content + "\n";
		ChairInformation_arr.push([child.name,child.content]);
	};
	
	//todo : Function this
	var DeanInformation = xmlResponse.root.children[4];
	information += "\n" +DeanInformation.name + "\n";
	
	for (let i = 0; i < DeanInformation.children.length; i++) {
		var child = DeanInformation.children[i];
		
		if(child.name == "vlastname")
			lastname = child.content;
		
		information += child.name + " : " + child.content + "\n";
		DeanInformation_arr.push([child.name,child.content]);
	};
	
	//todo : Function this
	var CourseInformation = xmlResponse.root.children[5];
	information += "\n" +CourseInformation.name + "\n";
	
	for (let i = 0; i < CourseInformation.children.length; i++) {
		var child = CourseInformation.children[i];
		
		if(child.name == "courseid")
			courseid = child.content;
		
		information += child.name + " : " + child.content + "\n";
		CourseInformation_arr.push([child.name,child.content]);
	};
	
	var inspect = require('util').inspect;
	
	console.log( "I got the XML Response: \n"+ inspect(xmlResponse, { colors: true, depth: Infinity }) );
	$("#result").val(information);
	
	BuildPDFTable(RequestorInformation_arr,
		ChairInformation_arr,
		DeanInformation_arr,
		CourseInformation_arr, courseid, lastname);
}


function BuildPDFTable(RequestorInformation_arr,
		ChairInformation_arr,
		DeanInformation_arr,
		CourseInformation_arr, courseid , lastname){
			
	var PDF = new jsPDF('p', 'pt');
	
	PDF.autoTable(["RequestorInformation", ""], RequestorInformation_arr,{
			margin: {top: 20}
		});
	PDF.autoTable(["ChairInformation", ""], ChairInformation_arr,{
			margin: {top: 220}
		});
	PDF.autoTable(["DeanInformation", ""], DeanInformation_arr,{
			margin: {top: 320}
		});
	PDF.autoTable(["CourseInformation", ""], CourseInformation_arr,{
			margin: {top: 470}
		});
		
	PDF.save(courseid+ '_' + lastname + '_proposal.pdf');
}

function BuildPDF(information, courseid , lastname){
	var PDF = new jsPDF('p', 'pt');
	PDF.text(information, 50, 50);
	PDF.save(courseid+ '_' + lastname + '_proposal.pdf');
}

document.getElementById('main').onsubmit = e => {
	e.preventDefault();
	var xml = $("#InputXML").val();
	sendXMLtoICPMain(xml);
};

ipcRenderer.on('getXMLResponse', function (event, response) {
	ProcessXMLresponse(response);
});