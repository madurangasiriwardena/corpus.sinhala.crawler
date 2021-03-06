/*
Author :
 - Darshana Gunawardana
 - Department of Computer Science & Engineering
 - University of Moratuwa
 - Sri Lanka

Funtcions of the file:
 - Manipulating the attributes of the input object
 - Processing the text needed to be converted to Sinhala
*/


// This is a class of the objects which needed to be transliterated
// All the data needed to manupulate a object include here
function singlishconverter(obj) {
	this.object = obj;              // object address
	this.objectName = obj.name;     // name of the object
	this.objectId = obj.id;         // id of the object

	this.isActive = false;          // setting the default transliteration status false.

	this.prevText = '';		//stors text already edited(Text which exist before singlish on, Uni/EN)
	this.aftrText = '';		//stors text already edited(Text which exist before singlish on, Uni/EN)
	this.editingText = '';		//currently editing text(Text which created after singlish on, EN)
	this.editedText = '';       //stors text already edited text updated on each conversion

	this.lastTextLength = 0;		//length of the text(Uni) after the last singlish conversion
	this.currntTextLength = 0;		//length of the current text(EN) up to now
	this.bToETextLength = 0;		//true length of current text(EN/Uni)
////////showDetails(this, 'singlishconverter.constructor()', 'Object created.... @handler.js');

}

function keyDown(converter) {				// @ down event - to detect non writtenable keys

	var keyInt = event.keyCode;			// returns the code of ANY key
////////showDetails(converter, 'keyDown()', 'Key Code is :  ' +keyInt+ ' @handler.js');

	if (keyInt == 145) {
		//////////////////////////////////////ChangeStatus////////////////////////////////////
		if(!converter.isActive) {
			converter.prevText = converter.object.value.substr(0,GetCursorPos(converter.object));
			converter.aftrText = converter.object.value.substr(GetCursorPos(converter.object),converter.object.value.length);

			converter.editingText= '';
			converter.editedText= '';
        	converter.lastTextLength = GetCursorPos(converter.object);
        	converter.currntTextLength = GetCursorPos(converter.object);
			converter.bToETextLength = GetCursorPos(converter.object);
			converter.isActive = true;
//			//converter.object.value = 'act';
		}
		else {
			converter.isActive = false;
		///////////////////////////////////END : ChangeStatus/////////////////////////////////
        }
	
	}
	else if (keyInt == 8) {
		///////////////////////////////////Perform Backspace//////////////////////////////////
		if (converter.isActive) {
			if (converter.editingText == ''){
				return true;
			}
			else if (converter.bToETextLength == GetCursorPos(converter.object)){
				converter.editingText = converter.editingText.substr(0,converter.editingText.length-1);
				startTextProcess(converter);
			}
			else {
				converter.prevText = converter.prevText.substr(0,GetCursorPos(converter.object)-1);
				converter.aftrText = converter.prevText.substr(GetCursorPos(converter.object),GetCursorPos(converter.object)-1);
				converter.editingText= '';
        	    converter.lastTextLength = GetCursorPos(converter.object);
        	    converter.currntTextLength = GetCursorPos(converter.object);
        	    converter.bToETextLength = GetCursorPos(converter.object);
////////////////////////////////showDetails(converter, 'keyDown()', 'Trigged BackSpece... @handler.js\nCurrent key pos : ' +GetCursorPos(converter.object));
			}
			return false;
		}
		/////////////////////////////////END : Perform Backspace//////////////////////////////
		
		return true;
	}
	else if (keyInt == 46) {
		///////////////////////////////////Perform Del//////////////////////////////////
		if (converter.isActive) {
			if (converter.editingText == ''){
				return true;
			}
			else if (converter.bToETextLength == GetCursorPos(converter.object)){
				converter.aftrText = converter.aftrText.substr(1,converter.aftrText.length);
				startTextProcess(converter);
			}
			else {
				converter.prevText = converter.prevText.substr(0,GetCursorPos(converter.object)-1);
				converter.aftrText = converter.prevText.substr(GetCursorPos(converter.object),GetCursorPos(converter.object)-1);
				converter.editingText= '';
        	    converter.lastTextLength = GetCursorPos(converter.object);
        	    converter.currntTextLength = GetCursorPos(converter.object);
        	    converter.bToETextLength = GetCursorPos(converter.object);
////////////////////////////////showDetails(converter, 'keyDown()', 'Trigged Delete... @handler.js\nCurrent key pos : ' +GetCursorPos(converter.object));
			}
			return false;
		}
		/////////////////////////////////END : PerformDel//////////////////////////////
    }

	return true;
}

function keyPess(converter) {			// @ press event - to detect exact wittenable letters

	var keyInt = event.keyCode;		// returns the code of wittenable keys
////////showDetails(converter, 'keyPess()', 'Key Code is :  '+keyInt+' @handler.js');

	if(!(keyInt > 31 && keyInt < 127) && keyInt != 13){
		showDetails(converter, 'keyPess()', 'An Unexpected Key Code...\nKey Code is :  ' +keyInt+ '\nKey is :  ' + String.fromCharCode(keyInt)+ '\n@handler.js');
		return true;
	}
	else {
		///////////////////StartPreTextfunc-converting to sinhala unicode///////////////////
		if (converter.isActive) {

			if(converter.bToETextLength == GetCursorPos(converter.object)){
				converter.editingText += String.fromCharCode(keyInt);
				converter.currntTextLength = converter.prevText.length + converter.editingText.length + converter.aftrText.length;
////////////////////////////////showDetails(converter, 'keyPess()', 'StartPreText @handler.js');			
				startTextProcess(converter);
	//crsr			showDetails(converter, 'keyPess()', 'lastpos=curpos @handler.js');	
				return false;
			}
			else {
	//crsr			alert(GetCursorPos(converter.object));
				converter.bToETextLength = GetCursorPos(converter.object);
				converter.prevText = converter.object.value.substr(0,GetCursorPos(converter.object));
				converter.aftrText = converter.object.value.substr(GetCursorPos(converter.object),converter.object.value.length);

				converter.editingText= "";
				converter.editedText= "";
	        	        converter.lastTextLength = GetCursorPos(converter.object);
	        	        converter.currntTextLength = GetCursorPos(converter.object);

				converter.editingText += String.fromCharCode(keyInt);
				converter.currntTextLength = converter.prevText.length + converter.editingText.length + converter.aftrText.length;
////////////////////////////////showDetails(converter, 'keyPess()', 'StartPreText @handler.js');			
				startTextProcess(converter);
	//crsr			showDetails(converter, 'keyPess()', 'lastpos!=curpos @handler.js');
				return false;

			}
		}
		/////////////////END :StartPreTextfunc-converting to sinhala unicode////////////////
	}
	return true;
}


// This function used to debug these scripts. Will not run under working  circumstances.
function showDetails(object, fnction, detail) {
	if(object != ''){
		var ret = 'Function : '+fnction+ ' - '+detail+ '\nFor the object : ' +object.objectName + '\n\n';
		   for (var prop in object)
		      ret += "->    " + prop + " is " + object[prop] + "\n";
	}
	else
		var ret = 'Function : '+fnction+ ' - '+detail;

	alert(ret);
	return true;
}



// This function is used to get cursor position in a given object

///////////Tested For Chorme 8.0, IE 8.0, Firefox 3.6//////////////////////////////////////////
function GetCursorPos(obj) {

	//For Gecko based browsers
	if (obj.selectionStart) { 
		return obj.selectionStart; 
	}

	//For IE
	else if (document.selection) { 
		obj.focus(); 

		var r = document.selection.createRange(); 
		if (r == null) { 
			return 0; 
		} 

		var re = obj.createTextRange(), 
		rc = re.duplicate(); 
		re.moveToBookmark(r.getBookmark()); 
		rc.setEndPoint('EndToStart', re); 

		return rc.text.length; 
	}  
	return 0; 
}


// This function is used to set cursor position in a given object

///////////Tested For Chorme 8.0, IE 8.0, Firefox 3.6//////////////////////////////////////////
function SetCursorPos(obj, pos) {

	//FOR IE
	if(obj.setSelectionRange) {
		obj.focus();
		obj.setSelectionRange(pos,pos);
	}

	// For Gecko based browsers
	else if (obj.createTextRange) {
		var range = obj.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}