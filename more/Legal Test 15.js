function testEdit() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let c = sheet.getRange('A2');
  let cvalue = c.getValue();
  let topLeft = c.offset(-1,0);
  let summary = "";
  // let summary = topLeft;
  summary = parseWords(c, cvalue, summary);
  summary = "=" + summary;
  Logger.log("final " + summary);
}

function parseWords(c, cvalue, summary) {
  // Logger.log("parseWords");
  if (cvalue=="A" || cvalue=="B" || cvalue=="C") {
    return processIf(c, summary);
  }
}

function processIf(cell, summary) {
  // Logger.log("processIf row = " + cell.getRowIndex());
  let letter = cell.getValue();
  let endParse = false;
  let nextCell = "";
  if (letter) {
    nextCell = cell.offset(1,0);
    if (!nextCell.getValue())
      endParse = true;
    if (!endParse) {
      summary = summary + "(" + letter
        + parseWords(nextCell, nextCell.getValue(), summary) + ")";
      Logger.log("not endparse " + summary);
    } else {
      summary = summary + "(" + letter + ")";
      Logger.log("endparse " + summary);
    }
  }
  Logger.log("the end " + summary);
  return summary;
}

