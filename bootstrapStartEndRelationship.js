/*
 * Author: Dino Bojadjievski
 * Sets up a relationship between two text boxes, transforming them into related date picker widgets.
 * Written on: 	10.11.2015
 * Version: 	0.1a
 * @param 		{string} 		strStartID: the ID of the textbox to be transformed into a "starting date" date picker.
 * @param 		{string} 		strEndID: the ID of the textbox to be transformed into an "ending date" date picker.
 * @param 		{string} 		strDateFormat   
 * 
 */
function bootstrapStartEndRelationship(strStartID, strEndID, strDateFormat) {
	if (strDateFormat == undefined) {
		strDateFormat = "dd/mm//yy";
	}
	
	if (typeof jQuery !== 'undefined' && typeof jQuery.ui !== 'undefined') {
		var txtStartDate 	= jQuery("#" + strStartID);
		var txtEndDate 		= jQuery("#" + strEndID);
		
		if (txtStartDate.length && txtEndDate.length) { // Do these selectors actually exist?
			txtStartDate.datepicker({dateFormat: strDateFormat});
			txtStartDate.change(function(){
				var selectedStartDate = txtStartDate.datePicker("getDate");
				txtEndDate.datepicker("option", "setDate", selectedStartDate);
				txtEndDate.datepicker("option", "minDate", selectedStartDate);		
			}).change();
			
			txtEndDate.datepicker({dateFormat: strDateFormat});
			txtEndDate.change(function(){
				var selectedStartDate = txtStartDate.datepicker("getDate");
				var selectedEndDate = txtEndDate.datepicker("getDate");
				
				if (selectedStartDate > selectedEndDate) {
					txtStartDate.datepicker("option", "setDate", selectedEndDate);
				}
				txtStartDate.datepicker("option", "maxDate", selectedEndDate);				
			});
		}
			
	} 
	else {
		throw "jQuery or jQuery UI not loaded. Cannot proceed.";
	}
}
