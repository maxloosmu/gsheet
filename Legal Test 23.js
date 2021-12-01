class History {
 constructor(history = []) {
   this.history = history;
 }
}
function onEdit(e) {
 // Respond to Edit events on spreadsheet.
 let c = e.range;
 let sheet = SpreadsheetApp.getActiveSheet();
 let h = new History();
 if (goodLayout(c)) {
   drawWords(c);
   // let startCell = findStart(c);
   // sheet.getRange(1, 1).setValue(startCell.getValue());
   // h = scanDownwards(startCell, h);
   // sheet.getRange(1, 2).setValue(c.getA1Notation());
   // processHistory(h, sheet);
   // testHistory(h, sheet);
 }
}
function goodLayout(c) {
 if (c.getBackground() != "#ffffff") {
   SpreadsheetApp.getUi().alert(
     "ERROR: Background must be white colour");
   return false;
 }
 if (isKeyword(c.getValue())) {
   if (c.getColumnIndex() < 2) {
     SpreadsheetApp.getUi().alert(
       "ERROR: Keywords must be entered from column B onwards");
     return false;
   }
   if (c.getRowIndex() < 3) {
     SpreadsheetApp.getUi().alert(
       "ERROR: Keywords must be entered from row 3 onwards");
     return false;
   }
 }
 return true;
}
function isKeyword(cValue){
 return (cValue=="IF" || cValue=="OR"
   || cValue=="AND" || cValue=="WHEN"
   || cValue=="MEANS" || cValue=="IS");
}
function drawWords(c) {
 // Identify keywords for formatting.
 cValue = c.getValue();
 if (cValue=="IF" || cValue=="WHEN") {
   c = drawIfWhenTop(c);
   if (c != null) {
     drawIfWhenOr(c);
   }
 }
 else if (cValue=="OR") {
   drawIfWhenOr(c);
 }
}
function drawIfWhenTop(c) {
 let topCell = c.offset(-1,0);
 if (topCell.getDataValidation()!=null) {
   if (topCell.getDataValidation().getCriteriaType()
     =="CHECKBOX") {
     return c;
   }
   else return null;
 }
 else if (topCell.isBlank()) {
   let cValue = c.getValue();
   c.clear();
   c.insertCheckboxes();
   c.offset(1,0).setValue(cValue);
   return c.offset(1,0);
 }
}
function drawIfWhenOr(c) {
 c.offset(0,0,1,9).clearFormat();
 c.setHorizontalAlignment("right");
 if (c.offset(0,1).isBlank()) {
   c.offset(0,1).insertCheckboxes()
     .setBorder(false,true,false,false,false,false,
     "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
   c.setBorder(null,null,null,true,false,false,
     "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
 }
 if (c.offset(0,2).isBlank()) {
   c.offset(0,2).setValue("some condition");
 }
}

