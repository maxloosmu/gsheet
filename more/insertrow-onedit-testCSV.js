// https://stackoverflow.com/questions/72688102/how-do-i-parse-text-strings-in-google-sheets-cells-to-a-csv-file-with-google-app
// https://stackoverflow.com/questions/72715553/google-apps-script-google-sheet-template-scriplets-dont-work
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('Custom Menu')
      .addItem('Show sidebar', 'showSidebar')
      .addToUi();
}
function showSidebar() {
  var html = HtmlService.createTemplateFromFile('Page');
  html.data = "greetings";
  html = html.evaluate().setTitle('Sidebar');
  SpreadsheetApp.getUi().showSidebar(html);
}
function testCSV2() {
  const text = SpreadsheetApp.getActiveSheet().getDataRange().getDisplayValues();
  const result = cellArraysToCsv(text);
  Logger.log(result);
  return result;
}
function cellArraysToCsv(cellArrays) {
  const regex = /"/g;
  let change = cellArrays.map(row => row.map(value => `"${value.replace(regex, '\"\"')}"`)).join('\n');
  return change;
}



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
    for (let j = 0; j < values[i].length; j++) {
      if (values[i][j]) {
        let comma = (values[i][j].indexOf(",") > -1);
        Logger.log(comma);
        Logger.log(values[i][j]);
        row = row + "_" + values[i][j];
      }
      row = row + ",";
    }
    row = row.substring(0, (row.length-1));
    Logger.log(row);
    csvStr += row + '\n';
  }
}

function testIndexOf() {
  Logger.log("foo bar".indexOf("bar"));
  Logger.log("foo bar".indexOf(["bar"]));
  Logger.log(["foo bar"].indexOf("bar"));
}
