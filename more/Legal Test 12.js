// https://spreadsheet.dev/working-with-checkboxes-in-google-sheets-using-google-apps-script
// https://developers.google.com/apps-script/reference/spreadsheet/data-validation

function myFunction() {
 // Log information about the data validation rule for cell A1.
 var cell = SpreadsheetApp.getActive().getRange('A1');
 var rule = cell.getDataValidation();
 if (rule != null) {
   var criteria = rule.getCriteriaType();
   var args = rule.getCriteriaValues();
   Logger.log('The data validation rule is %s %s', criteria, args);
 } else {
   Logger.log('The cell does not have a data validation rule.')
 }
}

function myFunction1() {
 let sheet = SpreadsheetApp.getActive();
 let cell = sheet.getRange('A1');
 let rule = cell.getDataValidation();
 Logger.log(rule.getCriteriaType());
 Logger.log(cell.value);
 Logger.log(cell.getValue());
 Logger.log(rule.checked);
}

function startProcessIfClause() {
 // Log information about the data validation rule for cell A1.
 let sheet = SpreadsheetApp.getActive();
 let cell = sheet.getRange('A1');
 let rule = cell.getDataValidation();
 let summary = {};
 let i = 1;
 summary[i.toString()] = cell.getValue();
 Logger.log(summary);
 if ((rule.getCriteriaType()=="CHECKBOX")) {
   Logger.log('Rule Checkbox Start Found');
   subsummary = processSubClauses(cell);

   Logger.log(subsummary);
   summary[i.toString()] = subsummary;
 }
 Logger.log(summary);
}

function processSubClauses(cell){
 let subsummary = {};
 let x = 0;
 do {
   subcell = cell.offset((x+1),1);
   leftsubcell = cell.offset((x+1),0);
   subrule = subcell.getDataValidation();
   if (subrule == null) {
     Logger.log('Total SubRule Checkboxes = ' + x);
     break;
   }
   if (subrule.getCriteriaType() == "CHECKBOX") {
     x += 1;
     // Logger.log('SubRule Checkbox Found');
     subsummary[x.toString()] =
       [leftsubcell.getValue(), subcell.getValue()];
   }
 } while (x > 0);
 return subsummary;
}
