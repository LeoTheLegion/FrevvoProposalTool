const jsPDF = require('jspdf');
require('jspdf-autotable');

module.exports.BuildPDFTable = function (RequestorInformation_arr,
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

