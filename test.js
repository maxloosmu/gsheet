function onEditX(e) {
  let c = e.range;
  cValue = c.getA1Notation();
  let sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1,1).setValue(cValue);
}

function User(string1, string2, number){ this.lastName = string1; this.firstName = string2; this.age = number; };

//Assume that we are adult after 18
User.prototype.isAdult = function(){
  if (this.age >= 18){
    return true;
    } else {
      return true;
    }
  }

function testCSV() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheets()[0];
  const range = sheet.getDataRange();
  const values = range.getValues();
  let csvStr = "";
  Logger.log(values);
  for (let i = 0; i < values.length; i++) {
    let row = "";
    let comma = (values.indexOf(",") > -1);
    // Logger.log(comma);
    for (let j = 0; j < values[i].length; j++) {
      if (values[i][j]) {
        row = row + "_" + values[i][j];
      }
      row = row + ",";
    }
    row = row.substring(0, (row.length-1));
    Logger.log(row);
    csvStr += row + '\n';
  }
}

function testCSV2() {
  const text = SpreadsheetApp.getActiveSheet().getDataRange().getDisplayValues();
  const result = cellArraysToCsv(text);
  Logger.log(result);
}
/**
* Converts text to a CSV format.
* When the data looks like this:

  header A1       header B1                   header C1
  text A2         text with comma, in B2      text with "quotes" in C2

* ...the function will return this:

  "header A1", "header B1", "header C1"
  "text A2", "text with comma, in B2", "text with \"quotes\" in C2"

* Lines end in a newline character (ASCII 10).
*
* @param {String[][]} data The text to convert to CSV.
* @return {String} The text converted to CSV.
*/
function cellArraysToCsv(data) {
  // version 1.0, written by --Hyde, 20 June 2022
  //  - see https://stackoverflow.com/a/72689533/13045193
  'use strict';
  const regex = /"/g;
  let change = data.map(row => row.map(value => `"${value.replace(regex, '\"\"')}"`)).join('\n');
  return change;
}
